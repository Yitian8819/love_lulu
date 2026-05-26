"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const loveStart = new Date("2025-12-11T23:00:00+01:00").getTime();
const pad = (number) => String(number).padStart(2, "0");
const initialTimeValues = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

const photos = [
  { title: "从第一束鲜花开始", meta: "2025-12-11 · Paris", image: "/Memory/01.JPG", a: "#dff5ea", b: "#f2a7aa" },
  { title: "极北的瀑布下", meta: "2025-12-21 · Iceland", image: "/Memory/02.jpeg", a: "#dcefff", b: "#fff0bf" },
  { title: "和大家一起跨年", meta: "2025-12-31 · Antony", image: "/Memory/03.JPG", a: "#ffe1d6", b: "#dff5ea" },
  { title: "一起去听演唱会", meta: "2026-01-17 · Paris", image: "/Memory/04.jpeg", a: "#d8efe4", b: "#e8dfff" },
  { title: "在古城书写爱意❤️", meta: "2026-05-19 · Dalt Vila", image: "/Memory/05.jpeg", a: "#ffe9b8", b: "#dcefff" }
];

const letters = [
  { id: "first-light", date: "2025.12.11", from: "小鹿 → 大人", title: "最喜欢听小鹿叫大人的大人", preview: "你好呀，我生活里出现的新伙伴！" },
  { id: "soft-winter", date: "2026.04.28", from: "甘蔗 → 小鹿", title: "见字如晤", preview: "你在跃动之间撞破我的心墙，在我的心田里荡漾起汩汩河水。" },
  { id: "new-year", date: "2026.04.28", from: "小鹿 → 甘蔗", title: "展信舒颜", preview: "很可爱，我们就这样错峰地，接住了彼此脆弱的瞬间。" }
];

const places = [
  { region: "europe", country: "France", name: "Paris", flag: "🇫🇷", date: "2025.12.11", memory: "巴黎的相遇是一束玫瑰花，是一场大雪，是一节晚归时无人的车厢。", photo: "/Journey_Paris.jpeg", lat: 48.8566, lng: 2.3522 },
  { region: "europe", country: "Iceland", name: "Reykjavik", flag: "🇮🇸", date: "2025.12.20", memory: "在极北极寒之地，我们紧紧相拥。", photo: "/Journey_Iceland.jpeg", lat: 64.1466, lng: -21.9426 },
  { region: "europe", country: "Spain", name: "Barcelona", flag: "🇪🇸", date: "2026.5.18", memory: "在无数线条的交织里，我们穿梭流连。", photo: "/Journey_Barcelona.jpeg", lat: 41.3851, lng: 2.1734 },
  { region: "europe", country: "Spain", name: "Ibiza", flag: "🇪🇸", date: "2026.5.19", memory: "来自小岛的生日祝福，在心里标下一枚小小的星。", photo: "/Journey_Ibiza.jpeg", lat: 38.9067, lng: 1.4206 },
  { region: "europe", country: "Italy", name: "Taormina", flag: "🇮🇹", date: "2026.5.21", memory: "把西西里的蓝和山城的风，钉在五月的最后一枚地标上。", photo: "/Journey_Taormina.jpeg", lat: 37.8516, lng: 15.2853 }
];

const scripts = [
  {
    title: "之间邮局",
    leftRole: {
      name: "向树",
      line: "烟花是天空中的树，向树是地上的烟花。",
      image: "/JB/JB_Xiangshu.JPG",
      a: "#dcefff",
      b: "#f2a7aa"
    },
    rightRole: {
      name: "江知岸",
      line: "一个男孩学会勇敢的时候，全世界都会帮他！",
      image: "/JB/JB_Jiangzhian.JPG",
      a: "#dff5ea",
      b: "#fff0bf"
    }
  },
  {
    title: "在尼莫点建一座灯塔",
    leftRole: {
      name: "归雁",
      line: "让我做你永不熄灭的灯塔，你做我永不迷失的航向。",
      image: "/JB/JB_Guiyan.JPG",
      a: "#ffe1d6",
      b: "#dcefff"
    },
    rightRole: {
      name: "海星",
      line: "只要有你，世间所有的目光与议论，便都不值一提。",
      image: "/JB/JB_Haixing.JPG",
      a: "#e8dfff",
      b: "#dff5ea"
    }
  },
  {
    title: "永不褪色的山楂林",
    leftRole: {
      name: "瞿蓉",
      line: "金风玉露一相逢，便胜却人间无数。",
      image: "/JB/JB_Qurong.JPG",
      a: "#fff0bf",
      b: "#f2a7aa"
    },
    rightRole: {
      name: "陈小虎",
      line: "我不是一个浪漫的人，却独独想为你做尽浪漫的事。",
      image: "/JB/JB_Chenxiaohu.JPG",
      a: "#d8efe4",
      b: "#dcefff"
    }
  }
];

