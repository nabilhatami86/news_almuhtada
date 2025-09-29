import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Eye,
  MessageSquare,
  FileText,
  User,
  Calendar,
  TrendingUp,
} from "lucide-react";
import Sidebar from "../../ui/components-admin/sidebar";

// Mock data untuk views harian
const viewsData = [
  { date: "2024-09-09", views: 1200 },
  { date: "2024-09-10", views: 1580 },
  { date: "2024-09-11", views: 1890 },
  { date: "2024-09-12", views: 1420 },
  { date: "2024-09-13", views: 1670 },
  { date: "2024-09-14", views: 2100 },
  { date: "2024-09-15", views: 1850 },
];

// Mock data untuk top artikel
const topArticles = [
  {
    id: 1,
    title: "Breaking: Teknologi AI Terbaru Mengubah Dunia Industri",
    views: 12500,
    date: "2024-09-14",
  },
  {
    id: 2,
    title: "Update Ekonomi: Inflasi Indonesia Turun ke Level Terendah",
    views: 9800,
    date: "2024-09-13",
  },
  {
    id: 3,
    title: "Olahraga: Timnas Indonesia Raih Kemenangan Gemilang",
    views: 8750,
    date: "2024-09-15",
  },
  {
    id: 4,
    title: "Kesehatan: Tips Hidup Sehat di Era Digital",
    views: 7200,
    date: "2024-09-12",
  },
  {
    id: 5,
    title: "Politik: Kebijakan Baru Pemerintah untuk UMKM",
    views: 6900,
    date: "2024-09-11",
  },
];

// Mock data untuk komentar terakhir
const lastComments = [
  {
    id: 1,
    author: "Ahmad Rizky",
    comment:
      "Artikel yang sangat informatif! Terima kasih sudah berbagi informasi ini.",
    article: "Breaking: Teknologi AI Terbaru Mengubah Dunia Industri",
    time: "2 menit yang lalu",
  },
  {
    id: 2,
    author: "Sari Dewi",
    comment:
      "Saya setuju dengan analisis ekonomi yang disajikan. Data-datanya sangat akurat.",
    article: "Update Ekonomi: Inflasi Indonesia Turun ke Level Terendah",
    time: "15 menit yang lalu",
  },
  {
    id: 3,
    author: "Budi Santoso",
    comment: "Semoga timnas terus konsisten dengan performa seperti ini!",
    article: "Olahraga: Timnas Indonesia Raih Kemenangan Gemilang",
    time: "1 jam yang lalu",
  },
  {
    id: 4,
    author: "Maya Putri",
    comment: "Tips-tipsnya sangat bermanfaat untuk kehidupan sehari-hari.",
    article: "Kesehatan: Tips Hidup Sehat di Era Digital",
    time: "2 jam yang lalu",
  },
];

// Mock data untuk berita terakhir yang diupload
const lastNews = [
  {
    id: 1,
    title: "Inovasi Startup Indonesia Mencuri Perhatian Dunia",
    author: "Dr. Sarah Wijaya",
    editor: "Muhammad Farid",
    uploadTime: "30 menit yang lalu",
    status: "Published",
    category: "Teknologi",
  },
  {
    id: 2,
    title: "Festival Budaya Nusantara Digelar di Jakarta",
    author: "Indira Sari",
    editor: "Ahmad Rizki",
    uploadTime: "1 jam yang lalu",
    status: "Published",
    category: "Budaya",
  },
  {
    id: 3,
    title: "Penelitian Baru: Manfaat Tanaman Herbal Indonesia",
    author: "Prof. Bambang Sutrisno",
    editor: "Lisa Amelia",
    uploadTime: "2 jam yang lalu",
    status: "Draft",
    category: "Kesehatan",
  },
  {
    id: 4,
    title: "Pariwisata Indonesia Bangkit Pasca Pandemi",
    author: "Rina Melati",
    editor: "Doni Prasetyo",
    uploadTime: "3 jam yang lalu",
    status: "Published",
    category: "Travel",
  },
];

const Home: React.FC = () => {
  const totalViews = viewsData.reduce((sum, item) => sum + item.views, 0);
  const avgViews = Math.round(totalViews / viewsData.length);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Home
          </h1>
          <p className="text-gray-600">
            Selamat datang di panel admin. Berikut ringkasan aktivitas website
            Pesantren Almuhtada.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Views (7 hari)
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalViews.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">
              ↗ +12% dari minggu lalu
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Rata-rata Views
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {avgViews.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">Per hari</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Artikel
                </p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-2">+5 artikel baru</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Komentar
                </p>
                <p className="text-2xl font-bold text-gray-900">1,284</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">↗ +8% engagement</p>
          </div>
        </div>

        {/* Charts and Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Views Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Views Harian (7 Hari Terakhir)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                  }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()}`;
                  }}
                  formatter={(value) => [value.toLocaleString(), "Views"]}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: "#3B82F6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Articles */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-green-600" />
              Top 5 Artikel Terpopuler
            </h3>
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {article.title}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">
                        {article.views.toLocaleString()} views
                      </span>
                      <span className="text-sm text-gray-400">
                        {article.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Last Comments */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-orange-600" />
              Komentar Terbaru
            </h3>
            <div className="space-y-4">
              {lastComments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-l-4 border-orange-500 pl-4 py-2"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">
                      {comment.author}
                    </p>
                    <span className="text-xs text-gray-500">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {comment.comment}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Pada: {comment.article}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Last Uploaded News */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Berita Terbaru yang Diupload
            </h3>
            <div className="space-y-4">
              {lastNews.map((news) => (
                <div
                  key={news.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 flex-1">
                      {news.title}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ml-2 ${
                        news.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {news.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                    <span className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      Penulis: {news.author}
                    </span>
                    <span className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      Editor: {news.editor}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {news.uploadTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
