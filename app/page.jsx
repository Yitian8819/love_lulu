"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const loveStart = new Date("2025-12-11T23:00:00+01:00").getTime();
const pad = (number) => String(number).padStart(2, "0");

const photos = [
  { title: "第一张散步", meta: "2025 · placeholder", a: "#dff5ea", b: "#f2a7aa" },
  { title: "靠窗的位置", meta: "2025 · placeholder", a: "#dcefff", b: "#fff0bf" },
  { title: "甜甜的下午", meta: "2026 · placeholder", a: "#ffe1d6", b: "#dff5ea" },
  { title: "地图上的点", meta: "2026 · placeholder", a: "#d8efe4", b: "#e8dfff" },
  { title: "某天的风", meta: "2026 · placeholder", a: "#ffe9b8", b: "#dcefff" }
];

const letters = [
  { id: "first-light", date: "2025.12.11", from: "Ganzhe → Lulu", title: "第一束认真亮起的光", preview: "把今晚收好，留给以后慢慢打开。" },
  { id: "soft-winter", date: "2025.12.24", from: "Lulu → Ganzhe", title: "冬天也可以很甜", preview: "有些话像热饮，握在手里就不冷了。" },
  { id: "new-year", date: "2026.01.01", from: "Ganzhe → Lulu", title: "新年的第一封", preview: "想和你一起把很多普通日子变得不普通。" },
  { id: "tiny-map", date: "2026.02.14", from: "Lulu → Ganzhe", title: "地图上的小标记", preview: "下一次见面，就把这个点改成真实坐标。" },
  { id: "spring-window", date: "2026.03.21", from: "Ganzhe → Lulu", title: "窗边的春天", preview: "等风变软，我们就一起去晒太阳。" },
  { id: "long-road", date: "2026.05.20", from: "Lulu → Ganzhe", title: "慢慢走也没关系", preview: "时间轴很长，我们还有很多格子可以填满。" }
];

const places = [
  { region: "europe", country: "France", name: "Paris", flag: "🇫🇷", date: "2025.12.11", memory: "第一站落在巴黎，把故事从这一天认真点亮。", photo: "", lat: 48.8566, lng: 2.3522 },
  { region: "europe", country: "Iceland", name: "Reykjavik", flag: "🇮🇸", date: "2025.12.20", memory: "在很北的地方留下冬天的坐标，也留下靠近彼此的温度。", photo: "", lat: 64.1466, lng: -21.9426 },
  { region: "europe", country: "Spain", name: "Barcelona", flag: "🇪🇸", date: "2026.5.18", memory: "把海风、街角和明亮的五月一起放进地图里。", photo: "", lat: 41.3851, lng: 2.1734 },
  { region: "europe", country: "Spain", name: "Ibiza", flag: "🇪🇸", date: "2026.5.19", memory: "岛上的一天单独闪光，适合被标成一枚小小的星。", photo: "", lat: 38.9067, lng: 1.4206 },
  { region: "europe", country: "Italy", name: "Taormina", flag: "🇮🇹", date: "2026.5.21", memory: "把西西里的蓝和山城的风，钉在五月的最后一枚地标上。", photo: "", lat: 37.8516, lng: 15.2853 }
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
        <p className="masthead-subtitle">把细碎的日子收进一扇明亮的窗口里。这里有正在生长的时间、等待替换成真实照片的胶卷、可以越写越长的信件轴，还有以后会慢慢点亮的旅行地图。</p>
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
            <h2>胶卷相册</h2>
            <p>先用占位画面留好位置，之后把照片地址换进去就好。</p>
          </div>
          <span className="hint">横向滚动查看更多</span>
        </div>
        <div className="film-strip" aria-label="胶卷相册横向列表">
          {photos.map((photo, index) => (
            <article className="film-card" style={{ "--photo-a": photo.a, "--photo-b": photo.b }} key={photo.title}>
              <div className="photo" data-index={pad(index + 1)} />
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
            <h2>互相寄信的时间轴</h2>
            <p>每个节点都是一封未来可以打开的信。时间轴会向右继续生长。</p>
          </div>
          <span className="hint">左右滚动 · 点击节点跳转</span>
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
            <p>重要城市先点亮一点点，后面可以继续把时间和记忆补上。</p>
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
                  <div className="place-date">{activePlace?.date ?? "先不放置任何内容"}</div>
                  <p className="place-memory">{activePlace?.memory ?? "国内部分暂时没有，等以后有了真实城市再点亮。"}</p>
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
            <p className="map-note">新增地点时，只需要在页面里的地点数组继续添加城市、区域、坐标、日期、小记忆和照片。</p>
          </aside>
          <div className="map-stage" aria-label="互动旅行地图" ref={mapStageRef}>
            {mapError && <div className="map-fallback">真实地图需要网络加载 OpenStreetMap。现在可以先查看左侧城市记忆。</div>}
            {!mapError && !visiblePlaces.length && <div className="map-fallback">国内部分暂时没有，先不放置任何内容。</div>}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

export default function Home() {
  const [timeValues, setTimeValues] = useState(() => getTimeValues());

  useEffect(() => {
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
        <div className="footer">Ganzhe & Lulu · a soft room growing one memory at a time</div>
      </main>
    </>
  );
}
