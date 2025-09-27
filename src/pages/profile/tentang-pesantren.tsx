import React from "react";
import { populer } from "../../assets/data/dummy";
import ArtikelPopuler from "../../ui/components-global/artikel-populer";

const TentangPesantren = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Kolom Kiri */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
            Tentang Pesantren
          </h1>

          <p className="text-gray-700 leading-relaxed mb-6 text-justify">
            <span className="font-semibold">Pesantren Riset Al-Muhtada</span>{" "}
            adalah pesantren mahasiswa di Semarang yang bertujuan untuk mencetak
            Muslim intelektual yang berakhlak mulia, berprestasi, dan memiliki
            keterampilan riset unggul. Dengan lingkungan kondusif, asrama putera
            dan puteri terpisah, serta bebas biaya asrama, santri dibimbing oleh
            pengasuh dan guru lulusan S2/S3 dari dalam maupun luar negeri.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6 text-justify">
            Pesantren ini didirikan oleh{" "}
            <strong>
              Ustadz Dr. H. Dani Muhtada, M.Ag., M.A., M.P.A dan Ustadzah
              Hikmiyatin Jalilah, S.Ag., M.Ag.
            </strong>{" "}
            pada 12 Agustus 2018, di bawah Yayasan Kanzul Amal Al-Muhtad.
            Berdiri dengan Akta Notaris Teguh Pambudi, S.H., M.Kn. Nomor 26 (21
            Oktober 2020) dan disahkan Kementerian Hukum & HAM melalui Keputusan
            Nomor AHU-0001360.AH.01.05 Tahun 2021.
          </p>

          {/* Visi */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Visi</h2>
            <blockquote className="italic text-gray-600 border-l-4 border-green-600 pl-4 bg-green-50 py-2 rounded-md">
              “Menjadi pesantren unggulan yang mencetak mahasiswa muslim
              intelektual yang beriman, berbudi, dan berprestasi”
            </blockquote>
          </section>

          {/* Misi */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Misi</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Mencetak insan akademis melalui kegiatan pengajaran, diskusi,
                dan pelatihan.
              </li>
              <li>
                Mengembangkan nalar kritis-analitis melalui riset wajib tahunan.
              </li>
              <li>
                Menanamkan jiwa pengabdian melalui kegiatan sosial
                kemasyarakatan.
              </li>
              <li>
                Menanamkan nilai keislaman, keummatan, dan kebangsaan dalam
                kehidupan.
              </li>
            </ul>
          </section>

          {/* Profil Pengasuh */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Profil Pengasuh
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Ustadz */}
              <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Ustadz Dr. H. Dani Muhtada"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-bold text-center text-gray-800">
                  Ustadz Dr. H. Dani Muhtada, M.Ag., M.A., M.P.A.
                </h3>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed text-justify">
                  Beliau adalah dosen Fakultas Hukum Universitas Negeri Semarang
                  (UNNES). Pendidikan dasar dan menengah beliau tempuh di
                  Banyuwangi dan Jember. Gelar S1 dan S2 diperoleh dari Fakultas
                  Syariah IAIN Walisongo Semarang. Beliau juga menyelesaikan MA
                  di UIN Sunan Kalijaga Yogyakarta bekerjasama dengan McGill
                  University Canada. Gelar MPA didapat dari Flinders University,
                  Australia, dan gelar doktor diperoleh dari Northern Illinois
                  University, Amerika Serikat, dengan disertasi tentang Politik
                  Hukum Islam di Indonesia.
                </p>
              </div>

              {/* Ustadzah */}
              <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_09qNRbJIKFoOmmN9L_ZCNDZH-43L2upO6A&s"
                  alt="Ustadzah Hikmiyatin Jalilah"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-bold text-center text-gray-800">
                  Ustadzah Hikmiyatin Jalilah, S.Ag., M.Ag.
                </h3>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed text-justify">
                  Beliau menempuh pendidikan dasar dan menengah di Gresik dan
                  Malang, Jawa Timur. Gelar S1 beliau peroleh dari Fakultas
                  Tarbiyah IAIN Walisongo Semarang dalam bidang Pendidikan
                  Bahasa Arab. Di kampus yang sama, beliau menyelesaikan S2
                  dalam bidang Pendidikan Islam dengan tesis “Kesetaraan Jender:
                  Studi Komparatif atas Pengaruh Pendidikan Pesantren terhadap
                  Persepsi Santriwati Pesantren Al-Muayyad dan Pesantren
                  Assalam”, di bawah bimbingan Prof. Dr. H. Abdurrahman Mas’ud,
                  M.A.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Kolom Kanan */}
        <aside>
          <ArtikelPopuler items={populer} />
        </aside>
      </div>
    </div>
  );
};

export default TentangPesantren;