const mapViews = {
  europe: { center: [49.2, -3.2], zoom: 4 },
  china: { center: [32.8, 108.5], zoom: 4 }
};

function getTimeValues() {
  const diff = Math.max(0, Date.now() - loveStart);
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
}

function FloatingDots() {
  return (
    <>
      <span className="float" />
      <span className="float" />
      <span className="float" />
    </>
  );
}

function DeerSymbol() {
  return (
    <div className="symbols" aria-hidden="true">
      <i className="cane" />
      <svg className="deer-line" viewBox="0 0 120 92">
        <path d="M31 65 C39 38, 76 36, 89 60 C92 66, 88 75, 77 76 L49 76 C36 76, 27 73, 31 65Z" fill="none" stroke="#d88477" strokeWidth="4" strokeLinecap="round" />
        <path d="M74 38 C78 22, 87 17, 98 13 M80 38 C91 31, 101 31, 111 35 M46 40 C38 24, 29 18, 18 14 M40 42 C30 33, 20 33, 10 37" fill="none" stroke="#d88477" strokeWidth="4" strokeLinecap="round" />
        <path d="M70 52 C73 49, 78 49, 81 52" fill="none" stroke="#d88477" strokeWidth="3" strokeLinecap="round" />
        <circle cx="58" cy="56" r="3" fill="#d88477" />
      </svg>
    </div>
  );
}

