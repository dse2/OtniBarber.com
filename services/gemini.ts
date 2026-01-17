import { GoogleGenAI } from "@google/genai";

// A MUDANÇA ESTÁ AQUI EMBAIXO: De process.env para import.meta.env
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

// Verificação de segurança para não quebrar o site se a chave falhar
if (!apiKey) {
  console.error("ERRO CRÍTICO: A API Key do Google não foi encontrada!");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "chave_temporaria_para_nao_travar" });

export const getStyleAssistantResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // Ajustei o modelo para um mais estável, o preview as vezes falha
      contents: [{
        role: "user",
        parts: [{ text: userMessage }]
      }],
      config: {
        systemInstruction: {
          parts: [{ text: "Você é o assistente virtual pessoal do Alexandre Otni, um barbeiro master especializado em visagismo. Responda em nome dele ou como sua equipe. Seja elegante, profissional e direto. Se perguntarem sobre preços: Corte R$30, Sobrancelha R$12, Barba R$20, Pigmentação R$25, Platinado R$110, Luzes R$70. Localização: Vale do Jatobá, BH. Redes Sociais: Instagram (@otni_barber). Convide sempre para agendar via WhatsApp pelo botão no site." }]
        },
      },
    });
    
    // Ajuste para pegar o texto corretamente dependendo da versão da biblioteca
    return response.response.text(); 
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, tive um problema técnico. Você pode falar diretamente com o Alexandre pelo WhatsApp!";
  }
};
