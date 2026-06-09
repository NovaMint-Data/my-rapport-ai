export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { reportType, rawData, outputLang, tone, audience } = req.body;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: "Missing GROQ_API_KEY" });
    }

    const prompt = `You are an expert professional report writer.
Write a complete ${tone} ${reportType} report in ${outputLang}.
Target audience: ${audience || "General Management"}
Raw data: ${rawData}
Write full structured report with title, summary, sections, conclusions.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(500).json({ error: JSON.stringify(data) });
    }

    const result = data.choices?.[0]?.message?.content || "No content";
    res.status(200).json({ result });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
