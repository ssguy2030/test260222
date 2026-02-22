interface Env {
  OPENAI_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { height, weight, image } = await context.request.json() as any;

    if (!context.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: "OpenAI API Key is not configured in Cloudflare environment." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Use GPT-4o for its vision capabilities
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert personal stylist and image consultant. Analyze the user's physical details (height, weight) and their photo to provide a concise, premium style report in Korean. Focus on silhouette, color palette, and specific item recommendations."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `사용자 신체 정보: 키 ${height}cm, 몸무게 ${weight}kg. 이 데이터를 바탕으로 현재 스타일을 분석하고, 가장 잘 어울리는 스타일(체형 보정, 추천 아이템 등)을 상세히 제안해줘. 답변은 마크다운 형식으로 작성해줘.`
              },
              {
                type: "image_url",
                image_url: {
                  url: image // This is the base64 data URL from the frontend
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
