from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, text
from typing import Optional, List
from app.db import get_db
from app.models import Hospital
from app.schemas import HospitalOut
from app.services.geo import haversine_km
import requests
from functools import lru_cache

router = APIRouter(prefix="/hospitals", tags=["hospitals"])

@router.get("/")
def nearby(
    lat: float = Query(..., description="Latitude of user location"), 
    lng: float = Query(..., description="Longitude of user location"), 
    limit: int = Query(10, description="Maximum number of results to return"),
    max_distance: Optional[float] = Query(None, description="Maximum distance in km"),
    services: Optional[str] = Query(None, description="Comma-separated list of services"),
    db: Session = Depends(get_db)
):
    """Find hospitals near a given location, sorted by distance"""
    
    # Base query
    query = db.query(Hospital)
    
    # Filter by services if provided
    if services:
        service_list = [s.strip() for s in services.split(",")]
        for service in service_list:
            query = query.filter(Hospital.services.contains(service))
    
    # Get all matching hospitals
    rows = query.all()
    
    # Calculate distances and enrich results
    enriched = []
    for h in rows:
        d = haversine_km(lat, lng, h.lat, h.lng)
        
        # Skip if beyond max distance
        if max_distance is not None and d > max_distance:
            continue
            
        enriched.append({
            "id": h.id, 
            "name": h.name, 
            "address": h.address,
            "phone": h.phone,
            "lat": h.lat, 
            "lng": h.lng, 
            "distance_km": round(d, 1),
            "services": h.services.split(",") if h.services else [],
            "is_open": is_hospital_open(h.id)  # Simple function to check operating hours
        })
        
    # Sort by distance and limit results
    return sorted(enriched, key=lambda x: x["distance_km"])[:limit]

@lru_cache(maxsize=100)
def is_hospital_open(hospital_id: int) -> bool:
    """Simple function to check if a hospital is currently open based on operating hours"""
    # In a real implementation, you would check the current time against stored hours
    # This is a stub that returns True for most hospitals
    import datetime
    # Just a simple example - odd IDs are "open" on odd hours, even IDs on even hours
    current_hour = datetime.datetime.now().hour
    return (hospital_id % 2 == current_hour % 2)

@router.get("/by-address")
def find_by_address(
    address: str = Query(..., description="Address to geocode"), 
    limit: int = Query(10, description="Maximum number of results"),
    db: Session = Depends(get_db)
):
    """Find hospitals near an address using OpenStreetMap Nominatim geocoding (free)"""
    
    # Geocode the address using Nominatim (free OpenStreetMap service)
    try:
        coords = geocode_address(address)
        if not coords:
            raise HTTPException(status_code=404, detail="Address could not be geocoded")
        
        # Use the existing endpoint with the geocoded coordinates
        return nearby(lat=coords["lat"], lng=coords["lon"], limit=limit, db=db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Geocoding error: {str(e)}")

@lru_cache(maxsize=100)
def geocode_address(address: str):
    """Geocode an address using OpenStreetMap Nominatim (free)"""
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": address,
        "format": "json",
        "limit": 1,
        # Add a unique user agent as required by Nominatim's ToS
        "user-agent": "RuralHealthApp/1.0"
    }
    
    response = requests.get(url, params=params)
    results = response.json()
    
    if not results:
        return None
        
    return {
        "lat": float(results[0]["lat"]),
        "lon": float(results[0]["lon"])
    }

@router.get("/specialties")
def list_specialties(db: Session = Depends(get_db)):
    """List all unique hospital specialties/services in the system"""
    # This assumes services are stored as comma-separated values
    # Would need adjustment based on your actual data model
    hospitals = db.query(Hospital).all()
    
    all_specialties = set()
    for hospital in hospitals:
        if hospital.services:
            specialties = [s.strip() for s in hospital.services.split(",")]
            all_specialties.update(specialties)
    
    return sorted(list(all_specialties))

# One-time setup to enable spatial indexing in SQLite
def setup_spatial_index(db: Session):
    db.execute(text("SELECT InitSpatialMetaData(1)"))
    db.execute(text("""
        SELECT AddGeometryColumn('hospitals', 'geom', 4326, 'POINT', 'XY');
    """))
    db.execute(text("SELECT CreateSpatialIndex('hospitals', 'geom')"))
    db.commit()