import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────
// GANTI URL FOTO & MUSIK DI SINI
// ─────────────────────────────────────────
const LINK_MUSIK = "https://www.bensound.com/bensound-music/bensound-love.mp3"; // Ganti dengan link lagumu

const FOTO_SLIDE2 = "https://placehold.co/400x260/bae6fd/1e40af?text=Foto+Kenangan+1";
const FOTO_SLIDE4 = "https://placehold.co/400x260/bae6fd/1e40af?text=Foto+Kenangan+2";
const FOTO_DIMAS = "https://placehold.co/200x200/93c5fd/1e3a8a?text=Foto+Dimas"; // Ganti foto muka Dimas di sini

const KOLASE_SLIDE3 = [
  "https://placehold.co/400x260/bae6fd/1e40af?text=Foto+Slideshow+1",
  "https://placehold.co/400x260/93c5fd/1e3a8a?text=Foto+Slideshow+2",
  "https://placehold.co/400x260/7dd3fc/0c4a6e?text=Foto+Slideshow+3",
];
// ─────────────────────────────────────────

const slides = [
  {
    id: 1,
    type: "opening",
    title: "Untuk Kamu, Nanad",
    subtitle: "yang selalu ada di hatiku 💙",
    body: "Ada sesuatu yang ingin aku ceritakan... sebuah perjalanan kecil yang penuh kenangan indah bersamamu.",
    emoji: "✨",
    bg: "from-sky-100 via-blue-50 to-white",
  },
  {
    id: 2,
    type: "photo-single",
    // Judul & Emoji dihapus untuk slide ini
    body: "Hari pertama kita bertemu, aku tidak menyangka momen kecil itu akan menjadi salah satu kenangan terbaik dalam hidupku.",
    bg: "from-blue-100 via-sky-50 to-white",
    photo: FOTO_SLIDE2,
    photoCaption: "Momen pertama yang tak terlupakan ✨",
  },
  {
    id: 3,
    type: "slideshow", // Diubah menjadi slideshow
    // Judul & Emoji dihapus untuk slide ini
    body: "Setiap momen yang kita jalani bersama, tak akan pernah tergantikan.",
    bg: "from-cyan-100 via-sky-50 to-white",
    photos: KOLASE_SLIDE3,
  },
  {
    id: 4,
    type: "photo-single",
    // Judul & Emoji dihapus untuk slide ini
    body: "Cara kamu tertawa, semangatmu yang nggak pernah padam — itulah yang membuat dunia di sekitarmu selalu terasa lebih hangat.",
    bg: "from-sky-200 via-blue-50 to-white",
    photo: FOTO_SLIDE4,
    photoCaption: "Selalu ada cahaya di matamu 💙",
  },
  {
    id: 5,
    type: "birthday",
    title: "Selamat Ulang Tahun!",
    subtitle: "Semoga hari ini seindah dirimu",
    body: "Di hari istimewamu ini, semoga semua mimpi dan harapanmu terwujud. Semoga kebahagiaan selalu mengiringi setiap langkahmu. Terima kasih sudah ada. 💙",
    emoji: "🎂",
    bg: "from-blue-200 via-sky-100 to-white",
    photoDimas: FOTO_DIMAS,
    fromText: "from : alam bawah sadarnya dimas",
  },
];

function FloatingCloud({ style }) {
  return (
    <div className="absolute opacity-40 pointer-events-none" style={style}>
      <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
        <ellipse cx="60" cy="40" rx="55" ry="18" fill="#bae6fd" />
        <ellipse cx="40" cy="32" rx="28" ry="20" fill="#e0f2fe" />
        <ellipse cx="70" cy="28" rx="32" ry="22" fill="#e0f2fe" />
        <ellipse cx="90" cy="36" rx="22" ry="16" fill="#bae6fd" />
      </svg>
    </div>
  );
}

function Star({ style }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,12 3.5,15 5,9.5 1,6 6,6" fill="#7dd3fc" opacity="0.6" />
      </svg>
    </div>
  );
}

function ProgressDots({ total, current }) {
  return (
    <div className="flex gap-2 justify-center mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-500 ${
            i === current
              ? "w-6 h-3 bg-sky-500"
              : i < current
              ? "w-3 h-3 bg-sky-300"
              : "w-3 h-3 bg-sky-100 border border-sky-300"
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
          alt="Foto kenangan"
          className="w-full object-cover"
          style={{ maxHeight: "220px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sky-900/20 pointer-events-none" />
      </div>
      {caption && (
        <p className="text-sky-500 text-xs text-center mt-2 italic">{caption}</p>
      )}
    </div>
  );
}

// Komponen Slideshow Otomatis Baru
function PhotoSlideshow({ photos }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!photos || photos.length === 0) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % photos.length);
    }, 2500); // Ganti foto setiap 2.5 detik
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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sky-900/30 pointer-events-none" />
        
        {/* Indikator Titik Slideshow di Dalam Gambar */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {photos.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />
          ))}
        </div>
      </div>
      <p className="text-sky-500 text-xs text-center mt-2 italic">Kenangan yang terus berputar 🌊</p>
    </div>
  );
}

