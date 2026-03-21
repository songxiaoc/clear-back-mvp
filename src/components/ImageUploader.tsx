'use client';
import { useState, useEffect } from 'react';

export default function ImageUploader() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [resultImg, setResultImg] = useState<string | null>(null);

  // 动态更新 loading 文案
  useEffect(() => {
    if (!loading) return;
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
    }, 4000); // 每4秒换一次文案
    return () => clearInterval(timer);
  }, [loading]);

  // 前端图片压缩函数
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
        
        // 如果图片实在太大，等比例缩小尺寸
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
        
        // 降低质量进行压缩
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
        }, file.type, 0.7); // 70% 的质量
      };
      img.src = objectUrl;
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    setLoading(true);
    setResultImg(null); // 清除上次的结果
    
    try {
      // 1. 压缩图片
      const file = await compressImage(rawFile, 0.8); // 目标压缩到 0.8MB 以下
      console.log(`压缩前: ${(rawFile.size/1024/1024).toFixed(2)}MB, 压缩后: ${(file.size/1024/1024).toFixed(2)}MB`);

      // 2. 发起请求
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
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-10 space-y-6">
      <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="upload" />
      <label htmlFor="upload" className={`px-6 py-3 rounded-full cursor-pointer transition font-medium shadow-md ${loading ? 'bg-blue-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {loadingText}
          </span>
        ) : '📸 选择一张美照上传'}
      </label>

      {resultImg && (
        <div className="mt-8 flex flex-col items-center animate-in fade-in duration-500">
          <p className="text-gray-500 mb-4 text-sm">✨ 处理完成啦！请直接下载：</p>
          <div className="bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] rounded-xl shadow-xl overflow-hidden border border-gray-100 p-2">
             <img src={resultImg} className="max-w-md w-full object-contain rounded-lg" alt="Result" />
          </div>
          <a
            href={resultImg}
            download="clear-back-result.png"
            className="mt-6 bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-900 transition font-medium shadow-md flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            下载透明背景图
          </a>
        </div>
      )}
    </div>
  );
}