function TimerCard({ label, value }) {
  const [ticking, setTicking] = useState(false);
  const previousValue = useRef(value);

  useEffect(() => {
    if (previousValue.current === value) {
      return;
    }

    previousValue.current = value;
    setTicking(false);
    const frame = requestAnimationFrame(() => setTicking(true));
    const timer = window.setTimeout(() => setTicking(false), 240);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [value]);

  return (
    <div className={`calendar-card${ticking ? " tick" : ""}`}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function Hero({ timeValues }) {
  return (
    <section className="site-header" aria-label="甘蔗和小鹿的网页抬头">
      <div className="masthead">
        <div className="masthead-top">
          <h1>甘蔗 & 小鹿</h1>
          <p className="welcome-line">欢迎光临甘蔗和小鹿的小家！</p>
        </div>

        <div className="flip-timer" aria-label="相爱正计时">
          <div className="calendar-grid">
            <TimerCard label="Days" value={String(timeValues.days)} />
            <TimerCard label="Hours" value={pad(timeValues.hours)} />
            <TimerCard label="Minutes" value={pad(timeValues.minutes)} />
            <TimerCard label="Seconds" value={pad(timeValues.seconds)} />
          </div>
        </div>
        <p className="masthead-subtitle">想记录下我们之间的每一刻点滴。看，我们在这里寄出信件，留下照片，走过世界的各个角落。这是我们共同的旅程，欢迎你，我的爱人💞。</p>
      </div>
    </section>
  );
}

function WindowFrame({ title, children }) {
  return (
    <section className="window">
      <div className="window-bar">
        <div className="dots"><span className="dot" /></div>
        <div className="bar-title">{title}</div>
      </div>
      {children}
    </section>
  );
}

function FilmAlbum() {
  return (
    <WindowFrame title="film album">
      <div className="section-pad">
        <div className="section-title">
          <div>
            <h2>胶卷记忆</h2>
            <p>那些难忘的时刻，都值得一张照片来珍藏。</p>
          </div>
          <span className="hint">横向滚动 · 查看更多</span>
        </div>
        <div className="film-strip" aria-label="胶卷相册横向列表">
          {photos.map((photo, index) => (
            <article className="film-card" style={{ "--photo-a": photo.a, "--photo-b": photo.b }} key={photo.title}>
              <div className={`photo${photo.image ? " has-image" : ""}`} data-index={pad(index + 1)}>
                {photo.image ? <img src={photo.image} alt={photo.title} /> : null}
              </div>
              <div className="film-meta">
                <strong>{photo.title}</strong>
                <span>{photo.meta}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
}

function LetterTimeline() {
  return (
    <WindowFrame title="letter timeline">
      <div className="section-pad letters-wrap">
        <div className="section-title">
          <div>
            <h2>几封情书</h2>
            <p>时间轴会向右生长，爱意会藏进墨香。</p>
          </div>
          <span className="hint">左右滚动 · 点击查看</span>
        </div>
        <div className="letters-track" aria-label="信件时间轴">
          {letters.map((letter) => (
            <Link className="letter-card" href={`/letters/${letter.id}`} key={letter.id}>
              <span className="letter-date">{letter.date}</span>
              <div>
                <h3>{letter.title}</h3>
                <p>{letter.preview}</p>
              </div>
              <span className="letter-foot"><span>{letter.from}</span><span>打开信件 →</span></span>
            </Link>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
}

function CharacterPortrait({ role, side }) {
  return (
    <figure className={`script-portrait ${side}`} style={{ "--portrait-a": role.a, "--portrait-b": role.b }}>
      {role.image ? (
        <img src={role.image} alt={`${role.name} 人物立绘`} />
      ) : (
        <div className="script-portrait-placeholder" aria-label={`${role.name} 人物立绘占位`}>
          <span>{side === "left" ? "L" : "R"}</span>
          <b>{role.name}</b>
        </div>
      )}
    </figure>
  );
}

function ScriptWorld() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const scrollToCard = (index) => {
    const nextIndex = (index + scripts.length) % scripts.length;
    setActiveIndex(nextIndex);
    trackRef.current?.children[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  };

  const updateActiveFromScroll = () => {
    if (!trackRef.current) {
      return;
    }

    const track = trackRef.current;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const nearestIndex = Array.from(track.children).reduce((nearest, child, index) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(childCenter - trackCenter);
      return distance < nearest.distance ? { index, distance } : nearest;
    }, { index: 0, distance: Infinity }).index;

    setActiveIndex(nearestIndex);
  };

  return (
    <WindowFrame title="script world">
      <div className="section-pad script-world">
        <div className="section-title">
          <div>
            <h2>剧本世界</h2>
            <p>那些并肩走过的故事，也会在这里留下角色和台词。</p>
          </div>
          <div className="script-controls" aria-label="剧本世界切换">
            <button type="button" onClick={() => scrollToCard(activeIndex - 1)} aria-label="上一张剧本卡">‹</button>
            <span>{pad(activeIndex + 1)} / {pad(scripts.length)}</span>
            <button type="button" onClick={() => scrollToCard(activeIndex + 1)} aria-label="下一张剧本卡">›</button>
          </div>
        </div>

        <div className="script-track" ref={trackRef} onScroll={updateActiveFromScroll} aria-label="剧本杀卡片列表">
          {scripts.map((script) => (
            <article className="script-card" key={script.title}>
              <CharacterPortrait role={script.leftRole} side="left" />
              <div className="script-center">
                <div>
                  <h3>{script.title}</h3>
                </div>
                <div className="script-lines">
                  <div className="script-line">
                    <span>{script.leftRole.name}</span>
                    <p>{script.leftRole.line}</p>
                  </div>
                  <div className="script-line">
                    <span>{script.rightRole.name}</span>
                    <p>{script.rightRole.line}</p>
                  </div>
                </div>
              </div>
              <CharacterPortrait role={script.rightRole} side="right" />
            </article>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
}

function TravelMap({ totalDays }) {
  const [region, setRegion] = useState("europe");
  const [activePlace, setActivePlace] = useState(() => places.find((place) => place.region === "europe"));
  const [mapError, setMapError] = useState(false);
  const mapStageRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const visiblePlaces = useMemo(() => places.filter((place) => place.region === region), [region]);
  const countryCount = useMemo(() => new Set(places.map((place) => place.country)).size, []);

  useEffect(() => {
    setActivePlace(visiblePlaces[0]);
  }, [visiblePlaces]);

  useEffect(() => {
    let cancelled = false;

    async function renderMap() {
      if (!mapStageRef.current) {
        return;
      }

      try {
        const leaflet = await import("leaflet");
        const L = leaflet.default || leaflet;
        if (cancelled || !mapStageRef.current) {
          return;
        }

        setMapError(false);

        if (!mapRef.current) {
          mapRef.current = L.map(mapStageRef.current, {
            scrollWheelZoom: false,
            zoomControl: true
          });
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap contributors"
          }).addTo(mapRef.current);
        }

        markersRef.current.forEach(({ marker }) => marker.remove());
        markersRef.current = [];
        mapRef.current.setView(mapViews[region].center, mapViews[region].zoom);

        if (!visiblePlaces.length) {
          window.setTimeout(() => mapRef.current?.invalidateSize(), 80);
          return;
        }

        visiblePlaces.forEach((place) => {
          const marker = L.marker([place.lat, place.lng], {
            title: place.name,
            icon: L.divIcon({
              className: "",
              html: `<div class="map-pin${activePlace?.name === place.name ? " active" : ""}"><span>${place.flag}</span></div>`,
              iconSize: [36, 36],
              iconAnchor: [18, 34]
            })
          }).addTo(mapRef.current);
          marker.bindTooltip(place.name, { direction: "bottom", offset: [0, 10], opacity: 0.94 });
          marker.on("click", () => setActivePlace(place));
          markersRef.current.push({ marker, place });
        });

        window.setTimeout(() => mapRef.current?.invalidateSize(), 80);
      } catch {
        setMapError(true);
      }
    }

    renderMap();

    return () => {
      cancelled = true;
    };
  }, [activePlace?.name, region, visiblePlaces]);

  useEffect(() => {
    markersRef.current.forEach(({ marker, place }) => {
      const markerElement = marker.getElement();
      markerElement?.querySelector(".map-pin")?.classList.toggle("active", place.name === activePlace?.name);
    });
  }, [activePlace?.name]);

  useEffect(() => {
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, []);

  return (
    <WindowFrame title="travel map">
      <div className="section-pad">
        <div className="section-title">
          <div>
            <h2>旅行地图</h2>
            <p>这里是我们用一起用双脚丈量过的世界。</p>
          </div>
          <span className="hint">切换区域 · 点击地标</span>
        </div>
        <p className="footprint-stat">我们的足迹已经到达 <b>{countryCount}</b> 个国家，<b>{places.length}</b> 座城市，用时 <b>{totalDays}</b> 天</p>
        <div className="map-grid">
          <aside className="map-info">
            <div>
              <div className="map-tabs" role="tablist" aria-label="旅行地图区域">
                {["europe", "china"].map((item) => (
                  <button
                    className={`map-tab${region === item ? " active" : ""}`}
                    type="button"
                    data-region={item}
                    key={item}
                    onClick={() => setRegion(item)}
                  >
                    {item === "europe" ? "欧洲" : "中国"}
                  </button>
                ))}
              </div>
              <div className="place-body">
                <div>
                  <div className="place-kicker">{region === "europe" ? "Europe Memory" : "China Memory"}</div>
                  <div className="place-name">{activePlace?.name ?? "暂无国内足迹"}</div>
                  <div className="place-date">{activePlace?.date ?? "不远的将来"}</div>
                  <p className="place-memory">{activePlace?.memory ?? "在不远的将来，一起去更多地方吧！"}</p>
                </div>
                {activePlace && (
                  <figure className="place-photo">
                    {activePlace.photo ? (
                      <img src={activePlace.photo} alt={`${activePlace.name} travel memory`} />
                    ) : (
                      <div className="place-photo-placeholder">
                        <span>{activePlace.flag}</span>
                        <b>Photo</b>
                      </div>
                    )}
                  </figure>
                )}
              </div>
            </div>
            <p className="map-note">每一个城市，都记录着我们独一无二的回忆。</p>
          </aside>
          <div className="map-stage" aria-label="互动旅行地图" ref={mapStageRef}>
            {mapError && <div className="map-fallback">真实地图需要网络加载 OpenStreetMap。现在可以先查看左侧城市记忆。</div>}
            {!mapError && !visiblePlaces.length && <div className="map-fallback">这里暂时没有哦</div>}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

export default function Home() {
  const [timeValues, setTimeValues] = useState(initialTimeValues);

  useEffect(() => {
    setTimeValues(getTimeValues());
    const timer = window.setInterval(() => setTimeValues(getTimeValues()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <FloatingDots />
      <main className="page">
        <Hero timeValues={timeValues} />
        <FilmAlbum />
        <LetterTimeline />
        <TravelMap totalDays={timeValues.days} />
        <ScriptWorld />
        <div className="footer">Ganzhe & Lulu · a soft room growing one memory at a time</div>
      </main>
    </>
  );
}
