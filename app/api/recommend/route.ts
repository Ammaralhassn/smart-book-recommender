import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    category,
    level,
    goal,
    learning_style,
    language,
    duration
  } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: books } = await supabase.from("books").select("*");

  const scored = books?.map(book => {
    let score = 0;
    let reasons: string[] = [];

    if (book.category === category) {
      score += 30;
      reasons.push("يتطابق مع المجال الذي اخترته");
    }

    if (book.level === level) {
      score += 20;
      reasons.push("مناسب لمستواك الحالي");
    }

    if (book.goals?.includes(goal)) {
      score += 20;
      reasons.push("يساعدك على تحقيق هدفك");
    }

    if (book.learning_style?.includes(learning_style)) {
      score += 15;
      reasons.push("أسلوب الشرح يناسبك");
    }

    if (book.language === language || language === "لا يهم") {
      score += 10;
      reasons.push("لغة المحتوى مناسبة لك");
    }

    if (book.duration === duration) {
      score += 5;
      reasons.push("المدة تناسب وقتك المتاح");
    }

    return { ...book, score, reasons };
  });

  const sorted = scored
    ?.filter(b => b.score > 40)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return NextResponse.json(sorted);
}

/*import { NextResponse } from "next/server";
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
*/