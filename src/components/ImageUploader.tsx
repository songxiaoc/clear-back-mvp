'use client';
import { useState } from 'react';

export default function ImageUploader() {
  const [loading, setLoading] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
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
      <label htmlFor="upload" className="bg-blue-600 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-blue-700 transition font-medium shadow-md">
        {loading ? '✨ 晓晓正在施展魔法中...' : '📸 选择一张美照上传'}
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
