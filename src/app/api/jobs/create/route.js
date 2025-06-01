// route.js (POST /api/jobs/create)
import { createAdminClient } from "@/lib/supabaseAdmin";
//import { createClient } from "@supabase/supabase-js";
export async function POST(req) {
  const supabase = createAdminClient();
  const body = await req.json();
  console.log('body::',body)

  // TODO: Implement authentication check for admin
  const isAdmin = true; // Replace this with real auth logic

  if (!isAdmin) {
    // return new Response(JSON.stringify({ error: "Unauthorized" }), {
    //   status: 401,
    // });
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const {
    title,
    company,
    location,
    type,
    salaryMin,
    salaryMax,
    deadline,
    description,
  } = body;
  if (!title || !location || !type) {
    return Response.json({ error: error.message }, { status: 500 });

    // return new Response(JSON.stringify({ error: "Missing fields" }), {
    //   status: 400,
    // });
  }

  console.log('title:',title)

  const { data, error } = await supabase.from("jobs").insert([
    {
      title,
      company,
      location,
      type,
      salary_max:salaryMin,
      salary_min:salaryMax,
      deadline,
      description,
    },
  ]);

  if (error) {
    return Response.json({ message: "Error:", error }, { status: 500 });

    // return new Response(JSON.stringify({ error }), { status: 500 });
  }

  return Response.json(
    { message: "Job created successfully", data },
    { status: 200 }
  );

  //   return new Response(JSON.stringify(data), { status: 201 });
}
