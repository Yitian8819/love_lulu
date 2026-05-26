import Link from "next/link";
import { notFound } from "next/navigation";

const letters = [
  { id: "first-light", date: "2025.12.11", from: "Ganzhe → Lulu", title: "第一束认真亮起的光", preview: "把今晚收好，留给以后慢慢打开。" },
  { id: "soft-winter", date: "2025.12.24", from: "Lulu → Ganzhe", title: "冬天也可以很甜", preview: "有些话像热饮，握在手里就不冷了。" },
  { id: "new-year", date: "2026.01.01", from: "Ganzhe → Lulu", title: "新年的第一封", preview: "想和你一起把很多普通日子变得不普通。" },
  { id: "tiny-map", date: "2026.02.14", from: "Lulu → Ganzhe", title: "地图上的小标记", preview: "下一次见面，就把这个点改成真实坐标。" },
  { id: "spring-window", date: "2026.03.21", from: "Ganzhe → Lulu", title: "窗边的春天", preview: "等风变软，我们就一起去晒太阳。" },
  { id: "long-road", date: "2026.05.20", from: "Lulu → Ganzhe", title: "慢慢走也没关系", preview: "时间轴很长，我们还有很多格子可以填满。" }
];

export function generateStaticParams() {
  return letters.map((letter) => ({ id: letter.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const letter = letters.find((item) => item.id === id);

  return {
    title: letter ? `${letter.title} | Ganzhe & Lulu` : "Letter | Ganzhe & Lulu"
  };
}

export default async function LetterPage({ params }) {
  const { id } = await params;
  const letter = letters.find((item) => item.id === id);

  if (!letter) {
    notFound();
  }

  return (
    <main className="letter-page">
      <article className="letter-sheet">
        <Link className="back-link" href="/">← 回到小家</Link>
        <span className="letter-date">{letter.date}</span>
        <h1>{letter.title}</h1>
        <p className="letter-author">{letter.from}</p>
        <p>{letter.preview}</p>
        <p>这封信的位置已经留好了。以后可以把完整正文、照片、音频或者某一天的小碎片慢慢放进来。</p>
      </article>
    </main>
  );
}
