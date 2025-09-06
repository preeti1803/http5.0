from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
import json
from app.db import get_db
from app.models import QueryHistory
from app.schemas import HistoryItem

router = APIRouter(prefix="/history", tags=["history"])

@router.get("/", response_model=list[HistoryItem])
async def last(limit: int = 3, db: Session = Depends(get_db)):
    rows = db.query(QueryHistory).order_by(QueryHistory.created_at.desc()).limit(limit).all()
    return [
        {
            "id": r.id,
            "condition": r.condition,
            "date_iso": r.created_at.isoformat(),
            "audio_url": r.audio_url,
        } for r in rows
    ]

@router.post("/")
async def add(entry: dict, db: Session = Depends(get_db)):
    r = QueryHistory(
        text=entry.get("text"),
        condition=entry.get("condition"),
        urgency=entry.get("urgency"),
        advice_json=json.dumps(entry.get("advice", [])),
        created_at=datetime.utcnow(),
    )
    db.add(r)
    db.commit()
    db.refresh(r)
    return {"id": r.id}