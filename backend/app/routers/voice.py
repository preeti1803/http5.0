from fastapi import APIRouter, UploadFile, File, Query
from fastapi.responses import FileResponse
from tempfile import NamedTemporaryFile
from app.services.stt import transcribe
from app.services.tts import synthesize_to_file

router = APIRouter(prefix="/voice", tags=["voice"])

@router.post("/transcribe")
async def transcribe_audio(lang: str = Query("hi"), audio: UploadFile = File(...)):
    with NamedTemporaryFile(delete=True, suffix=".wav") as tmp:
        tmp.write(await audio.read())
        tmp.flush()
        text = transcribe(tmp.name, lang)
    return {"text": text}

@router.get("/tts")
async def tts(text: str, lang: str = "hi"):
    path = synthesize_to_file(text, lang)
    return FileResponse(path, media_type="audio/mpeg", filename="result.mp3")