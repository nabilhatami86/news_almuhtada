import { populer, publications } from "../../assets/data/dummy";
import ArtikelPopuler from "../../ui/components-global/artikel-populer";

const PublikasiMahasantri = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Konten utama */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Publikasi Mahasantri
          </h1>
          {publications.map((pub, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {pub.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">{pub.authors}</p>
              <p className="text-sm text-gray-500 mb-2 italic">
                {pub.journal}, {pub.year}
              </p>
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                🔗 Baca selengkapnya
              </a>
            </div>
          ))}
        </div>

        {/* Sidebar artikel populer */}
        <div>
          <ArtikelPopuler items={populer} />
        </div>
      </div>
    </div>
  );
};

export default PublikasiMahasantri;
