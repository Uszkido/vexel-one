import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Vexel AI Service"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/vexelone")
    VECTOR_DB_URL: str = os.getenv("VECTOR_DB_URL", "http://localhost:8080")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
    HUGGINGFACE_TOKEN: str = os.getenv("HUGGINGFACE_TOKEN", "")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "supersecretkey")

    class Config:
        env_file = ".env"

settings = Settings()
