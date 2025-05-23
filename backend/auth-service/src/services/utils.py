from passlib.context import CryptContext
import smtplib
from email.message import EmailMessage
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def send_reset_email(to_email: str, otp: str):
    email_address = os.getenv("EMAIL_ADDRESS")
    email_password = os.getenv("EMAIL_PASSWORD")
    
    msg = EmailMessage()
    msg['Subject'] = 'Your Password Reset OTP'
    msg['From'] = email_address
    msg['To'] = to_email
    msg.set_content(f'Your password reset OTP is: {otp}\n\nThis code will expire in 10 minutes.')
    
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(email_address, email_password)
            smtp.send_message(msg)
        print("Email sent successfully.")
    except Exception as e:
        print("Email failed to send:", e)

