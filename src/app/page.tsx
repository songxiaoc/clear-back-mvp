import AuthButton from "@/components/AuthButton";
import ImageUploader from "@/components/ImageUploader";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg"></div>
          <h1 className="text-xl font-bold tracking-tight">FocusCut Pro</h1>
        </div>
        <AuthButton />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-900">
            一键全自动抠图神器
          </h2>
          <p className="text-lg text-gray-500">
            上传图片，AI 瞬间帮你分离前景与背景，效率提升百倍。
          </p>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <ImageUploader />
          </div>
        </div>
      </div>
      
      {/* Pricing Section */}
      <PricingSection />
    </main>
  );
}
