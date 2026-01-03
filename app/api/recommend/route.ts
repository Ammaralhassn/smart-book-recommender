   import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const answers = await req.json();

  const { data: books } = await supabase.from("books").select("*");

  const ranked = books!.map(book => {
    let score = 0;

    if (book.category === answers.category) score += 3;
    if (book.level === answers.level) score += 2;

    answers.goals.forEach((goal: string) => {
      if (book.goals.includes(goal)) score += 2;
    });

    return { ...book, score };
  });

  ranked.sort((a, b) => b.score - a.score);

  return Response.json(ranked.slice(0, 3));
}
