export async function handler(event) {
  const { key } = JSON.parse(event.body);

  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/license_keys?key=eq.${key}`,
    {
      headers: {
        "apikey": process.env.SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
    }
  );

  const data = await res.json();

  if (!data.length) {
    return {
      statusCode: 200,
      body: JSON.stringify({ valid: false }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ valid: true }),
  };
}