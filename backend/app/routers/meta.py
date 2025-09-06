from fastapi import APIRouter
from random import choice
from app.schemas import HealthTip

router = APIRouter(prefix="/meta", tags=["meta"])

LANGS = [
    {"code": "hi", "name": "हिंदी"},
    {"code": "mr", "name": "मराठी"},
    {"code": "bn", "name": "বাংলা"},
]

@router.get("/languages")
def languages():
    return LANGS

TIPS = [
    {"tip":"Roz 30 min chalna faydemand hai", "illustration":"/img/walk.png"},
    {"tip":"Paani aur saaf-safai ka dhyan rakhen", "illustration":"/img/wash.png"}
]

@router.get("/health-tip", response_model=HealthTip)
def health_tip():
    return choice(TIPS)

@router.get("/streak")
def streak():
    return {"days": 3}