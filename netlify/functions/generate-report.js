export async function handler(event) {
  const { reportType, rawData, outputLang, tone, audience } = JSON.parse(event.body);
  
  const prompt = `You are an expert professional report writer.
Write a complete ${reportType} report in ${outputLang} language.
Tone: ${tone}. Audience: ${audience || "General management"}
Data: ${rawData}
Include: Executive Summary, Introduction, Analysis, Findings, Recommendations, Conclusion.
If Arabic, use formal فصحى.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2048,
    }),
  });
  const data = await res.json();
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ result: data.choices[0].message.content }),
  };
}