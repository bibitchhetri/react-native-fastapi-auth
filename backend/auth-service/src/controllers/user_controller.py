from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from src.schemas import user_schema
from src.services import crud_service, auth_service, utils
from src.core.database import SessionLocal

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register/", response_model=user_schema.UserOut)
def register(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    db_user = crud_service.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud_service.create_user(db, user)

@router.post("/token", response_model=user_schema.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud_service.get_user_by_username(db, form_data.username)
    if not user or not utils.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth_service.create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/users/me", response_model=user_schema.UserOut)
def read_users_me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = auth_service.decode_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = crud_service.get_user_by_username(db, payload.get("sub"))
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/forgot-password/")
def forgot_password(request: user_schema.ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = crud_service.get_user_by_email(db, request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    otp = crud_service.generate_reset_otp(user, db)
    utils.send_reset_email(user.email, otp)
    return {"message": "OTP sent to your email"}

@router.post("/reset-password/")
def reset_password(request: user_schema.ResetPasswordRequest, db: Session = Depends(get_db)):
    user = crud_service.reset_user_password_with_otp(request.email, request.token, request.new_password, db)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid OTP or expired")
    return {"message": "Password reset successful"}

@router.post("/verify-otp/")
def verify_otp(request: user_schema.VerifyOtpRequest, db: Session = Depends(get_db)):
    user = crud_service.get_user_by_email(db, request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    is_valid = crud_service.verify_reset_otp(user, request.token)
    if not is_valid:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    return {"message": "OTP verified successfully"}


