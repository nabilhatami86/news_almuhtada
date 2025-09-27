import React from "react";
import {
  X,
  Upload,
  Image,
  FileText,
  Tag,
  User,
  Eye,
  Save,
  AlertCircle,
} from "lucide-react";

interface FormData {
  title: string;
  category: string;
  content: string;
}

interface Props {
  isOpen: boolean;
  isEditing: boolean;
  form: FormData;
  previewUrl: string;
  onClose: () => void;
  onChange: (form: FormData) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const NewsModal: React.FC<Props> = ({
  isOpen,
  isEditing,
  form,
  previewUrl,
  onClose,
  onChange,
  onFileChange,
  onSave,
}) => {
  if (!isOpen) return null;

  const categories = [
    { value: "Politik", color: "bg-blue-100 text-blue-800", icon: "🏛️" },
    { value: "Ekonomi", color: "bg-green-100 text-green-800", icon: "💰" },
    { value: "Olahraga", color: "bg-orange-100 text-orange-800", icon: "⚽" },
    { value: "Teknologi", color: "bg-purple-100 text-purple-800", icon: "💻" },
    { value: "Kesehatan", color: "bg-red-100 text-red-800", icon: "🏥" },
    { value: "Pendidikan", color: "bg-yellow-100 text-yellow-800", icon: "🎓" },
  ];

  const isFormValid =
    form.title.trim() && form.category.trim() && form.content.trim();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4 py-4">
      <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 relative flex-shrink-0">
          <button
            type="button"
            title="Tutup modal"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            {isEditing ? (
              <>
                <FileText className="w-5 h-5" />
                Edit Berita
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Tambah Berita Baru
              </>
            )}
          </h2>
          <p className="text-white/90 text-xs mt-0.5">
            {isEditing
              ? "Perbarui informasi berita"
              : "Buat artikel berita yang menarik"}
          </p>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          <div className="space-y-4">
            {/* Judul */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-emerald-600" />
                Judul Berita *
              </label>
              <input
                type="text"
                placeholder="Masukkan judul berita yang menarik..."
                value={form.title}
                onChange={(e) => onChange({ ...form, title: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
              {form.title && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Eye className="w-3 h-3" />
                  <span>{form.title.length} karakter</span>
                </div>
              )}
            </div>

            {/* Kategori */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Tag className="w-4 h-4 text-emerald-600" />
                Kategori *
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => onChange({ ...form, category: cat.value })}
                    className={`p-2 rounded-lg border-2 transition-all duration-200 flex items-center gap-1 text-xs font-medium ${
                      form.category === cat.value
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm scale-105"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <span className="text-sm">{cat.icon}</span>
                    <span>{cat.value}</span>
                  </button>
                ))}
              </div>
              {form.category && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Dipilih:</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${
                      categories.find((c) => c.value === form.category)?.color
                    }`}
                  >
                    <span>
                      {categories.find((c) => c.value === form.category)?.icon}
                    </span>
                    {form.category}
                  </span>
                </div>
              )}
            </div>

            {/* Isi Berita */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-emerald-600" />
                Isi Berita *
              </label>
              <textarea
                placeholder="Tulis isi berita dengan detail dan menarik..."
                value={form.content}
                onChange={(e) => onChange({ ...form, content: e.target.value })}
                rows={4}
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none"
              />
              {form.content && (
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Eye className="w-3 h-3" />
                    <span>{form.content.length} karakter</span>
                  </div>
                  <span>{Math.ceil(form.content.length / 100)} menit baca</span>
                </div>
              )}
            </div>

            {/* Upload Gambar */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Image className="w-4 h-4 text-emerald-600" />
                Gambar Berita
              </label>

              {!previewUrl ? (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    title="Unggah gambar berita"
                    placeholder="Pilih gambar berita"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-200 group cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 group-hover:text-emerald-500 transition-colors duration-200 mb-2" />
                    <p className="text-gray-600 font-medium text-sm mb-1">
                      Klik untuk upload gambar
                    </p>
                    <p className="text-gray-400 text-xs">
                      PNG, JPG, GIF hingga 10MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      title="Ganti gambar berita"
                    />
                    <div className="text-white text-center">
                      <Upload className="w-6 h-6 mx-auto mb-1" />
                      <p className="text-xs font-medium">Ganti Gambar</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Validation Alert */}
            {!isFormValid && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <p className="text-xs text-amber-700">
                  <span className="font-medium">Lengkapi form:</span> Judul,
                  kategori, dan isi berita wajib diisi
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <User className="w-3 h-3" />
              <span>Draft disimpan otomatis</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 flex items-center gap-1.5"
              >
                <X className="w-3 h-3" />
                Batal
              </button>
              <button
                onClick={onSave}
                disabled={!isFormValid}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isFormValid
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Save className="w-3 h-3" />
                {isEditing ? "Perbarui" : "Publikasikan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
