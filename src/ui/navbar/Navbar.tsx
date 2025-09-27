import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/logo.png";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import NavLink from "./Navlink";
import DropdownItem from "./DropdownItem";
import { Menu, X } from "lucide-react"; // ikon hamburger & close

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Beranda");
  const [isOpen, setIsOpen] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      setShowNavbar(window.scrollY <= lastScrollY || window.scrollY === 0);
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={Logo} alt="Logo Al-Muhtada" className="w-[150px]" />
            <span className="text-sm text-gray-500 hidden md:block">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            {/* Hamburger Menu */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className={`bg-white border-b sticky top-0 z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 py-4">
            <NavLink
              to="/"
              className={`whitespace-nowrap pb-2 border-b-2 text-sm font-medium transition-colors ${
                activeCategory === "Beranda"
                  ? "border-[#00531b] text-[#00531b]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveCategory("Beranda")}
            >
              Beranda
            </NavLink>

            <NavLink
              to="/pendidikan"
              className={`whitespace-nowrap pb-2 border-b-2 text-sm font-medium transition-colors ${
                activeCategory === "Pendidikan"
                  ? "border-[#00531b] text-[#00531b]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveCategory("Pendidikan")}
            >
              Pendidikan
            </NavLink>

            <NavLink
              to="/sejarah"
              className={`whitespace-nowrap pb-2 border-b-2 text-sm font-medium transition-colors ${
                activeCategory === "sejarah"
                  ? "border-[#00531b] text-[#00531b]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveCategory("sejarah")}
            >
              Sejarah
            </NavLink>

            <Dropdown
              label="Keislaman"
              className={`whitespace-nowrap pb-2 border-b-2 text-sm font-medium transition-colors ${
                activeCategory === "Keislaman"
                  ? "border-[#00531b] text-[#00531b]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveCategory("Keislaman")}
            >
              <DropdownItem to="/doa">Doa Harian</DropdownItem>
              <DropdownItem to="/Fiqih">Fiqih</DropdownItem>
              <DropdownItem to="/hadist">Hadist</DropdownItem>
              <DropdownItem to="/tafsir">Tafsir</DropdownItem>
            </Dropdown>

            <Dropdown
              label="Profil"
              className={`whitespace-nowrap pb-2 border-b-2 text-sm font-medium transition-colors ${
                activeCategory === "Profil"
                  ? "border-[#00531b] text-[#00531b]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveCategory("Profil")}
            >
              <DropdownItem to="/tentang-pesantren">
                Tentang Pesantren
              </DropdownItem>
              <DropdownItem to="/program-pengajar">
                Program & Pengajar
              </DropdownItem>
              <DropdownItem to="/pendaftaran">
                Pendaftaran Mahasantri Baru
              </DropdownItem>
              <DropdownItem to="/prestasi-mahasantri">
                Prestasi Mahasantri
              </DropdownItem>
              <DropdownItem to="/publikasi-mahasantri">
                Publikasi Mahasantri
              </DropdownItem>
              <DropdownItem to="/griya-quran">Griya Qur'an</DropdownItem>
            </Dropdown>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden flex flex-col space-y-4 py-4 border-t">
              <SearchBar />
              <Link
                to="/"
                className="text-gray-700 hover:text-[#00531b]"
                onClick={() => {
                  setActiveCategory("Beranda");
                  setIsOpen(false);
                }}
              >
                Beranda
              </Link>
              <Link
                to="/pendidikan"
                className="text-gray-700 hover:text-[#00531b]"
                onClick={() => {
                  setActiveCategory("Pendidikan");
                  setIsOpen(false);
                }}
              >
                Pendidikan
              </Link>
              <Link
                to="/sejarah"
                className="text-gray-700 hover:text-[#00531b]"
                onClick={() => {
                  setActiveCategory("sejarah");
                  setIsOpen(false);
                }}
              >
                Sejarah
              </Link>
              <div>
                <p className="font-medium text-gray-600">Keislaman</p>
                <div className="pl-4 flex flex-col space-y-2">
                  <Link to="/doa">Doa Harian</Link>
                  <Link to="/Fiqih">Fiqih</Link>
                  <Link to="/hadist">Hadist</Link>
                  <Link to="/tafsir">Tafsir</Link>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-600">Profil</p>
                <div className="pl-4 flex flex-col space-y-2">
                  <Link to="/tentang-pesantren">Tentang Pesantren</Link>
                  <Link to="/program-pengajar">Program & Pengajar</Link>
                  <Link to="/pendaftaran">Pendaftaran Mahasantri Baru</Link>
                  <Link to="/prestasi-mahasantri">Prestasi Mahasantri</Link>
                  <Link to="/publikasi-mahasantri">Publikasi Mahasantri</Link>
                  <Link to="/griya-quran">Griya Qur'an</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
