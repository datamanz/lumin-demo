import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 border-b">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/lumflights-logo.svg" // Logo oluşturulacak
              alt="LumFlights Logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-xl font-bold">LumFlights</span>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Giriş Yap
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Uçuş Yönetiminde Yeni Nesil Çözüm
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Rezervasyon yönetimini kolaylaştırın, yapay zeka destekli önerilerle verimliliğinizi artırın.
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg"
            >
              Hemen Başlayın
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Akıllı Rezervasyon Yönetimi</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yapay zeka destekli öneriler ve otomatik raporlama sistemi
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Gerçek Zamanlı İzleme</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Rezervasyonları anlık takip edin ve hızlı aksiyonlar alın
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Rol Bazlı Erişim</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Güvenli ve yetkilendirilmiş kullanıcı erişimi
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © 2024 LumFlights. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
