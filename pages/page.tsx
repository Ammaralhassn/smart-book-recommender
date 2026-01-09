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