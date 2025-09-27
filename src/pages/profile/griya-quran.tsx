import React from "react";

const GriyaQuran = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Griya Qur’an Hidayatul Muhtadin
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Lembaga pembelajaran Al-Qur’an di bawah Yayasan Kanzul Al-Muhtad,
          berpusat di Semarang, dengan tujuan mencetak generasi Muslim penghafal
          Al-Qur’an yang berakhlakul karimah.
        </p>
        <p className="text-gray-500 mt-3">
          📍 Jl. Kutai No.8 Taman Baru Banyuwangi, Jawa Timur | ☎️
          0819-9772-0092
        </p>
      </div>

      {/* Visi & Misi */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Visi & Misi
        </h2>
        <div className="bg-green-50 p-6 rounded-2xl shadow-sm">
          <p className="text-green-700 font-medium italic mb-4">
            “Menjadi tempat pencetak Generasi Qurani yang gemar mengaji dan
            mengkaji Al-Quran serta berprestasi”.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Mencetak generasi pecinta dan penghafal Al-Quran</li>
            <li>Menjadikan generasi Qurani berakhlaqul karimah</li>
            <li>Memberikan manfaat melalui kajian Islami untuk masyarakat</li>
            <li>Menanamkan nilai-nilai Islami dalam kehidupan</li>
          </ul>
        </div>
      </section>

      {/* Program */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Program</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Tahsin & Tartil */}
          <div className="p-6 border border-gray-400 rounded-xl shadow-sm hover:shadow-md transition bg-white">
            <h3 className="font-bold text-green-700 mb-2">Tahsin & Tartil</h3>
            <p className="text-sm text-gray-600 mb-3">
              Fokus pada tajwid, makharijul huruf, dan hukum bacaan.
            </p>
            <p className="text-xs text-gray-500">
              🗓️ Rabu & Kamis (15.00 - 17.30)
            </p>
          </div>

          {/* Tahfidz */}
          <div className="p-6 border border-gray-400 rounded-xl shadow-sm hover:shadow-md transition bg-white">
            <h3 className="font-bold text-green-700 mb-2">Tahfidz 30 Juz</h3>
            <p className="text-sm text-gray-600 mb-3">
              Program menghafal Al-Qur’an dengan metode At-Taisir.
            </p>
            <p className="text-xs text-gray-500">
              🗓️ Senin, Selasa & Jum’at (15.00 - 17.30)
            </p>
          </div>

          {/* Ibadah & Karakter */}
          <div className="p-6 border border-gray-400 rounded-xl shadow-sm hover:shadow-md transition bg-white">
            <h3 className="font-bold text-green-700 mb-2">Ibadah & Karakter</h3>
            <p className="text-sm text-gray-600 mb-3">
              Pembelajaran dasar ibadah, akhlak, dan pembentukan karakter.
            </p>
            <p className="text-xs text-gray-500">🗓️ Selasa (17.30 - 19.30)</p>
          </div>
        </div>
      </section>

      {/* Halaqah */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Halaqah</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-6 rounded-2xl shadow-sm text-center">
            <h4 className="font-bold text-green-700 mb-2">Shufla</h4>
            <p className="text-sm text-gray-600">Untuk usia TK</p>
          </div>
          <div className="bg-green-50 p-6 rounded-2xl shadow-sm text-center">
            <h4 className="font-bold text-green-700 mb-2">Wustho</h4>
            <p className="text-sm text-gray-600">Untuk usia SD</p>
          </div>
          <div className="bg-green-50 p-6 rounded-2xl shadow-sm text-center">
            <h4 className="font-bold text-green-700 mb-2">‘Ulya</h4>
            <p className="text-sm text-gray-600">
              Untuk santri yang sudah lancar membaca
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GriyaQuran;
