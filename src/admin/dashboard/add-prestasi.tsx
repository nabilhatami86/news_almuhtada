import React, { useState, useRef, useEffect } from "react";
import {
  Trash2,
  Plus,
  Award,
  NotebookPen,
  Pencil,
  Search,
  Calendar,
  Trophy,
  Star,
  CheckCircle,
  Users,
  Download,
  MoreHorizontal,
  Medal,
  Crown,
  Target,
  BookOpen,
  Sparkles,
} from "lucide-react";
import Sidebar from "../../ui/components-admin/sidebar";
import AchievementModal from "../../ui/components-admin/modal-add-prestasi";
import { achievements as dummyAchievements } from "../../assets/data/dummy";

type Achievement = {
  id: number;
  title: string;
  name: string;
  years: number;
};

type ValidationError = {
  year?: string;
  text?: string;
};

const AdminAchievements: React.FC = () => {
  const [achievements, setAchievements] =
    useState<Achievement[]>(dummyAchievements);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [errors, setErrors] = useState<ValidationError>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto focus textarea saat modal terbuka
  useEffect(() => {
    if (isModalOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isModalOpen]);

  // Success toast
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  // Validasi form
  const validateForm = (): boolean => {
    const newErrors: ValidationError = {};

    if (year < 1900 || year > new Date().getFullYear() + 10) {
      newErrors.year =
        "Tahun harus antara 1900 dan " + (new Date().getFullYear() + 10);
    }

    if (!text.trim()) {
      newErrors.text = "Judul prestasi tidak boleh kosong";
    } else if (text.trim().length < 5) {
      newErrors.text = "Judul minimal 5 karakter";
    }

    if (!editMode) {
      const existingAchievement = achievements.find(
        (a) =>
          a.years === year &&
          a.title.toLowerCase().trim() === text.toLowerCase().trim()
      );
      if (existingAchievement) {
        newErrors.text = "Prestasi ini sudah ada pada tahun yang sama";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setText("");
      setName("");
      setEditMode(false);
      setEditId(null);
      setYear(new Date().getFullYear());
      setErrors({});
      setShowPreview(false);
    }, 200);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (editMode && editId !== null) {
      setAchievements((prev) =>
        prev.map((a) =>
          a.id === editId ? { ...a, title: text.trim(), name, years: year } : a
        )
      );
    } else {
      const newAchievement: Achievement = {
        id: Date.now(),
        title: text.trim(),
        name,
        years: year,
      };
      setAchievements((prev) => [newAchievement, ...prev]);
    }

    setIsLoading(false);
    setShowSuccess(true);
    setTimeout(() => {
      closeModal();
    }, 1200);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Yakin ingin menghapus prestasi ini?")) {
      setAchievements((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setEditMode(true);
    setEditId(achievement.id);
    setText(achievement.title);
    setName(achievement.name);
    setYear(achievement.years);
    setIsModalOpen(true);
  };

  // Filter dan statistik
  const filteredAchievements = achievements
    .filter((a) => (selectedYear ? a.years === selectedYear : true))
    .filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.years - a.years);

  const availableYears = [...new Set(achievements.map((a) => a.years))].sort(
    (a, b) => b - a
  );

  // Statistics
  const stats = {
    total: achievements.length,
    thisYear: achievements.filter((a) => a.years === new Date().getFullYear())
      .length,
    students: new Set(achievements.map((a) => a.name)).size,
    topYear: availableYears[0] || new Date().getFullYear(),
  };

  // Get achievement icon based on title
  const getAchievementIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("juara 1") || lowerTitle.includes("emas"))
      return Crown;
    if (lowerTitle.includes("juara") || lowerTitle.includes("medali"))
      return Medal;
    if (lowerTitle.includes("terbaik") || lowerTitle.includes("best"))
      return Star;
    if (lowerTitle.includes("lomba") || lowerTitle.includes("kompetisi"))
      return Trophy;
    if (lowerTitle.includes("penelitian") || lowerTitle.includes("paper"))
      return BookOpen;
    return Target;
  };

  // Get achievement color based on title
  const getAchievementColor = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("juara 1") || lowerTitle.includes("emas"))
      return "from-yellow-400 to-orange-500";
    if (lowerTitle.includes("juara 2") || lowerTitle.includes("silver"))
      return "from-gray-400 to-gray-600";
    if (lowerTitle.includes("juara 3") || lowerTitle.includes("bronze"))
      return "from-orange-400 to-orange-600";
    if (lowerTitle.includes("nasional")) return "from-red-400 to-pink-600";
    if (lowerTitle.includes("internasional"))
      return "from-purple-400 to-indigo-600";
    return "from-emerald-400 to-teal-600";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in-right">
          <CheckCircle className="w-6 h-6" />
          <div>
            <p className="font-semibold">Berhasil!</p>
            <p className="text-sm opacity-90">
              Prestasi {editMode ? "diperbarui" : "ditambahkan"}
            </p>
          </div>
        </div>
      )}

      <main className="flex-1 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Prestasi Mahasantri
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Kelola dan pantau pencapaian mahasiswa terbaik
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditMode(false);
                setText("");
                setName("");
                setYear(new Date().getFullYear());
                setErrors({});
                setIsModalOpen(true);
              }}
              className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Tambah Prestasi
            </button>
          </div>

          {/* Stats Cards */}
        </div>

        {/* Filters & Controls */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari prestasi atau nama mahasiswa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Year Filter */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  aria-label="Filter berdasarkan tahun"
                  value={selectedYear || ""}
                  onChange={(e) =>
                    setSelectedYear(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  className="pl-12 pr-10 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none bg-white min-w-[150px]"
                >
                  <option value="">Semua Tahun</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    viewMode === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  List
                </button>
              </div>

              <button
                type="button"
                title="Unduh data prestasi"
                className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">Unduh data prestasi</span>
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedYear) && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600">Filter aktif:</span>
              {searchQuery && (
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                  Pencarian: "{searchQuery}"
                </span>
              )}
              {selectedYear && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  Tahun: {selectedYear}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedYear(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-xs ml-2"
              >
                Reset semua
              </button>
            </div>
          )}
        </div>

        {/* Achievements List/Grid */}
        {filteredAchievements.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <NotebookPen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {achievements.length === 0
                ? "Belum Ada Prestasi"
                : "Tidak Ada Hasil"}
            </h3>
            <p className="text-gray-600 mb-6">
              {achievements.length === 0
                ? "Mulai tambahkan prestasi mahasiswa untuk melacak pencapaian mereka"
                : "Coba ubah filter atau kata kunci pencarian"}
            </p>
            {achievements.length === 0 && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg transition-all"
              >
                Tambah Prestasi Pertama
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => {
              const IconComponent = getAchievementIcon(achievement.title);
              const gradientColor = getAchievementColor(achievement.title);

              return (
                <div
                  key={achievement.id}
                  className="group bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${gradientColor} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        aria-label="Edit Prestasi"
                        onClick={() => handleEdit(achievement)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Hapus Prestasi"
                        onClick={() => handleDelete(achievement.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 text-lg mb-2 leading-tight">
                      {achievement.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{achievement.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-gray-700">
                          {achievement.years}
                        </span>
                      </div>
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                    </div>
                    <button
                      type="button"
                      aria-label="Lihat detail prestasi"
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="col-span-6">Prestasi</div>
                <div className="col-span-3">Mahasiswa</div>
                <div className="col-span-2">Tahun</div>
                <div className="col-span-1">Aksi</div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {filteredAchievements.map((achievement) => {
                const IconComponent = getAchievementIcon(achievement.title);
                const gradientColor = getAchievementColor(achievement.title);

                return (
                  <div
                    key={achievement.id}
                    className="group px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6 flex items-center gap-4">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${gradientColor} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                            {achievement.title}
                          </h3>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {achievement.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {achievement.name}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                          {achievement.years}
                        </span>
                      </div>

                      <div className="col-span-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          aria-label="Edit Prestasi"
                          type="button"
                          onClick={() => handleEdit(achievement)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          aria-label="Hapus Prestasi"
                          type="button"
                          onClick={() => handleDelete(achievement.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      <AchievementModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        isLoading={isLoading}
        editMode={editMode}
        year={year}
        setYear={setYear}
        text={text}
        setText={setText}
        name={name}
        setName={setName}
        errors={errors}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
      />

      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminAchievements;