export default function BirthdaySlides() {
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const [visible, setVisible] = useState(true);

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
      setTimeout(() => setAnimating(false), 400);
    }, 300);
  };

  const next = () => { if (current < slides.length - 1) goTo(current + 1, "right"); };
  const prev = () => { if (current > 0) goTo(current - 1, "left"); };

  const slide = slides[current];

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src={LINK_MUSIK} type="audio/mpeg" />
      </audio>

      {/* ───────────────────────────────────────── */}
      {/* LANDING PAGE: SURAT */}
      {/* ───────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900 transition-all duration-1000 ease-in-out px-4
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
            <h2 className="text-3xl font-serif italic text-sky-800 text-center mb-1 drop-shadow-sm">
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

      {/* ───────────────────────────────────────── */}
      {/* KONTEN UTAMA */}
      {/* ───────────────────────────────────────── */}
      <div
        className={`min-h-screen bg-gradient-to-b ${slide.bg} transition-all duration-1000 relative overflow-hidden flex flex-col items-center justify-center px-4 py-8 font-sans
          ${isOpened ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
      >
        <FloatingCloud style={{ top: "5%", left: "-4%", transform: "scale(1.4)" }} />
        <FloatingCloud style={{ top: "10%", right: "0%", transform: "scale(0.9) scaleX(-1)" }} />
        <FloatingCloud style={{ bottom: "12%", left: "5%", transform: "scale(0.7)" }} />
        <FloatingCloud style={{ bottom: "8%", right: "-2%", transform: "scale(1.1) scaleX(-1)" }} />
        <Star style={{ top: "15%", left: "10%", animation: "sparkle 3s infinite" }} />
        <Star style={{ top: "20%", right: "15%", transform: "scale(0.7)", animation: "sparkle 2s infinite 1s" }} />
        <Star style={{ bottom: "25%", left: "20%", transform: "scale(0.5)", animation: "sparkle 4s infinite" }} />
        <Star style={{ bottom: "20%", right: "10%", animation: "sparkle 2.5s infinite 0.5s" }} />

        <p className="text-sky-400 text-sm font-medium tracking-widest uppercase mb-3 z-10">
          {current + 1} / {slides.length}
        </p>

        {/* Main card */}
        <div
          className="z-10 w-full max-w-md"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateX(0) scale(1)"
              : direction === "right"
              ? "translateX(40px) scale(0.97)"
              : "translateX(-40px) scale(0.97)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <div className="bg-white/75 backdrop-blur-sm rounded-3xl shadow-xl border border-sky-100 relative overflow-hidden p-6 sm:p-8">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300" />

            {(slide.title || slide.emoji) && (
              <>
                <div className="text-center mb-4">
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
                  <div className="flex-1 h-px bg-sky-100" />
                  <div className="w-2 h-2 rounded-full bg-sky-300" />
                  <div className="flex-1 h-px bg-sky-100" />
                </div>
              </>
            )}

            {/* PARAGRAF SELALU TAMPIL */}
            <p className="text-slate-600 leading-relaxed text-center text-base mb-4">
              {slide.body}
            </p>

            {/* RENDER FOTO/SLIDESHOW SESUAI TIPE */}
            {slide.type === "photo-single" && (
              <SinglePhoto src={slide.photo} caption={slide.photoCaption} />
            )}

            {slide.type === "slideshow" && (
              <PhotoSlideshow photos={slide.photos} />
            )}

            {/* TAMBAHAN SPESIAL UNTUK SLIDE 5 (BIRTHDAY) */}
            {slide.type === "birthday" && (
              <div className="mt-6 flex flex-col items-center">
                {slide.photoDimas && (
                  <img 
                    src={slide.photoDimas} 
                    alt="Dimas" 
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md object-cover mb-2"
                  />
                )}
                {slide.fromText && (
                  <p className="text-slate-400 font-serif italic text-xs sm:text-sm mb-5">
                    {slide.fromText}
                  </p>
                )}
                <div className="flex justify-center gap-2 text-2xl select-none">
                  {"🎈🎉🎁🎊🎈".split("").map((c, i) => (
                    <span key={i} style={{ animation: `bounceUp 1s infinite ${i * 0.15}s`, display: "inline-block" }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <ProgressDots total={slides.length} current={current} />
        </div>

        {/* Tombol navigasi */}
        <div className="flex gap-4 mt-6 z-10">
          <button
            onClick={prev}
            disabled={current === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm border transition-all duration-200
              ${current === 0
                ? "border-sky-100 text-sky-200 cursor-not-allowed bg-white/40"
                : "border-sky-300 text-sky-600 bg-white/70 hover:bg-sky-50 active:scale-95 shadow-sm"
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
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm bg-sky-500 hover:bg-sky-600 active:scale-95 text-white shadow-md transition-all duration-200"
            >
              Lanjut
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => goTo(0, "left")}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm bg-blue-500 hover:bg-blue-600 active:scale-95 text-white shadow-md transition-all duration-200"
            >
              Ulangi 💙
            </button>
          )}
        </div>

        <p className="text-sky-300 text-xs mt-3 z-10">
          {current === 0 ? "Tekan Lanjut untuk memulai ✨" : ""}
        </p>

        <style>{`
          @keyframes bounceUp {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.2); }
          }
        `}</style>
      </div>
    </>
  );
}