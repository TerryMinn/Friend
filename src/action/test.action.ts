"use server";

import { ActionState } from "@/type";

export const Ai = async (preState: ActionState, formData: FormData) => {
  const prompt = formData.get("prompt");

  const GROQ_API_URL = process.env.GROQ_API_URL;
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  const ELEVEN_VOICE_ID = process.env.ELEVEN_VOICE_ID;

  const payload = {
    model: "llama-3.3-70b-versatile", // or "deepseek-v3"
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 200,
  };

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch data from the API");
    }
    const result = await response.json();
    const reply = result.choices[0].message.content;

    return {
      message: reply,
      con: true,
    };
  } catch (e) {
    console.log(e);
    return {
      message: e instanceof Error ? e.message : "Unknown Error",
      con: false,
    };
  }
};
