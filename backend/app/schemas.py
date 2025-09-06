from pydantic import BaseModel, Field
from typing import List, Optional

class AdviceItem(BaseModel):
    icon: str
    text: str

class AnalyzeIn(BaseModel):
    text: str
    lang: str = Field(pattern="^(hi|mr|bn)$")

class AnalyzeOut(BaseModel):
    condition: str
    urgency: str
    advice: List[AdviceItem]

class HospitalOut(BaseModel):
    id: int
    name: str
    lat: float
    lng: float
    distance_km: float

class HistoryItem(BaseModel):
    id: int
    condition: str
    date_iso: str
    audio_url: Optional[str] = None

class HealthTip(BaseModel):
    tip: str
    illustration: str

class FirstAidTopic(BaseModel):
    title: str
    bullet_points: List[str]