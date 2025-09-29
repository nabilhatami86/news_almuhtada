import { Link } from "react-router-dom";
import Logo from "../../assets/image/logo.png"; // ganti sesuai path logo

const Footer = () => {
  // mapping route untuk kategori
  const kategoriRoutes: Record<string, string> = {
    "Doa Harian": "/kategori/doa-harian",
    "Dunia Islam": "/kategori/dunia-islam",
    Fiqih: "/kategori/fiqih",
    Hadits: "/kategori/hadits",
    Khutbah: "/kategori/khutbah",
    Kolom: "/kategori/kolom",
    Lifestyle: "/kategori/lifestyle",
    News: "/kategori/news",
    Pendidikan: "/kategori/pendidikan",
    Pengumuman: "/kategori/pengumuman",
    Sejarah: "/kategori/sejarah",
    Tafsir: "/kategori/tafsir",
    Tokoh: "/kategori/tokoh",
    "Wisata Religi": "/kategori/wisata-religi",
  };

  // mapping route untuk profil
  const profilRoutes: Record<string, string> = {
    "Tentang Pesantren": "/tentang-pesantren",
    "Program & Pengajar": "/program-pengajar",
    "Pendaftaran Mahasantri Baru 2025": "/pendaftaran",
    "Prestasi Mahasantri": "/prestasi-mahasantri",
    "Publikasi Mahasantri": "/publikasi-mahasantri",
    "Griya Qur’an": "/griya-quran",
  };

  return (
    <footer className="bg-gray-100 text-gray-800 mt-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-6 py-12">
        {/* Logo + Alamat & Kontak */}
        <div>
          <img src={Logo} alt="Al-Muhtada" className="w-40 mb-4" />
          <p className="text-sm leading-relaxed">
            Gang Kenanga No. 1 Sekaran <br />
            Gunungpati Kota Semarang 50229
          </p>
          <p className="text-sm mt-3">
            <span className="font-medium">Telp:</span> 087814501978
          </p>
          <p className="text-sm">
            <span className="font-medium">Email:</span>{" "}
            pesantren.almuhtada@gmail.com
          </p>
        </div>

        {/* Kategori */}
        <div>
          <h4 className="font-bold text-lg mb-3 text-red-600">Kategori</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(kategoriRoutes).map(([label, path]) => (
              <li key={label}>
                <Link
                  to={path}
                  className="hover:text-emerald-600 font-medium transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Profil */}
        <div>
          <h4 className="font-bold text-lg mb-3 text-red-600">Profil</h4>
          <ul className="space-y-2 text-sm">
            {Object.entries(profilRoutes).map(([label, path]) => (
              <li key={label}>
                <Link
                  to={path}
                  className="hover:text-emerald-600 font-medium transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h4 className="font-bold text-lg mb-3 text-red-600">
            Connect With US
          </h4>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Dapatkan update berita dan tulisan pilihan dengan cara bergabung di
            Grup Telegram{" "}
            <span className="font-semibold">“Almuhtada Online”</span>.
          </p>
          <a
            href="https://t.me/almuhtadaonline"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-sky-400 text-sky-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-sky-50 transition"
          >
            <span className="text-lg">📨</span> Gabung Sekarang
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Almuhtada.org — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
