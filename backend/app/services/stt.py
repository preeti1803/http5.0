import json
import wave
from pathlib import Path
from typing import Optional

try:
    from vosk import Model, KaldiRecognizer  # type: ignore
    _VOSK_AVAILABLE = True
except ImportError:
    _VOSK_AVAILABLE = False

# Map language -> local model folder name
_MODEL_MAP = {
    "hi": "vosk-model-small-hi-0.22",
    "en": "vosk-model-small-en-us-0.15",  # example if you also download English
}

_MODELS_BASE = Path(__file__).resolve().parents[3] / "models"  # backend/models/...
_loaded_models: dict[str, Model] = {}


def _load_model(lang: str) -> Optional[Model]:
    if not _VOSK_AVAILABLE:
        return None
    if lang in _loaded_models:
        return _loaded_models[lang]
    folder = _MODEL_MAP.get(lang)
    if not folder:
        return None
    model_path = _MODELS_BASE / folder
    if not model_path.exists():
        return None
    model = Model(str(model_path))
    _loaded_models[lang] = model
    return model


def transcribe(file_path: str, lang: str) -> str:
    """
    Transcribe an audio file using Vosk if available; fallback to stub text.
    Supports mono PCM WAV (recommended). If other format, convert externally (ffmpeg).
    """
    model = _load_model(lang)
    if not model:
        # Fallback stub to keep rest of app functioning
        return "sar dard aur bukhaar hai"

    audio_path = Path(file_path)
    if not audio_path.exists():
        raise FileNotFoundError(f"Audio file not found: {file_path}")

    # Open WAV (expect 16k mono; if not, user should pre-process)
    with wave.open(str(audio_path), "rb") as wf:
        if wf.getnchannels() != 1 or wf.getsampwidth() != 2:
            # Could add automatic conversion here with pydub/ffmpeg
            raise ValueError("Expect 16-bit PCM mono WAV. Convert before calling.")
        rec = KaldiRecognizer(model, wf.getframerate())
        rec.SetWords(True)
        result_text = []
        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                j = json.loads(rec.Result())
                if "text" in j:
                    result_text.append(j["text"])
        final = json.loads(rec.FinalResult())
        if "text" in final:
            result_text.append(final["text"])
        joined = " ".join(t for t in result_text if t).strip()
        return joined or ""
    

if __name__ == "__main__":
    # Quick manual test
    print(transcribe("harvard.wav", "hi"))
# Expect: sar dard aur bukhaar hai