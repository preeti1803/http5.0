from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.db import Base, engine
from app import models
from app.routers import meta, symptoms, voice, hospitals, history, first_aid

# Create tables (for SQLite dev). Use Alembic for Postgres.
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.app_name, openapi_url=f"{settings.api_prefix}/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.frontend_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files (for TTS audio)
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Mount routers under /api/v1
app.include_router(meta.router, prefix=settings.api_prefix)
app.include_router(symptoms.router, prefix=settings.api_prefix)
app.include_router(voice.router, prefix=settings.api_prefix)
app.include_router(hospitals.router, prefix=settings.api_prefix)
app.include_router(history.router, prefix=settings.api_prefix)
app.include_router(first_aid.router, prefix=settings.api_prefix)

@app.get("/")
async def root():
    return {"ok": True, "name": settings.app_name}