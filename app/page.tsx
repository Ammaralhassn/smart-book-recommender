"use client";
import { useState } from "react";

const steps = [
  {
    key: "category",
    title: "ماذا تريد أن تتعلم؟",
    options: ["برمجة ويب", "قواعد البيانات", "الشبكات", "الأمن السيبراني"]
  },
  {
    key: "goal",
    title: "ما هدفك من التعلم؟",
    options: ["وظيفة", "مشروع عملي", "تعلم أكاديمي"]
  },
  {
    key: "level",
    title: "ما مستواك الحالي؟",
    options: ["مبتدئ", "متوسط", "متقدم"]
  },
  {
    key: "style",
    title: "كيف تحب أن تتعلم؟",
    options: ["شرح مبسط", "تطبيق عملي", "شرح عميق"]
  }
];

export default function BookFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [results, setResults] = useState<any[]>([]);
  const current = steps[step];

  const choose = (value: string) => {
    setAnswers({ ...answers, [current.key]: value });
    setStep(step + 1);
  };

  const fetchResults = async () => {
    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers)
    });
    setResults(await res.json());
  };

  return (
    <main className="page">
      {step < steps.length ? (
        <section className="step">
          <h1>{current.title}</h1>

          <div className="options">
            {current.options.map(o => (
              <div key={o} className="option-card" onClick={() => choose(o)}>
                {o}
              </div>
            ))}
          </div>

          <div className="progress">
            {step + 1} / {steps.length}
          </div>
        </section>
      ) : (
        <section className="results">
          <h1>📚 أفضل الكتب لك</h1>

          <button className="primary" onClick={fetchResults}>
            عرض النتائج
          </button>

          <div className="grid">
            {results.map(book => (
              <div key={book.id} className="book-card">
                <h3>{book.title}</h3>
                <p>{book.description}</p>

                <ul>
                  {book.reasons.map((r: string, i: number) => (
                    <li key={i}>✓ {r}</li>
                  ))}
                </ul>

                <div className="score">⭐ {book.score}% توافق</div>

                <a href={book.salla_url} target="_blank">
                  شراء الكتاب
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

/*
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
          <button onClick={() => choose("topic","برمجة ويب")}>برمجة ويب</button>
          <button onClick={() => choose("topic","قواعد البيانات")}>قواعد البيانات</button>
          <button onClick={() => choose("topic","شبكات")}>شبكات</button>
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
*/
/*
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
*/