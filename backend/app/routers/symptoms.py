from fastapi import APIRouter
from app.schemas import AnalyzeIn, AnalyzeOut
from app.services.analysis import analyze_text

router = APIRouter(prefix="/symptoms", tags=["symptoms"])

@router.post("/analyze", response_model=AnalyzeOut)
async def analyze(payload: AnalyzeIn):
    return analyze_text(payload.text, payload.lang)