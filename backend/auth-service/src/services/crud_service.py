from sqlalchemy.orm import Session
from src.models.user import User
from src.schemas.user_schema import UserCreate
from src.services.utils import get_password_hash
import secrets
from datetime import datetime, timedelta

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user: UserCreate):
    hashed_pw = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, hashed_password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def generate_reset_otp(user: User, db: Session):
    import random
    otp = f"{random.randint(100000, 999999)}"  # 6-digit OTP as string
    user.reset_otp = otp
    user.reset_otp_expiry = datetime.utcnow() + timedelta(minutes=10)
    db.commit()
    return otp

def verify_reset_otp(user: User, otp: str):
    if user.reset_otp == otp and user.reset_otp_expiry and user.reset_otp_expiry > datetime.utcnow():
        return True
    return False

def reset_user_password_with_otp(email: str, otp: str, new_password: str, db: Session):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_reset_otp(user, otp):
        return None
    user.hashed_password = get_password_hash(new_password)
    user.reset_otp = None
    user.reset_otp_expiry = None
    db.commit()
    return user

