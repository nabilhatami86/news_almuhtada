import React from "react";

const News = () => {
  const topStories = [
    {
      id: 1,
      title: "Menghidupkan Sunnah Nabi di Kehidupan Sehari-hari",
      excerpt:
        "Praktik kecil sunnah dapat membawa keberkahan dan ketenangan dalam hidup sehari-hari.",
      img: "https://awsimages.detik.net.id/community/media/visual/2023/08/14/momen-kim-jong-un-kunjungi-wilayah-terdampak-topan-khanun_169.jpeg?w=600&q=90",
      author: "Ust. Ahmad",
      timeAgo: "3 hours ago",
    },
    {
      id: 2,
      title: "Keutamaan Sedekah di Bulan Ramadhan",
      excerpt:
        "Sedekah tidak hanya membersihkan harta, tapi juga mendekatkan diri kepada Allah SWT.",
      img: "https://awsimages.detik.net.id/community/media/visual/2023/08/14/momen-kim-jong-un-kunjungi-wilayah-terdampak-topan-khanun_169.jpeg?w=600&q=90",
      author: "Ust. Fatimah",
      timeAgo: "5 hours ago",
    },
  ];

  const features = [
    {
      id: 1,
      title: "Belajar Tajwid dengan Mudah dan Menyenangkan",
      tag: "FEATURE",
      excerpt:
        "Panduan praktis belajar tajwid agar membaca Al-Qur'an lebih fasih dan benar.",
    },
    {
      id: 2,
      title: "Tips Menjaga Shalat Tepat Waktu",
      tag: "FEATURE",
      excerpt:
        "Langkah-langkah sederhana agar shalat tetap konsisten di tengah kesibukan.",
    },
    {
      id: 3,
      title: "Memahami Doa-doa Harian Nabi Muhammad",
      tag: "FEATURE",
      excerpt:
        "Doa-doa singkat tapi penuh makna yang bisa diamalkan setiap hari.",
    },
  ];

  const articles = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: `Inspirasi Islami ${i + 1}`,
    excerpt:
      "Kisah dan pelajaran Islami yang menginspirasi kehidupan sehari-hari.",
    img: "https://awsimages.detik.net.id/community/media/visual/2023/08/14/momen-kim-jong-un-kunjungi-wilayah-terdampak-topan-khanun_169.jpeg?w=600&q=90",
  }));

  const editorsPicks = [
    "Kisah Nabi Yusuf AS dan Kesabaran",
    "Keutamaan Tilawah Al-Qur'an",
    "Amalan Sunnah Pagi dan Petang",
  ];

  const mostRead = [
    "Cara Menghafal Surat Pendek Al-Qur'an",
    "Manfaat Shalat Dhuha bagi Kesehatan",
    "Etika dan Adab Islami dalam Kehidupan",
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main column */}
        <section className="lg:col-span-3 space-y-6">
          {/* HERO */}
          {topStories[0] && (
            <article className="bg-white rounded shadow overflow-hidden md:flex">
              <img
                src={topStories[0].img}
                alt={topStories[0].title}
                className="w-full md:w-1/2 object-cover h-64 md:h-auto"
              />
              <div className="p-6 flex-1">
                <div className="text-sm text-yellow-600 font-semibold">
                  TOP STORIES
                </div>
                <h1 className="mt-2 text-2xl md:text-3xl font-bold">
                  {topStories[0].title}
                </h1>
                <p className="mt-3 text-gray-600">{topStories[0].excerpt}</p>
                <div className="mt-4 text-sm text-gray-500">
                  By {topStories[0].author} • {topStories[0].timeAgo}
                </div>
              </div>
            </article>
          )}

          {/* Grid of smaller top stories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topStories.slice(1).map((s) => (
              <div key={s.id} className="bg-white rounded shadow p-4">
                <div className="text-xs text-gray-500">QUICK BITE</div>
                <h3 className="font-semibold mt-2">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{s.excerpt}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded shadow p-4 flex flex-col"
              >
                <div className="text-xs text-indigo-600 font-semibold">
                  {f.tag}
                </div>
                <h4 className="mt-2 font-bold">{f.title}</h4>
                <div className="mt-2 text-sm text-gray-600 flex-1">
                  {f.excerpt}
                </div>
                <div className="mt-3 text-sm text-gray-500">Read more →</div>
              </div>
            ))}
          </div>

          {/* Articles list */}
          <div className="bg-white rounded shadow p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((a) => (
                <article key={a.id} className="flex gap-3">
                  <img
                    src={a.img}
                    alt={a.title}
                    className="w-full md:w-1/2 object-cover h-64 md:h-auto"
                  />
                  <div>
                    <h5 className="font-semibold">{a.title}</h5>
                    <p className="text-sm text-gray-600">{a.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="bg-white rounded shadow p-4">
            <h4 className="font-bold">Editor's picks</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              {editorsPicks.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h4 className="font-bold">Most Read</h4>
            <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal pl-5">
              {mostRead.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default News;
