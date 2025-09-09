from app.services.stt import transcribe

def test_transcribe_stub_returns_fixed_text():
    out = transcribe("anything.mp3", "hi")
    assert out == "sar dard aur bukhaar hai"