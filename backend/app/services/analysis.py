from app.schemas import AnalyzeOut, AdviceItem

def analyze_text(text: str, lang: str) -> AnalyzeOut:
    t = (text or "").lower()
    if any(k in t for k in ["fever", "bukhar", "bukhaar", "ज्वर"]):
        return AnalyzeOut(
            condition="Bukhaar",
            urgency="medium",
            advice=[
                AdviceItem(icon="💧", text="Paani adhik piyen"),
                AdviceItem(icon="🌡️", text="Har 6 ghante bukhaar naapien"),
                AdviceItem(icon="🛌", text="Aaraam karein")
            ]
        )
    if any(k in t for k in ["snake", "saamp", "साँप", "साप"]):
        return AnalyzeOut(
            condition="Snakebite",
            urgency="high",
            advice=[
                AdviceItem(icon="🚫", text="Gharrh ya tourniquet na baandhen"),
                AdviceItem(icon="🛌", text="Be-harkat rakhen"),
                AdviceItem(icon="📞", text="108 par turant call karein")
            ]
        )
    return AnalyzeOut(
        condition="Sardi/Khansi",
        urgency="low",
        advice=[
            AdviceItem(icon="😴", text="Aaraam karein"),
            AdviceItem(icon="🥤", text="Gunguna paani piyen")
        ]
    )