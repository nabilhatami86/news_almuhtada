import {
  Users,
  BookOpen,
  Award,
  UserCheck,
  Settings,
  Heart,
} from "lucide-react";

import SectionCard from "../../ui/components-news/card-section-program-pengajar";

const ProgramPengajar = () => {
  const programs = [
    "Kajian Agama: Tauhid, Tafsir, Hadits, Fiqh, dan Akhlaq",
    "Kajian Sosial dan Analisis Kritis Masalah Aktual",
    "Pelatihan Riset dan Menulis Karya Ilmiah",
    "Pelatihan Bahasa Inggris dan Bahasa Arab",
    "Pelatihan Presentasi dan Public Speaking",
    "Program Penelitian dan Pengabdian Masyarakat secara Berkala",
    "Bimbingan Beasiswa S2/S3 Dalam & Luar Negeri",
  ];

  const masyayikh = [
    "Dr. H. Dani Muhtada, M.Ag., M.A., M.P.A.",
    "Dr. H. A. Hasan Asy'ari Ulama'i, M.Ag.",
    "Prof. Dr. Ahwan Fanani, M.Ag., M.S.",
    "Dr. H. M. Hakim Junaidi, M.Ag.",
    "Dr. H. Mohammad Nasih, M.Si.",
    "Dr. H. Sukendar, M.Ag., M.A.",
    "Dr. H. Aji Sofanudin, M.Si.",
  ];

  const asatidz = [
    "Dr. Imam Baehaqie, M.Hum.",
    "Hikmiyatin Jalilah, S.Ag., M.Ag.",
    "Asma Luthfi, S.Th.I., M.Hum.",
    "Ayon Diniyanto, S.H., M.H.",
    "Dwi Wisnu Kurniawan, S.H.",
    "Rikha Zulia, S.Pd.",
    "Wihda Ikvina Anfaul Umat, S.Pd.",
    "In'am Zaidi, S.H., M.H.",
  ];

  const pengurus = [
    { role: "Sekretaris Pesantren", name: "Dwi Wisnu Kurniawan, S.H., M.H." },
    { role: "Divisi IT dan Humas", name: "M. Akiyasul Azkiya, S.Kom." },
    { role: "Divisi Program", name: "Eka Diyanti" },
  ];

  const mentors = [
    "Mohammad Rizal Ardiansyah, S.Si.",
    "Gema Aditya Mahendra, S.T.",
    "Mohammad Fattahul Alim, S.E.",
    "Mohammad Khollaqul Alim, S.E.",
    "Zahrotuz Zakiyah, S.Pd.",
    "Tia Rosalita, S.Pd.",
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-5 blur-3xl"></div>
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold">
              Program & Pengajar
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Informasi mengenai program pesantren, dewan masyayikh, asatidz,
              hingga tim mentor yang berpengalaman dan berkualitas.
            </p>
            {/* Decorative elements */}
            <div className="flex justify-center mt-8">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* PROGRAM PESANTREN - Takes full width on large screens */}
          <div className="lg:col-span-2 xl:col-span-3">
            <SectionCard
              title="Program Pesantren"
              icon={BookOpen}
              gradient="bg-gradient-to-r from-emerald-500 to-teal-500"
            >
              <div className="grid md:grid-cols-2 gap-4">
                {programs.map((program, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors group"
                  >
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                    <span className="text-gray-700 leading-relaxed">
                      {program}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* DEWAN MASYAYIKH */}
          <SectionCard
            title="Dewan Masyayikh"
            icon={Award}
            gradient="bg-gradient-to-r from-amber-500 to-orange-500"
          >
            <div className="space-y-3">
              {masyayikh.map((person, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                    {person}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* DEWAN GURU */}
          <SectionCard
            title="Dewan Guru / Asatidz"
            icon={Users}
            gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            <div className="space-y-3">
              {asatidz.map((person, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                    {person}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* BADAN PENGURUS */}
          <SectionCard
            title="Badan Pengurus Harian"
            icon={Settings}
            gradient="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <div className="space-y-4">
              {pengurus.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group"
                >
                  <div className="font-semibold text-purple-700 mb-2 group-hover:text-purple-800 transition-colors">
                    {item.role}
                  </div>
                  <div className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* TIM MENTOR */}
          <SectionCard
            title="Tim Mentor"
            icon={Heart}
            gradient="bg-gradient-to-r from-rose-500 to-red-500"
          >
            <div className="space-y-3">
              {mentors.map((person, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                    {person}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ADDITIONAL MENTOR */}
          <div className="lg:col-span-2 xl:col-span-1">
            <SectionCard
              title="Bergabung dengan Kami"
              icon={UserCheck}
              gradient="bg-gradient-to-r from-indigo-500 to-blue-600"
            >
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  Tertarik Bergabung?
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Jadilah bagian dari komunitas pesantren yang berkembang dan
                  belajar dari para pengajar terbaik.
                </p>
                <button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold">
                  Hubungi Kami
                </button>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Bottom decorative section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 text-sm font-medium">
              Program Aktif & Terpercaya
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramPengajar;
