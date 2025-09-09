import axios from "axios";

const API_KEY = "AIzaSyDPeUA6-R4ioNCXaxMkMKQYWO4u-D7TrtQ";

export async function translateText(text: string, targetLang: string) {
  const response = await axios.post(
    `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
    {
      q: text,
      target: targetLang,
      format: "text",
    }
  );
  return response.data.data.translations[0].translatedText;
}
