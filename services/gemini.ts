
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStyleAssistantResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: "Você é o assistente virtual pessoal do Alexandre Otni, um barbeiro master especializado em visagismo. Responda em nome dele ou como sua equipe. Seja elegante, profissional e direto. Se perguntarem sobre preços: Corte R$30, Sobrancelha R$12, Barba R$20, Pigmentação R$25, Platinado R$110, Luzes R$70. Localização: Vale do Jatobá, BH. Redes Sociais: Instagram (@otni_barber). Convide sempre para agendar via WhatsApp pelo botão no site.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, tive um problema técnico. Você pode falar diretamente com o Alexandre pelo WhatsApp!";
  }
};
