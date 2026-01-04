import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "Supabase env vars missing" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const body = await req.json();
  const { topic, level } = body;

  const { data: books } = await supabase
    .from("books")
    .select("*");

  // مثال ترشيح بسيط
  const result = books?.filter(book =>
    book.category.includes(topic)
  );

  return NextResponse.json(result);
}
