'use client';
import { useState, useEffect } from 'react';

export default function ImageUploader() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [originalImg, setOriginalImg] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [loadingText, setLoadingText] = useState('📸 选择一张美照上传');

  useEffect(() => {
    setMounted(true);
  }, []);

  // 纯前端图片压缩引擎
  const compressImage = (file: File, maxSizeMB: number = 1): Promise<File> => {
    return new Promise((resolve) => {
      if (file.size <= maxSizeMB * 1024 * 1024) {
        resolve(file);
        return;
      }
      
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        const maxDimension = 1920;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, file.type, 0.8);
      };
      img.src = objectUrl;
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    setLoading(true);
    setResultImg(null); 
    setOriginalImg(URL.createObjectURL(rawFile)); 
    setSliderPos(50); 
    
    // 动态进度文案
    const texts = [
      '🚀 图片飞奔上传中...',
      '🧠 AI 正在精心描绘边缘...',
      '✨ 魔法即将完成...',
      '⌛ 还在努力，请稍微再等一下下哦...'
    ];
    let i = 0;
    setLoadingText(texts[0]);
    const timer = setInterval(() => {
      i++;
      if (i < texts.length) {
        setLoadingText(texts[i]);
      }
    }, 4000);

    try {
      const file = await compressImage(rawFile, 0.8); 
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/remove', { method: 'POST', body: formData });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || '处理失败');
      }
      
      const blob = await res.blob();
      setResultImg(URL.createObjectURL(blob));
    } catch (err: any) {
      alert(err.message || '哎呀，出错了！');
    } finally {
      clearInterval(timer);
      setLoading(false);
      setLoadingText('📸 选择一张美照上传');
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center p-10 space-y-6">
      <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="upload" />
      <label 
        htmlFor="upload" 
        className={`px-6 py-3 rounded-full cursor-pointer transition font-medium shadow-md ${
          loading ? 'bg-blue-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {loadingText}
          </span>
        ) : '📸 选择一张美照上传'}
      </label>

      {resultImg && originalImg && (
        <div className="mt-8 flex flex-col items-center animate-in fade-in duration-500 w-full max-w-3xl">
          <p className="text-gray-500 mb-4 text-sm font-medium">✨ 见证奇迹的时刻！左右滑动查看对比：</p>

          {/* 🌟 核心：滑块对比区 */}
          <div className="relative w-full aspect-auto rounded-xl shadow-2xl overflow-hidden border border-gray-200 select-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            
            {/* 1. 底层：处理后的透明图片 */}
            <img src={resultImg} className="block w-full h-auto object-contain pointer-events-none" alt="Result" />

            {/* 2. 顶层：原图 (通过 clip-path 动态裁剪右侧) */}
            <img
              src={originalImg}
              className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none bg-white"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              alt="Original"
            />

            {/* 3. 控制层：隐形的滑动条 */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0"
            />

            {/* 4. 视觉层：中间的滑动指示线与按钮 */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none z-10 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>
          </div>

          <a
            href={resultImg}
            download="clear-back-result.png"
            className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-black transition font-medium shadow-md flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            下载透明背景图
          </a>
        </div>
      )}
    </div>
  );
}
