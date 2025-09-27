import React from "react";
import { populer, achievements } from "../../assets/data/dummy";
import ArtikelPopuler from "../../ui/components-global/artikel-populer";

const PrestasiMahasantri = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Layout utama: Header, Prestasi, Artikel Populer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 justify-center items-center">
          {/* Header */}
          <h1 className="text-4xl text-center font-bold text-gray-900 mb-3">
            Prestasi Mahasantri
          </h1>
          <p className="text-gray-600 max-w-2xl mb-8 text-center">
            Daftar prestasi yang diraih oleh para mahasantri dalam berbagai
            kompetisi, akademik, penelitian, hingga karya publikasi.
          </p>

          {/* Konten Prestasi */}
          <div className="space-y-10">
            {achievements.map((group) => (
              <div key={group.year}>
                <div className="border-b">
                  <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
                    Tahun {group.year}
                  </h2>
                </div>
                <div className="bg-white rounded-2xl p-6">
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {group.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kanan: Artikel Populer */}
        <ArtikelPopuler items={populer} />
      </div>
    </div>
  );
};

export default PrestasiMahasantri;
