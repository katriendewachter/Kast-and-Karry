// Optional: AI chef. Works only when ANTHROPIC_API_KEY is set in Netlify (Site configuration > Environment variables).
const MODEL = process.env.CHEF_MODEL || "claude-haiku-5-5";

export default async (req) => {
  const key = process.env.ANTHROPIC_API_KEY;
  if (req.method === "GET") return Response.json({ enabled: !!key });
  if (req.method !== "POST") return new Response("Niet toegestaan", { status: 405 });
  if (!key) return Response.json({ error: "De chef is niet ingesteld" }, { status: 501 });

  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Ongeldige gegevens" }, { status: 400 }); }
  const pantry = (body.pantry || []).slice(0, 80).map(p => String(p).slice(0, 40)).filter(Boolean);
  if (!pantry.length) return Response.json({ error: "Vul eerst in wat je in huis hebt" }, { status: 400 });
  const veg = !!body.veg;
  const favs = (body.favorites || []).slice(0, 40).map(p => String(p).slice(0, 40)).filter(Boolean);
  const people = Math.min(Math.max(parseInt(body.people) || 2, 1), 8);

  const prompt =
`Je bent een praktische Vlaamse thuiskok en voedingscoach.
In huis: ${pantry.join(", ")}.
${favs.length ? "Favoriete ingrediënten (gebruik er waar het past graag één of meer van): " + favs.join(", ") + ".\n" : ""}Basisproducten zoals olie, boter, zout, peper, gedroogde kruiden en bouillonblokjes mag je altijd gebruiken.
Stel 3 verschillende avondmaaltijden voor ${people} personen voor${veg ? ", allemaal vegetarisch" : ""}.
Elke maaltijd is evenwichtig: veel groenten, een eiwitbron en een volkoren of vezelrijke koolhydraatbron. Lekker, haalbaar op een weekdag, maximaal 45 minuten.
Gebruik zo veel mogelijk wat in huis is. Ontbreekt er iets, zet het bij "ontbreekt" (maximaal 4 producten, gewone supermarktproducten).
Geef bij elk gerecht één zeer goede wijn die er echt bij past: appellatie, druif en een gerenommeerde producent.
Antwoord ALLEEN met JSON in deze vorm, zonder uitleg ervoor of erna:
{"gerechten":[{"naam":"","tijd":30,"waarom":"één zin waarom dit evenwichtig is","in_huis":[""],"ontbreekt":[""],"stappen":["",""],"wijn":""}]}`;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODEL, max_tokens: 1800, messages: [{ role: "user", content: prompt }] })
    });
    if (!r.ok) return Response.json({ error: "De chef antwoordt even niet (" + r.status + ")" }, { status: 502 });
    const data = await r.json();
    const text = (data.content || []).map(c => c.text || "").join("");
    const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
    return Response.json(json);
  } catch {
    return Response.json({ error: "De chef kon geen voorstel maken. Probeer het nog eens." }, { status: 502 });
  }
};

export const config = { path: "/api/chef" };
