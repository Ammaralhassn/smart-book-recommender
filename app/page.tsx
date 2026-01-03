"use client";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [books, setBooks] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});

  const choose = (key: string, value: any) => {
    setAnswers({ ...answers, [key]: value });
    setStep(step + 1);
  };

  const submit = async () => {
    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers)
    });
    setBooks(await res.json());
  };

  return (
    <main className="container">
      <h1>📚 اختر كتابك المناسب</h1>

      {step === 1 && (
        <div className="card">
          <h2>ماذا تريد أن تتعلم؟</h2>
          <button onClick={() => choose("category","برمجة ويب")}>برمجة ويب</button>
          <button onClick={() => choose("category","قواعد البيانات")}>قواعد البيانات</button>
          <button onClick={() => choose("category","شبكات")}>شبكات</button>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2>مستواك؟</h2>
          <button onClick={() => choose("level","مبتدئ")}>مبتدئ</button>
          <button onClick={() => choose("level","متوسط")}>متوسط</button>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h2>هدفك؟</h2>
          <button onClick={() => choose("goals",["بناء موقع"])}>بناء موقع</button>
          <button onClick={() => choose("goals",["فهم الأنظمة"])}>فهم الأنظمة</button>
        </div>
      )}

      {step === 4 && (
        <button className="primary" onClick={submit}>عرض النتائج</button>
      )}

      {books.length > 0 && (
        <div className="results">
          {books.map(book => (
            <div className="result-card" key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <a href={book.salla_url} target="_blank">اشترِ الآن</a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}



/*
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
*/