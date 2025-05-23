from sqlalchemy import Column, Integer, String
from src.core.database import Base
from sqlalchemy import DateTime
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    reset_otp = Column(String, nullable=True)  # newly added
    reset_otp_expiry = Column(DateTime, nullable=True)  # newly added

