import React from "react";
import CardHeadliner from "../ui/components-global/card-headliner";
import TrendingList from "../ui/components-global/trending-list";
import { featuredArticles, trendingNews } from "../assets/data/dummy";

import ArtikelTerbaruList from "../ui/components-news/list-artikel-terbaru";
import type { ArtikelTerbaru } from "../ui/components-news/card-artikel-terbaru";
import SidebarSection from "../ui/components-news/sidebar-section";

const artikelTerbaru: ArtikelTerbaru[] = [
  {
    id: 1,
    title:
      "Mengenal Pendiri Sekolah Islam Khusus Perempuan Pertama di Indonesia",
    author: "ISNA [ED]",
    date: "SEPTEMBER 9, 2025",
    comments: 0,
    excerpt:
      "almuhtada.org - Ibu adalah madrasah pertama bagi anaknya, hal tersebut merupakan bukti bahwa pendidikan sangatlah penting bagi para perempuan, supaya...",
    image:
      "https://awsimages.detik.net.id/community/media/visual/2023/08/14/momen-kim-jong-un-kunjungi-wilayah-terdampak-topan-khanun_169.jpeg?w=600&q=90",
    number: "04",
  },
  {
    id: 2,
    title:
      "Fenomena Blood Moon 7 September 2025: Saat Bulan Purnama Berubah Merah",
    author: "ISNA [ED]",
    date: "SEPTEMBER 9, 2025",
    comments: 0,
    excerpt:
      "almuhtada.org - Tahukah kalian, hari Minggu tanggal 7 September 2025 kemarin jadi istimewa karena terjadi fenomena langka, yaitu gerhana bulan...",
    image:
      "https://awsimages.detik.net.id/community/media/visual/2023/08/14/momen-kim-jong-un-kunjungi-wilayah-terdampak-topan-khanun_169.jpeg?w=600&q=90",
    number: "05",
  },
];

const SejarahPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Konten utama */}
          <div className="lg:col-span-3 space-y-10">
            <CardHeadliner slides={featuredArticles} />

            <ArtikelTerbaruList items={artikelTerbaru} />
          </div>

          {/* Sidebar kanan */}
          <aside className="lg:col-span-1 space-y-8">
            <TrendingList items={trendingNews} />

            <SidebarSection
              title="Topik Hangat"
              items={[
                "Pendidikan Islam",
                "Teknologi AI",
                "Budaya & Sosial",
                "Sains & Alam",
              ]}
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SejarahPage;
