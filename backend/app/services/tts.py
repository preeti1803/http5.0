from pathlib import Path

AUDIO_DIR = Path("app/static/audio")
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

# Stub: instead of generating TTS, write a tiny empty file to simulate
# an audio response and return its path. Replace with pyttsx3/Coqui later.

def synthesize_to_file(text: str, lang: str) -> Path:
    out = AUDIO_DIR / "result.mp3"
    out.write_bytes(b"ID3\x03\x00")  # minimal header-ish for demo
    return out