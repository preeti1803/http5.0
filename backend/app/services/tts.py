from pathlib import Path
import os
from gtts import gTTS
import uuid

AUDIO_DIR = Path("app/static/audio")
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

def synthesize_to_file(text: str, lang: str) -> Path:
    """
    Convert text to speech using Google TTS
    Supported languages include:
    - 'hi' (Hindi)
    - 'mr' (Marathi)
    - 'en' (English)
    Returns path to the generated audio file
    """
    if not text.strip():
        text = "No text provided"
    
    # Generate unique filename to avoid overwrites
    filename = f"{uuid.uuid4().hex[:8]}.mp3"
    out_path = AUDIO_DIR / filename
    
    # Use gTTS to generate speech
    tts = gTTS(text=text, lang=lang, slow=False)
    tts.save(str(out_path))
    
    return out_path

# Test if run directly
if __name__ == "__main__":
    # Test Hindi, Marathi and English
    hi_path = synthesize_to_file("नमस्ते, आप कैसे हैं?", "hi")
    mr_path = synthesize_to_file("नमस्कार, तुम्ही कसे आहात?", "mr")
    en_path = synthesize_to_file("Hello, how are you?", "en")
    
    print(f"Hindi audio saved to: {hi_path}")
    print(f"Marathi audio saved to: {mr_path}")
    print(f"English audio saved to: {en_path}")
    
    # Try to play audio if on Windows
    try:
        # Play Marathi audio as a demo
        os.system(f'start {mr_path}')  # Windows-specific
    except:
        print("Generated files. Use media player to listen.")