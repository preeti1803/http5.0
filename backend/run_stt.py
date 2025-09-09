from app.services.stt import transcribe

if __name__ == "__main__":
    result = transcribe("sample.wav", "hi")
    print("Transcription:", result)