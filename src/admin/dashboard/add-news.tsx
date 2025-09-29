import React, { useState, useEffect } from "react";
import { Plus, Newspaper } from "lucide-react";
import Sidebar from "../../ui/components-admin/sidebar";
import NewsModal from "../../ui/components-admin/modal-add-news";
import NewsTable from "../../ui/components-admin/table-news";
import SuccessToast from "../../ui/components-admin/success-toast";
import NewsFilters from "../../ui/components-admin/filter-news";
import NewsGridCard from "../../ui/components-admin/grid-card";
import { articles as dummyArticles } from "../../assets/data/dummy";

type Article = {
  id: number;
  title: string;
  category: string;
  content: string;
  image: string;
  author: string;
  editor?: string;
  createdAt: Date;
  updatedAt?: Date;
  status?: "published" | "draft" | "archived";
  featured?: boolean;
};

const currentUser = { name: "Admin User" };

const InputAddNews = () => {
  const [articles, setArticles] = useState<Article[]>(
    dummyArticles.map((a) => ({
      id: a.id,
      title: a.title,
      category: a.category,
      content: a.content || "",
      image: a.img || "",
      author: a.author,
      createdAt: a.date ? new Date(a.date) : new Date(),
      status: "published" as const,
      views: Math.floor(Math.random() * 1000) + 100,
      featured: Math.random() > 0.7,
    }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAction, setLastAction] = useState<string>("");

  const [form, setForm] = useState({ title: "", category: "", content: "" });
  const [_imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Success toast effect
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const resetForm = () => {
    setForm({ title: "", category: "", content: "" });
    setImageFile(null);
    setPreviewUrl("");
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!form.title || !form.category) return;

    if (isEditing && editingId !== null) {
      setArticles((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? {
                ...a,
                title: form.title,
                category: form.category,
                content: form.content,
                image: previewUrl || a.image,
                editor: currentUser.name,
                updatedAt: new Date(),
              }
            : a
        )
      );
      setLastAction("diperbarui");
    } else {
      const newArticle: Article = {
        id: Date.now(),
        title: form.title,
        category: form.category,
        content: form.content,
        image: previewUrl,
        author: currentUser.name,
        createdAt: new Date(),
        status: "published",

        featured: false,
      };
      setArticles((prev) => [newArticle, ...prev]);
      setLastAction("ditambahkan");
    }

    resetForm();
    setIsModalOpen(false);
    setShowSuccess(true);
  };

  const handleEdit = (article: Article) => {
    setForm({
      title: article.title,
      category: article.category,
      content: article.content,
    });
    setPreviewUrl(article.image);
    setIsEditing(true);
    setEditingId(article.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Yakin ingin menghapus artikel ini?")) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
      setLastAction("dihapus");
      setShowSuccess(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Filter articles
  const filteredArticles = articles
    .filter((article) =>
      selectedCategory ? article.category === selectedCategory : true
    )
    .filter((article) =>
      selectedStatus ? article.status === selectedStatus : true
    )
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Get unique categories
  const availableCategories = [...new Set(articles.map((a) => a.category))];

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      Teknologi: "bg-blue-100 text-blue-700",
      Pendidikan: "bg-green-100 text-green-700",
      Penelitian: "bg-purple-100 text-purple-700",
      Pengumuman: "bg-orange-100 text-orange-700",
      Kegiatan: "bg-pink-100 text-pink-700",
      Prestasi: "bg-yellow-100 text-yellow-700",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar />

      {/* Success Toast */}
      {showSuccess && <SuccessToast message={`Artikel ${lastAction}`} />}

      <main className="flex-1 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Newspaper className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Manajemen Berita
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Kelola dan pantau semua artikel dan berita
                </p>
              </div>
            </div>
            <button
              aria-label="Tombol tambah artikel baru"
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Tambah Artikel
            </button>
          </div>
        </div>

        {/* Filters & Controls */}
        <NewsFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          availableCategories={availableCategories}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onReset={() => {
            setSearchQuery("");
            setSelectedCategory("");
            setSelectedStatus("");
          }}
        />

        {/* Articles Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArticles.map((a) => (
              <NewsGridCard
                key={a.id}
                article={a}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getCategoryColor={getCategoryColor}
                formatDate={formatDate}
                truncateText={truncateText}
              />
            ))}
          </div>
        ) : (
          <NewsTable
            articles={filteredArticles}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        {/* Modal Component */}
        <NewsModal
          isOpen={isModalOpen}
          isEditing={isEditing}
          form={form}
          previewUrl={previewUrl}
          onClose={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          onChange={setForm}
          onFileChange={handleFileChange}
          onSave={handleSave}
        />
      </main>

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

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default InputAddNews;
