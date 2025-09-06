import os
from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = os.getenv("APP_NAME", "RuralHealth")
    api_prefix: str = os.getenv("API_V1_PREFIX", "/api/v1")
    db_url: str = os.getenv("DATABASE_URL", "sqlite:///./ruralhealth.db")
    frontend_origins: list[str] = os.getenv("FRONTEND_ORIGINS", "").split(",") if os.getenv("FRONTEND_ORIGINS") else ["*"]
    jwt_secret: str = os.getenv("JWT_SECRET", "dev-secret")
    jwt_expire_minutes: int = int(os.getenv("JWT_EXPIRE_MINUTES", "43200"))

settings = Settings()