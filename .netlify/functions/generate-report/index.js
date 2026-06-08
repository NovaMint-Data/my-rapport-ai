export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { reportType, rawData, outputLang, tone, audience } = JSON.parse(event.body);
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API key not configured" }),
      };
    }

    const prompt = `You are an expert professional report writer.
Write a complete ${tone} ${reportType} report in ${outputLang}.
Target audience: ${audience || "General Management"}

Raw data and notes:
${rawData}

Structure the report with:
1. Title
2. Executive Summary
3. Main sections with analysis
4. Conclusions
5. Recommendations

Write the full report now:`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const result = data.choices?.[0]?.message?.content;

    if (!result) throw new Error("No content from Groq");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}