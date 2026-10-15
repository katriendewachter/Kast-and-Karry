import { getStore } from "@netlify/blobs";

const MAX_ITEMS = 400;
const clean = (v, n) => String(v ?? "").slice(0, n);

export default async (req) => {
  const url = new URL(req.url);
  const code = (url.searchParams.get("code") || "").toLowerCase();
  if (!/^[a-z0-9-]{6,40}$/.test(code)) {
    return Response.json({ error: "Ongeldige gezinscode" }, { status: 400 });
  }
  const store = getStore("looplijst");
  const key = "lijst-" + code;

  if (req.method === "GET") {
    const data = await store.get(key, { type: "json" });
    return Response.json(data || { settings: null, items: {} });
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch { return Response.json({ error: "Ongeldige gegevens" }, { status: 400 }); }
    const data = (await store.get(key, { type: "json" })) || { settings: null, items: {} };
    for (const op of (body.ops || []).slice(0, 100)) {
      if (op.type === "put" && op.item && op.item.id) {
        if (!data.items[op.item.id] && Object.keys(data.items).length >= MAX_ITEMS) continue;
        const it = op.item;
        data.items[clean(it.id, 40)] = {
          id: clean(it.id, 40), name: clean(it.name, 60), qty: clean(it.qty, 12),
          cat: clean(it.cat, 40), done: !!it.done, auto: !!it.auto, by: clean(it.by, 10), at: Number(it.at) || Date.now()
        };
      } else if (op.type === "del" && op.id) {
        delete data.items[op.id];
      } else if (op.type === "settings" && op.settings) {
        const s = op.settings;
        data.settings = {
          store: clean(s.store, 40),
          route: (s.route || []).slice(0, 40).map(r => ({ id: clean(r.id, 40), name: clean(r.name, 30) })),
          forget: (s.forget || []).slice(0, 30).map(f => clean(f, 40)),
          history: (s.history || []).slice(0, 24).map(h => clean(h, 60)),
          pantry: (s.pantry || []).slice(0, 80).map(p => clean(p, 40)),
          favorites: (s.favorites || []).slice(0, 40).map(p => clean(p, 40)),
          favRecipes: (s.favRecipes || []).slice(0, 60).map(p => clean(p, 80)),
          nuts: { y: parseInt(s.nuts && s.nuts.y) || 0, n: Math.max(0, parseInt(s.nuts && s.nuts.n) || 0) },
          alwaysNuts: s.alwaysNuts !== false,
          points: { bart: Math.max(0, parseInt(s.points && s.points.bart) || 0) },
          week: Object.fromEntries(["ma","di","wo","do","vr","za","zo"].filter(k => s.week && s.week[k] && s.week[k].n).map(k => [k, { n: clean(s.week[k].n, 80), ing: (s.week[k].ing || []).slice(0, 25).map(x => clean(x, 40)) }])),
          staples: (s.staples || []).slice(0, 40).map(x => clean(x, 40)),
          addedAisles: (s.addedAisles || []).slice(0, 20).map(x => clean(x, 40)),
          custom: (s.custom || []).slice(0, 300).map(c => ({ n: clean(c.n, 40), c: clean(c.c, 40) })).filter(c => c.n),
          recipes: (s.recipes || []).slice(0, 60).map(r => ({
            id: clean(r.id, 40), n: clean(r.n, 60), t: Math.min(Math.max(parseInt(r.t) || 0, 0), 600), v: !!r.v,
            ing: (r.ing || []).slice(0, 25).map(x => clean(x, 40)),
            steps: (r.steps || []).slice(0, 15).map(x => clean(x, 300))
          })),
          updatedAt: Number(s.updatedAt) || Date.now()
        };
      }
    }
    await store.setJSON(key, data);
    return Response.json(data);
  }

  return new Response("Niet toegestaan", { status: 405 });
};

export const config = { path: "/api/lijst" };
