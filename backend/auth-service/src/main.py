from fastapi import FastAPI
from src.core.database import engine, Base
from src.controllers import user_controller

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_controller.router)

