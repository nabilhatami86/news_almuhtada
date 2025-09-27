import { useState, useEffect } from "react";

const DetailNews = () => {
  const [showAuthors, setShowAuthors] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Konten artikel dibagi per halaman (maksimal 300 kata per halaman)
  const articlePages = [
    {
      page: 1,
      content: [
        "Jakarta - Rider Tech3 GasGas Factory Racing, Augusto Fernandez, resmi memperpanjang kontraknya dengan Yamaha hingga musim MotoGP 2026. Keputusan ini mengakhiri spekulasi kepindahan rider asal Spanyol tersebut ke tim lain.",
        "Perpanjangan kontrak Fernandez diumumkan langsung oleh pihak Yamaha Motor Racing pada konferensi pers yang digelar di sirkuit Misano, Italia. Rider berusia 26 tahun ini akan tetap membela warna Tech3 Yamaha untuk dua musim ke depan.",
        "Saya sangat senang bisa melanjutkan perjalanan saya bersama Yamaha. Tim ini sudah seperti keluarga bagi saya, dan saya yakin kami bisa meraih hasil yang lebih baik di musim-musim mendatang, ujar Fernandez dalam keterangan resminya.",
        "Keputusan Yamaha mempertahankan Fernandez dinilai strategis mengingat rider ini telah menunjukkan konsistensi performa yang baik sepanjang musim 2025. Meskipun belum meraih podium, Fernandez berhasil mengumpulkan poin secara konsisten.",
      ],
    },
    {
      page: 2,
      content: [
        "Managing Director Yamaha Motor Racing, Lin Jarvis, menyatakan kepercayaannya terhadap kemampuan Fernandez. Augusto telah menunjukkan dedikasi dan kemampuan yang luar biasa. Kami percaya dia adalah bagian penting dari masa depan Yamaha di MotoGP, ungkap Jarvis.",
        "Fernandez sendiri mengaku sudah merasa nyaman dengan motor Yamaha YZR-M1. Adaptasi yang baik membuatnya mampu memberikan feedback yang konstruktif untuk pengembangan motor ke depannya.",
        "Sepanjang musim 2025, Fernandez telah mengumpulkan 89 poin dan berada di posisi ke-12 klasemen rider. Meski angka ini belum maksimal, progress yang ditunjukkan cukup menjanjikan untuk musim depan.",
        "Tim Tech3 Yamaha juga mengapresiasi komitmen Fernandez. Bos tim, Herve Poncharal, menilai rider Spanyol ini memiliki etos kerja yang tinggi dan selalu memberikan yang terbaik untuk tim.",
      ],
    },
    {
      page: 3,
      content: [
        "Dengan perpanjangan kontrak ini, Yamaha kini telah mengamankan lineup rider untuk musim 2025-2026. Fernandez akan bermitra dengan Fabio Quartararo di tim pabrikan dan rider muda berbakat lainnya di satelit team Tech3.",
        "Yamaha juga berkomitmen untuk terus mengembangkan motor YZR-M1 agar bisa bersaing dengan Ducati dan Honda. Investasi besar-besaran dilakukan untuk riset dan pengembangan teknologi baru.",
        "Para penggemar MotoGP menyambut positif keputusan ini. Di media sosial, banyak yang mengapresiasi loyalitas Fernandez terhadap Yamaha meski belum meraih hasil maksimal.",
        "Musim MotoGP 2025 masih menyisakan beberapa seri lagi. Fernandez berharap bisa mengakhiri musim dengan catatan yang lebih baik dan mempersiapkan diri untuk tantangan musim 2026.",
      ],
    },
  ];

  const totalPages = articlePages.length;

  // Disable text selection and copy protection
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleSelectStart = (e: Event) => (e as Event).preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        (e.key === "a" ||
          e.key === "c" ||
          e.key === "v" ||
          e.key === "x" ||
          e.key === "s")
      ) {
        e.preventDefault();
      }
      if (e.key === "F12") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const relatedPosts = [
    {
      id: 1,
      title: "Wahai Perempuan Shalihah Renungkan Ini Sebagai Nasihat Bagimu",
      category: "Islami",
      time: "2 jam lalu",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "5 Amalan Sederhana yang Berpahala Besar di Bulan Ramadan",
      category: "Ibadah",
      time: "4 jam lalu",
      image:
        "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Keutamaan Membaca Al-Quran di Pagi dan Petang Hari",
      category: "Al-Quran",
      time: "6 jam lalu",
      image:
        "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      title: "Doa-Doa Mustajab yang Dianjurkan Rasulullah SAW",
      category: "Doa",
      time: "8 jam lalu",
      image:
        "https://images.unsplash.com/photo-1584964748914-8b73b596b1b2?w=300&h=200&fit=crop",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-6 bg-white">
        {/* Breadcrumb */}
        <div>
          <h6 className="text-xs text-gray-500">
            Home {">"} Olahraga {">"} MotoGP
          </h6>
        </div>

        {/* Judul Berita */}
        <div className="mt-4">
          <h1 className="font-bold text-3xl leading-tight text-gray-900">
            Augusto Fernandez Perpanjang Kontrak Yamaha, Hentikan Isu Hengkang
          </h1>
        </div>

        {/* Info media + tanggal */}
        <div className="mt-4 text-sm text-gray-500">
          <span className="font-semibold text-blue-600">almuhtada.org</span> -
          12/09/2025, 12:42 WIB
        </div>

        {/* Penulis */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white text-sm font-bold border-2 border-white shadow-md">
              GS
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-teal-500 text-white text-sm font-bold border-2 border-white shadow-md">
              AK
            </div>
          </div>

          <div className="text-sm">
            <span className="font-semibold text-gray-700">
              Gilang Satria, Agung Kurniawan
            </span>
            <div
              className="text-blue-600 text-xs cursor-pointer hover:underline"
              onClick={() => setShowAuthors(!showAuthors)}
            >
              Tim Redaksi ▼
            </div>
          </div>
        </div>

        {/* Dropdown penulis/editor */}
        {showAuthors && (
          <div className="mt-3 w-72 rounded-lg border shadow-xl p-4 bg-white z-10 relative">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-gray-800">
                Penulis & Editor
              </h4>
              <button
                onClick={() => setShowAuthors(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white text-sm font-bold">
                  GS
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800">
                    Gilang Satria
                  </div>
                  <div className="text-xs text-gray-500">Penulis</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-teal-500 text-white text-sm font-bold">
                  AK
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800">
                    Agung Kurniawan
                  </div>
                  <div className="text-xs text-gray-500">Editor</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Image */}
        <div className="mt-6">
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2023/08/14/momen-kim-jong-un-kunjungi-wilayah-terdampak-topan-khanun_169.jpeg?w=600&q=90"
            alt="Augusto Fernandez Yamaha MotoGP"
            className="w-full h-80 object-cover rounded-lg shadow-lg"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
          />
          <p className="text-xs text-gray-500 mt-2 italic">
            Augusto Fernandez resmi perpanjang kontrak dengan tim Yamaha untuk
            musim MotoGP 2025-2026
          </p>
        </div>

        {/* Social Share Buttons */}
        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm text-gray-600">Bagikan:</span>
          <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition-colors">
            Facebook
          </button>
          <button className="px-3 py-1 bg-sky-500 text-white text-xs rounded-full hover:bg-sky-600 transition-colors">
            Twitter
          </button>
          <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-green-700 transition-colors">
            WhatsApp
          </button>
        </div>

        {/* Page Indicator */}
        <div className="mt-8 flex items-center justify-between bg-blue-50 p-3 rounded-lg">
          <span className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </span>
          <div className="text-sm text-gray-500">
            Estimasi waktu baca: {Math.ceil(totalPages * 2)} menit
          </div>
        </div>

        {/* Konten berita berdasarkan halaman */}
        <div className="mt-6 text-justify leading-relaxed text-gray-800 space-y-4 min-h-96">
          {articlePages[currentPage - 1]?.content.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "text-lg font-medium text-gray-900 border-l-4 border-blue-500 pl-4 bg-blue-50 py-3 rounded-r"
                  : ""
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-8 flex justify-between items-center py-4 border-t border-gray-200">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-700 text-white hover:bg-gray-800"
            }`}
          >
            ← Halaman Sebelumnya
          </button>

          {/* Page Numbers */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full transition-colors ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Halaman Selanjutnya →
          </button>
        </div>

        {/* Baca Juga Section - Seperti di gambar */}
        <div className="mt-12 bg-white border rounded-lg p-1">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg">
            <h3 className="font-bold text-lg">Baca Juga:</h3>
          </div>

          <div className="p-4 space-y-4">
            {relatedPosts.map((post) => (
              <div
                key={post.id}
                className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-24 h-18 object-cover rounded flex-shrink-0"
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.time}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 hover:text-blue-600 line-clamp-2 leading-tight">
                    {post.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Tags:</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            #MotoGP
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            #Yamaha
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            #AugustoFernandez
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            #Tech3
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailNews;
