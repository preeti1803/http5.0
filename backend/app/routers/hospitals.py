from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import Hospital
from app.schemas import HospitalOut
from app.services.geo import haversine_km

router = APIRouter(prefix="/hospitals", tags=["hospitals"])

@router.get("/")
def nearby(lat: float = Query(...), lng: float = Query(...), limit: int = 10, db: Session = Depends(get_db)):
    rows = db.query(Hospital).all()
    enriched = []
    for h in rows:
        d = haversine_km(lat, lng, h.lat, h.lng)
        enriched.append({"id": h.id, "name": h.name, "lat": h.lat, "lng": h.lng, "distance_km": round(d, 1)})
    return sorted(enriched, key=lambda x: x["distance_km"])[:limit]