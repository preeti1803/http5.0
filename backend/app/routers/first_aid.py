import json
from fastapi import APIRouter, HTTPException, Query
from pathlib import Path
from app.schemas import FirstAidTopic

router = APIRouter(prefix="/first-aid", tags=["first-aid"])

@router.get("/", response_model=FirstAidTopic)
def get_topic(topic: str = Query(...), lang: str = Query(...)):
    topic_filename = f"first_aid.{lang}.json"
    topic_path = Path("app/data") / topic_filename
    
    if not topic_path.exists():
        raise HTTPException(status_code=404, detail="Language not supported")

    with open(topic_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    selected_topic = data.get(topic)
    if not selected_topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    return selected_topic