import ImageUploader from '@/components/ImageUploader';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">ClearBack MVP</h1>
        <p className="text-gray-500 text-lg">让设计小白一秒变专业的极简抠图神器</p>
      </div>
      
      <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-2xl border border-gray-100/50 backdrop-blur-sm">
        <ImageUploader />
      </div>
      
      <footer className="mt-16 text-center text-sm text-gray-400">
        <p>Built with ❤️ by 阿淞 & 晓晓</p>
      </footer>
    </main>
  );
}
