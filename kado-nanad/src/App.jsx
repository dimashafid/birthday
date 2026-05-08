import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────
// GANTI NAMA FILE SESUAI FOLDER PUBLIC KAMU
// ─────────────────────────────────────────
const LINK_MUSIK = "/music.mp3";

const FOTO_SLIDE2 = "/slide2.png"; 
const FOTO_DIMAS = "/foto.png"; 

const KOLASE_SLIDE3 = [
  "/tebakkata.png",
  "/boattogether.png",
  "/noxera.png",
  "/velora.png",
  "/euthenia.png",
  "/bangsal.png",
  "/catalog.png",
];
// ─────────────────────────────────────────

const slides = [
  {
    id: 1,
    type: "opening",
    title: "For My Kisahh, Nanad",
    subtitle: "It's your birthday present!",
    body: "Maaf sebelumnya aku sama sekali gatau kalau kemarin kamu ultah, dan gaada pikiran sama sekali yang ngarah ke situ, aku juga gapernah nanyain zodiak ke kamu wkwk. jadi aku buat ini sekalian belajar, semoga kamu suka yaa",
    emoji: "✨",
    bg: "from-slate-900 via-indigo-950 to-slate-900", 
  },
  {
    id: 2,
    type: "photo-single",
    body: "aku mau ajak flashback dulu. bayangin kalo waktu itu kamu ga minta carry, mungkin aku gabakal tau kamu selamanya atau emang takdirnya udah kaya gini? whoops. dan waktu itu kamu minta carry karna lagi makan, dan setelah kenal kamu itu aku jadi ngerasa aneh karna waktu itu masih sore dan biasanya kamu makan kalo udah aga malem, hmm",
    bg: "from-indigo-950 via-blue-950 to-slate-900", 
    photo: FOTO_SLIDE2,
    photoCaption: "ini ss an pertama yang kuambil waktu main sama kamu, harusnya aku minta foto waktu awal dulu",
  },
  {
    id: 3,
    type: "slideshow", 
    body: "Padahal setelah fl an itu kita jadi asing kaya 3 mingguan karna waktu itu aku cuma main artik aja, dan gatau kenapa kita jadi sering main habis itu. Apakah karna udah mulai timbul perasaan? weww",
    bg: "from-blue-950 via-indigo-900 to-slate-950", 
    photos: KOLASE_SLIDE3,
  },
  {
    id: 4,
    type: "birthday",
    title: "Happy Birthday!",
    subtitle: "You have turned 21 🎈",
    body: "Semoga semua mimpi dan harapanmu bisa terwujud. wish u happy always. makasih udah mau rela turun ke bumi demi aku 🐊. kayaknya aku orang terakhir yang ngucapin ultah ke kamu, karna aku emang mau jadi yg terakhir buat kamu 🐊. tetep jadi anak yang baik yaa, love you 🩵",
    emoji: "🎂",
    bg: "from-sky-300 via-blue-100 to-orange-100", 
    photoDimas: FOTO_DIMAS,
    extraText: "pose plenger",
    fromText: "from : alam bawah sadarnya dimas",
     
  },
];

function FloatingCloud({ style, fill = "#ffffff", opacity = 0.4 }) {
  return (
    <div className="absolute pointer-events-none" style={{ opacity, ...style }}>
      <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
        <ellipse cx="60" cy="40" rx="55" ry="18" fill={fill} />
        <ellipse cx="40" cy="32" rx="28" ry="20" fill={fill} />
        <ellipse cx="70" cy="28" rx="32" ry="22" fill={fill} />
        <ellipse cx="90" cy="36" rx="22" ry="16" fill={fill} />
      </svg>
    </div>
  );
}

function Star({ style }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,12 3.5,15 5,9.5 1,6 6,6" fill="#fef08a" opacity="0.8" />
      </svg>
    </div>
  );
}

