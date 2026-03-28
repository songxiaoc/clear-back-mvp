'use client';
import { useState, useEffect, useRef } from 'react';

const LOADING_TEXTS = [
  '🚀 Uploading your photo...',
  '🧠 AI is tracing every edge...',
  '✨ Almost there...',
  '⌛ Hang tight, nearly done...',
];

export default function ImageUploader() {
  const [mounted, setMounted]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [originalImg, setOriginalImg] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [loadingText, setLoadingText] = useState(LOADING_TEXTS[0]);
  const [dragging, setDragging]   = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  /* ─── Client-side compression ─── */
  const compressImage = (file: File, maxSizeMB = 1): Promise<File> =>
    new Promise((resolve) => {
      if (file.size <= maxSizeMB * 1024 * 1024) { resolve(file); return; }
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        const max = 1920;
        if (w > max || h > max) {
          if (w > h) { h = (h / w) * max; w = max; }
          else       { w = (w / h) * max; h = max; }
        }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(file); return; }
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          (blob) => resolve(blob ? new File([blob], file.name, { type: file.type }) : file),
          file.type, 0.8,
        );
      };
      img.src = url;
    });

  /* ─── Process file ─── */
  const processFile = async (rawFile: File) => {
    setLoading(true);
    setResultImg(null);
    setOriginalImg(URL.createObjectURL(rawFile));
    setSliderPos(50);

    let i = 0;
    setLoadingText(LOADING_TEXTS[0]);
    const timer = setInterval(() => {
      i++;
      if (i < LOADING_TEXTS.length) setLoadingText(LOADING_TEXTS[i]);
    }, 3500);

    try {
      const file = await compressImage(rawFile, 0.8);
      const form  = new FormData();
      form.append('image', file);
      const res = await fetch('/api/remove', { method: 'POST', body: form });
      if (!res.ok) throw new Error((await res.text()) || 'Processing failed');
      setResultImg(URL.createObjectURL(await res.blob()));
    } catch (err: any) {
      alert(err.message || 'Something went wrong!');
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith('image/')) processFile(f);
  };

  if (!mounted) return null;

  /* ─── Upload zone ─── */
  if (!resultImg) {
    return (
      <div className="flex flex-col items-center gap-5">
        {/* Drop zone */}
        <div
          onClick={() => !loading && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); if (!loading) setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            width: '100%',
            minHeight: 180,
            border: `2px dashed ${dragging ? '#3b82f6' : 'rgba(147,197,253,0.7)'}`,
            borderRadius: 16,
            background: dragging
              ? 'rgba(219,234,254,0.45)'
              : 'rgba(239,246,255,0.35)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 12,
            cursor: loading ? 'default' : 'pointer',
            transition: 'all 0.2s ease',
            transform: dragging ? 'scale(1.01)' : 'scale(1)',
          }}
        >
          {loading ? (
            /* Loading state */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'var(--accent-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <div className="spinner" />
              </div>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent)', textAlign: 'center' }}>
                {loadingText}
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Please wait a moment
              </p>
            </div>
          ) : (
            /* Idle state */
            <>
              <div
                style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: 'linear-gradient(135deg, var(--accent-light) 0%, #bfdbfe 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform 0.2s',
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginBottom: 4 }}>
                  {dragging ? 'Drop it here!' : 'Click or drag & drop'}
                </p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  JPEG, PNG, WebP · up to 10 MB
                </p>
              </div>
              <button
                type="button"
                style={{
                  padding: '9px 24px', borderRadius: 100,
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  color: 'white', border: 'none',
                  fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(59,130,246,0.35)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(59,130,246,0.45)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(59,130,246,0.35)';
                }}
              >
                Choose a photo
              </button>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={loading}
        />
      </div>
    );
  }

  /* ─── Result view ─── */
  return (
    <div className="anim-scale-in flex flex-col items-center gap-5 w-full">
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
        ✨ Slide to compare before &amp; after
      </p>

      {/* Before / After slider */}
      <div
        className="relative w-full rounded-2xl overflow-hidden select-none"
        style={{
          border: '1px solid rgba(147,197,253,0.4)',
          boxShadow: '0 8px 32px rgba(59,130,246,0.10)',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect width='8' height='8' fill='%23e5e7eb'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23e5e7eb'/%3E%3Crect x='8' y='0' width='8' height='8' fill='%23f3f4f6'/%3E%3Crect x='0' y='8' width='8' height='8' fill='%23f3f4f6'/%3E%3C/svg%3E") repeat`,
        }}
      >
        {/* Result (transparent bg) */}
        <img
          src={resultImg}
          alt="Background removed"
          className="block w-full h-auto object-contain pointer-events-none"
        />

        {/* Original (clipped) */}
        <img
          src={originalImg!}
          alt="Original"
          className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
          style={{
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            background: 'white',
          }}
        />

        {/* Invisible range input */}
        <input
          type="range" min={0} max={100} value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0"
        />

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{
            left: `${sliderPos}%`, transform: 'translateX(-50%)',
            width: 2,
            background: 'white',
            boxShadow: '0 0 12px rgba(0,0,0,0.2)',
          }}
        >
          {/* Handle circle */}
          <div
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)',
              boxShadow: '0 2px 12px rgba(59,130,246,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 1,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 8L2 5M5 8L2 11M5 8H1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 8L14 5M11 8L14 11M11 8H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Labels */}
          <span
            style={{
              position: 'absolute', top: 10, right: 10,
              fontSize: 10, fontWeight: 700,
              color: 'white', letterSpacing: '0.06em',
              background: 'rgba(30,58,107,0.65)', borderRadius: 4,
              padding: '2px 6px', backdropFilter: 'blur(4px)',
              pointerEvents: 'none',
            }}
          >
            BEFORE
          </span>
          <span
            style={{
              position: 'absolute', top: 10, left: 10,
              fontSize: 10, fontWeight: 700,
              color: 'white', letterSpacing: '0.06em',
              background: 'rgba(37,99,235,0.65)', borderRadius: 4,
              padding: '2px 6px', backdropFilter: 'blur(4px)',
              pointerEvents: 'none',
            }}
          >
            AFTER
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <a
          href={resultImg}
          download="focuscut-result.png"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 28px', borderRadius: 100,
            background: 'linear-gradient(135deg, #1a3a6b 0%, #2563eb 100%)',
            color: 'white', textDecoration: 'none',
            fontSize: 14, fontWeight: 600,
            boxShadow: '0 4px 18px rgba(59,130,246,0.35)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(59,130,246,0.45)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 18px rgba(59,130,246,0.35)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download PNG
        </a>

        <button
          onClick={() => {
            setResultImg(null);
            setOriginalImg(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
          }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 24px', borderRadius: 100,
            background: 'white',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            fontSize: 14, fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'var(--accent-subtle)';
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)';
            (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'white';
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 .49-4.68"/>
          </svg>
          Try another
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file" accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
