// route.js (GET /api/jobs?title=...&location=...&type=...&minSalary=...&maxSalary=...)
import { createAdminClient } from "@/lib/supabaseAdmin";
// import { createClient } from '@supabase/supabase-js';

export async function GET(req) {
  const supabase = createAdminClient();
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "";
  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "";
  const minSalary = Number(searchParams.get("minSalary")) || 0;
  const maxSalary = Number(searchParams.get("maxSalary")) || 999999;

  let query = supabase.from("jobs").select("*");

  if (title) query = query.ilike("title", `%${title}%`);
  if (location) query = query.eq("location", location);
  if (type) query = query.eq("type", type);

  query = query.gte("salary", minSalary).lte("salary", maxSalary);

  const { data, error } = await query;

  if (error) return new Response(JSON.stringify({ error }), { status: 500 });

  return new Response(JSON.stringify(data), { status: 200 });
}
