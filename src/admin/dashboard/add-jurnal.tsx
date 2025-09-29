import React, { useState, useEffect } from "react";
import {
  Plus,
  BookOpen,
  Trash2,
  Pencil,
  Search,
  LayoutGrid,
  List,
  Calendar,
  Users,
  ExternalLink,
  Download,
  Library,
  CheckCircle,
} from "lucide-react";
import Sidebar from "../../ui/components-admin/sidebar";
import { publications as dummyPublications } from "../../assets/data/dummy";
import PublicationModal from "../../ui/components-admin/modal-add-jurnal";

type Publication = {
  id: number;
  title: string;
  authors: string;
  year: number;
  journal: string;
  link: string;
};

const AdminPublications: React.FC = () => {
  const [publications, setPublications] =
    useState<Publication[]>(dummyPublications);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<Omit<Publication, "id">>({
    title: "",
    authors: "",
    year: new Date().getFullYear(),
    journal: "",
    link: "",
  });

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Success toast effect
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const openAddModal = () => {
    setEditMode(false);
    setForm({
      title: "",
      authors: "",
      year: new Date().getFullYear(),
      journal: "",
      link: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (index: number) => {
    setEditMode(true);
    setCurrentIndex(index);
    const pub = publications[index];
    setForm({
      title: pub.title,
      authors: pub.authors,
      year: pub.year,
      journal: pub.journal,
      link: pub.link,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.authors.trim()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (editMode && currentIndex !== null) {
      setPublications((prev) =>
        prev.map((p, i) =>
          i === currentIndex
            ? {
                ...form,
                id: p.id,
              }
            : p
        )
      );
    } else {
      setPublications((prev) => [
        {
          ...form,
          id: prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        },
        ...prev,
      ]);
    }

    setIsLoading(false);
    setIsModalOpen(false);
    setEditMode(false);
    setCurrentIndex(null);
    setShowSuccess(true);
  };

  const handleDelete = (index: number) => {
    if (window.confirm("Yakin ingin menghapus publikasi ini?")) {
      setPublications((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const filteredPublications = publications
    .filter((pub) => (selectedYear ? pub.year === selectedYear : true))
    .filter(
      (pub) =>
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.year - a.year);

  const availableYears = Array.from(
    new Set(publications.map((pub) => pub.year))
  ).sort((a, b) => b - a);

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
              Publikasi {editMode ? "diperbarui" : "ditambahkan"}
            </p>
          </div>
        </div>
      )}

      <main className="flex-1 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Publikasi Jurnal
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Kelola dan pantau publikasi ilmiah terkini
                </p>
              </div>
            </div>
            <button
              aria-label="Tambah publikasi baru"
              onClick={openAddModal}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Tambah Publikasi
            </button>
          </div>
        </div>
        {/* Filters & Controls */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari publikasi, penulis, atau jurnal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Year Filter */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  aria-label="Filter berdasarkan tahun"
                  value={selectedYear ?? ""}
                  onChange={(e) =>
                    setSelectedYear(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  className="pl-12 pr-10 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none bg-white min-w-[150px]"
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
                  aria-label="Tampilan grid"
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  aria-label="Tampilan list"
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "list"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <button
                aria-label="Download data publikasi"
                className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedYear) && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600">Filter aktif:</span>
              {searchQuery && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  Pencarian: "{searchQuery}"
                </span>
              )}
              {selectedYear && (
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                  Tahun: {selectedYear}
                </span>
              )}
              <button
                aria-label="Reset semua filter"
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

        {/* Publications Display */}
        {filteredPublications.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {publications.length === 0
                ? "Belum Ada Publikasi"
                : "Tidak Ada Hasil"}
            </h3>
            <p className="text-gray-600 mb-6">
              {publications.length === 0
                ? "Mulai tambahkan publikasi jurnal untuk melacak karya ilmiah"
                : "Coba ubah filter atau kata kunci pencarian"}
            </p>
            {publications.length === 0 && (
              <button
                aria-label="Tambah publikasi pertama"
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg transition-all"
              >
                Tambah Publikasi Pertama
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPublications.map((publication, index) => (
              <div
                key={publication.id}
                className="group bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      aria-label="Edit publikasi"
                      onClick={() => openEditModal(index)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                      title="Edit publikasi"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      aria-label="Hapus publikasi"
                      onClick={() => handleDelete(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Hapus publikasi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="font-bold text-gray-800 text-lg mb-3 leading-tight line-clamp-2">
                    {publication.title}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{publication.authors}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Library className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{publication.journal}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="bg-gray-100 px-3 py-1 rounded-full">
                    <span className="font-medium text-gray-700">
                      {publication.year}
                    </span>
                  </div>
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Lihat
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="col-span-4">Publikasi</div>
                <div className="col-span-3">Penulis</div>
                <div className="col-span-3">Jurnal</div>
                <div className="col-span-1">Tahun</div>
                <div className="col-span-1">Aksi</div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {filteredPublications.map((publication, index) => (
                <div
                  key={publication.id}
                  className="group px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm leading-tight truncate">
                          {publication.title}
                        </h3>
                      </div>
                    </div>

                    <div className="col-span-3 text-sm text-gray-600 truncate">
                      {publication.authors}
                    </div>

                    <div className="col-span-3 text-sm text-gray-600 truncate">
                      {publication.journal}
                    </div>

                    <div className="col-span-1">
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                        {publication.year}
                      </span>
                    </div>

                    <div className="col-span-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        aria-label="Edit publikasi"
                        onClick={() => openEditModal(index)}
                        className="p-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit publikasi"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        aria-label="Hapus publikasi"
                        onClick={() => handleDelete(index)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Hapus publikasi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <a
                        href={publication.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-gray-500 hover:bg-gray-50 rounded-lg transition-all"
                        title="Lihat publikasi"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      <PublicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editMode={editMode}
        form={form}
        setForm={setForm}
        isLoading={isLoading}
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AdminPublications;