function Moon({ style }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <path d="M50 15A35 35 0 1 0 85 50A25 25 0 0 1 50 15Z" fill="#fef08a" opacity="0.9" />
      </svg>
      <div className="absolute inset-0 bg-yellow-200 blur-3xl opacity-20 rounded-full"></div>
    </div>
  );
}

function Sun({ style }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="28" fill="#fde047" />
        <path d="M60 10 L60 22 M60 98 L60 110 M10 60 L22 60 M98 60 L110 60 M24 24 L33 33 M87 87 L96 96 M24 96 L33 87 M87 24 L96 33" stroke="#fde047" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 bg-yellow-300 blur-3xl opacity-40 rounded-full"></div>
    </div>
  );
}

function ProgressDots({ total, current, isNight }) {
  return (
    <div className="flex gap-2 justify-center mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-500 ${
            i === current
              ? isNight ? "w-6 h-3 bg-yellow-400" : "w-6 h-3 bg-sky-500"
              : i < current
              ? isNight ? "w-3 h-3 bg-yellow-200" : "w-3 h-3 bg-sky-300"
              : isNight ? "w-3 h-3 bg-slate-700 border border-slate-500" : "w-3 h-3 bg-sky-100 border border-sky-300"
          }`}
        />
      ))}
    </div>
  );
}

function SinglePhoto({ src, caption }) {
  return (
    <div className="my-4">
      <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-lg shadow-sky-200/60">
        <img
          src={src}
          alt="Kenangan kita"
          className="w-full object-cover"
          style={{ maxHeight: "220px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/30 pointer-events-none" />
      </div>
      {caption && (
        <p className="text-sky-500 text-xs text-center mt-2 italic">{caption}</p>
      )}
    </div>
  );
}

function PhotoSlideshow({ photos }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!photos || photos.length === 0) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [photos]);

  return (
    <div className="my-4">
      <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-lg shadow-sky-200/60 bg-sky-50" style={{ height: "220px" }}>
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slideshow ${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/40 pointer-events-none" />
        
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {photos.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />
          ))}
        </div>
      </div>
      <p className="text-sky-500 text-xs text-center mt-2 italic">aku gengsi ngajak foto kamu waktu awal itu wkwk, jadi gaada fotonya deh</p>
    </div>
  );
}

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const [visible, setVisible] = useState(true);

  const isNight = current < 3; 

  const handleOpenLetter = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Auto-play dicegah oleh browser"));
    }
  };

  const goTo = (next, dir) => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setVisible(false);
    setTimeout(() => {
      setCurrent(next);
      setVisible(true);
      setTimeout(() => setAnimating(false), 850); 
    }, 800); 
  };

  const next = () => { if (current < slides.length - 1) goTo(current + 1, "right"); };
  const prev = () => { if (current > 0) goTo(current - 1, "left"); };

  const slide = slides[current];

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={LINK_MUSIK} type="audio/mpeg" />
      </audio>

      {/* LANDING PAGE: SURAT */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900 transition-all duration-[2500ms] ease-in-out px-4
          ${isOpened ? "opacity-0 pointer-events-none scale-125" : "opacity-100 scale-100"}`}
      >
        <div
          onClick={handleOpenLetter}
          className="relative w-full max-w-sm h-64 bg-[#f8f9fa] rounded-lg shadow-2xl border border-gray-200 cursor-pointer hover:-translate-y-2 hover:shadow-sky-500/20 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden group"
        >
          <div 
            className="absolute top-0 left-0 w-full h-1/2 bg-white shadow-sm z-0" 
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          ></div>

          <div className="z-10 flex flex-col items-center mt-6">
            <h2 className="text-3xl font-serif italic text-sky-800 text-base mb-1 drop-shadow-sm">
              Only for Nanad
            </h2>
            <p className="text-sky-500 text-sm animate-pulse tracking-wide mt-2">
              click to open
            </p>
          </div>

          <div className="absolute bottom-3 right-4 z-10">
            <p className="text-[11px] text-gray-500 font-serif italic">
              from someone you know :)
            </p>
          </div>
        </div>
      </div>

      <div
        className={`min-h-screen bg-gradient-to-b ${slide.bg} transition-colors duration-[2500ms] relative overflow-hidden flex flex-col items-center justify-center px-4 py-8 font-sans
          ${isOpened ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
      >
        
        {/* AKSESORIS BACKGROUND MALAM */}
        <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-[2000ms] ${isNight ? "opacity-100" : "opacity-0"}`}>
          <Moon style={{ top: "8%", right: "10%", animation: "bounceUp 6s ease-in-out infinite" }} />
          <Star style={{ top: "15%", left: "10%", animation: "sparkle 3s infinite" }} />
          <Star style={{ top: "25%", right: "20%", transform: "scale(0.8)", animation: "sparkle 2s infinite 1s" }} />
          <Star style={{ bottom: "35%", left: "15%", transform: "scale(1.2)", animation: "sparkle 4s infinite 0.5s" }} />
          <Star style={{ top: "40%", right: "10%", transform: "scale(0.5)", animation: "sparkle 2.5s infinite 1.5s" }} />
          <Star style={{ bottom: "20%", right: "25%", transform: "scale(0.9)", animation: "sparkle 3.5s infinite 2s" }} />
          <Star style={{ top: "60%", left: "20%", transform: "scale(0.7)", animation: "sparkle 2.8s infinite 0.2s" }} />
          <Star style={{ bottom: "10%", left: "40%", transform: "scale(1.1)", animation: "sparkle 3.2s infinite 1.2s" }} />
          <FloatingCloud fill="#94a3b8" opacity={0.15} style={{ top: "15%", left: "-5%", transform: "scale(1.5)" }} />
          <FloatingCloud fill="#94a3b8" opacity={0.1} style={{ bottom: "20%", right: "-5%", transform: "scale(1.2) scaleX(-1)" }} />
        </div>

        {/* AKSESORIS BACKGROUND SIANG */}
        <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-[2000ms] delay-500 ${!isNight ? "opacity-100" : "opacity-0"}`}>
          <Sun style={{ top: "5%", left: "5%", animation: "spinSlow 20s linear infinite" }} />
          <FloatingCloud fill="#ffffff" opacity={0.8} style={{ top: "10%", right: "-2%", transform: "scale(1.2) scaleX(-1)" }} />
          <FloatingCloud fill="#ffffff" opacity={0.7} style={{ top: "25%", left: "-4%", transform: "scale(0.9)" }} />
          <FloatingCloud fill="#ffffff" opacity={0.6} style={{ bottom: "15%", left: "5%", transform: "scale(1.4)" }} />
          <FloatingCloud fill="#ffffff" opacity={0.9} style={{ bottom: "8%", right: "-2%", transform: "scale(1.1) scaleX(-1)" }} />
          <FloatingCloud fill="#ffffff" opacity={0.5} style={{ top: "45%", right: "80%", transform: "scale(0.7)" }} />
        </div>

        <p className={`text-sm font-medium tracking-widest uppercase mb-3 z-10 transition-colors duration-[2000ms] ${isNight ? "text-slate-400" : "text-sky-400"}`}>
          {current + 1} / {slides.length}
        </p>

        {/* CARD UTAMA */}
        <div
          className="z-10 w-full max-w-md"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateX(0) scale(1)"
              : direction === "right"
              ? "translateX(40px) scale(0.97)"
              : "translateX(-40px) scale(0.97)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden p-6 sm:p-8">
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r transition-colors duration-[2000ms] ${isNight ? "from-indigo-400 via-purple-400 to-indigo-300" : "from-sky-300 via-blue-400 to-cyan-300"}`} />

            {(slide.title || slide.emoji) && (
              <>
                <div className="text-base mb-4 text-center">
                  {slide.emoji && (
                    <div className="text-6xl mb-4 select-none" style={{ lineHeight: 1 }}>
                      {slide.emoji}
                    </div>
                  )}
                  {slide.title && (
                    <h1 className="font-bold text-sky-800 leading-tight mb-1 text-2xl sm:text-3xl">
                      {slide.title}
                    </h1>
                  )}
                  {slide.subtitle && (
                    <p className="text-sky-500 font-medium text-sm tracking-wide">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex-1 h-px transition-colors duration-1000 ${isNight ? "bg-slate-200" : "bg-sky-100"}`} />
                  <div className={`w-2 h-2 rounded-full transition-colors duration-1000 ${isNight ? "bg-indigo-300" : "bg-sky-300"}`} />
                  <div className={`flex-1 h-px transition-colors duration-1000 ${isNight ? "bg-slate-200" : "bg-sky-100"}`} />
                </div>
              </>
            )}

            {slide.type === "photo-single" && (
              <SinglePhoto src={slide.photo} caption={slide.photoCaption} />
            )}

            {slide.type === "slideshow" && (
              <PhotoSlideshow photos={slide.photos} />
            )}

            <p className={`text-slate-600 leading-relaxed text-base mb-4 font-medium ${slide.id >= 2 && slide.id <= 3 ? "text-justify" : "text-center"}`}>
              {slide.body}
            </p>

            {slide.type === "birthday" && (
              <div className="mt-6 flex flex-col items-center">
                {slide.photoDimas && (
                  <img 
                    src={slide.photoDimas} 
                    alt="Dimas" 
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md object-cover object-[50%_15%] mb-2"
                  />
                )}
                
                {slide.fromText && (
                  <p className="text-slate-400 font-serif italic text-xs sm:text-sm mb-1">
                    {slide.fromText}
                  </p>
                )}
                
                {slide.extraText && (
                  <p className="text-sky-600 font-medium text-xs sm:text-sm mb-5 text-center px-4">
                    {slide.extraText}
                  </p>
                )}

                <div className="flex justify-center gap-2 text-2xl select-none">
                  {["🎈", "🎉", "🎁", "🎊", "🎈"].map((c, i) => (
                    <span key={i} style={{ animation: `bounceUp 1s infinite ${i * 0.15}s`, display: "inline-block" }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <ProgressDots total={slides.length} current={current} isNight={isNight} />
        </div>

        {/* TOMBOL NAVIGASI */}
        <div className="flex gap-4 mt-8 z-10">
          <button
            onClick={prev}
            disabled={current === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm border transition-all duration-300
              ${current === 0
                ? "border-white/10 text-white/30 cursor-not-allowed bg-white/5"
                : isNight
                ? "border-indigo-300/50 text-indigo-100 bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-sm"
                : "border-sky-300 text-sky-600 bg-white/80 hover:bg-sky-50 active:scale-95 shadow-sm"
              }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kembali
          </button>

          {current < slides.length - 1 ? (
            <button
              onClick={next}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm text-white shadow-lg transition-all duration-300 active:scale-95
                ${isNight ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/50" : "bg-sky-500 hover:bg-sky-600 shadow-sky-500/30"}`}
            >
              Lanjut
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => goTo(0, "left")}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm bg-blue-500 hover:bg-blue-600 active:scale-95 text-white shadow-xl shadow-blue-500/30 transition-all duration-300"
            >
              Ulangi
            </button>
          )}
        </div>

        <p className={`text-xs mt-4 z-10 transition-colors duration-1000 ${isNight ? "text-indigo-200/50" : "text-sky-400/70"}`}>
          {current === 0 ? "yg bikin sedang mencoba untuk sweet akowkaowo" : ""}
        </p>

        <style>{`
          @keyframes bounceUp {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0.2; transform: scale(0.8) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.2) rotate(45deg); }
          }
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
}