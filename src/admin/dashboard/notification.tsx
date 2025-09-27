import React, { useState, useEffect } from "react";
import Sidebar from "../../ui/components-admin/sidebar";
import {
  Bell,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  FileText,
  Edit,
  Trash2,
  Plus,
  Eye,
  AlertTriangle,
  CheckCircle,
  Filter,
  Search,
  Calendar,
  Users,
  Activity,
  TrendingUp,
  Settings,
  RefreshCw,
  MoreHorizontal,
  Archive,
  Star,
  Zap,
} from "lucide-react";

type Notification = {
  id: number;
  user: string;
  action: "add" | "edit" | "delete";
  target: string;
  status: "pending" | "approved" | "rejected";
  timestamp: string;
  description?: string;
  priority: "low" | "medium" | "high";
  category: "publication" | "profile" | "system" | "achievement";
};

const AdminNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      user: "Rafa Andrian",
      action: "add",
      target: "Publikasi Jurnal",
      status: "pending",
      timestamp: "2 menit yang lalu",
      description: "Menambahkan publikasi 'Machine Learning in Healthcare'",
      priority: "high",
      category: "publication",
    },
    {
      id: 2,
      user: "Nabil Ahmad",
      action: "edit",
      target: "User Profile",
      status: "pending",
      timestamp: "15 menit yang lalu",
      description: "Memperbarui informasi profil pengguna",
      priority: "medium",
      category: "profile",
    },
    {
      id: 3,
      user: "Sarah Putri",
      action: "add",
      target: "Prestasi Mahasiswa",
      status: "approved",
      timestamp: "1 jam yang lalu",
      description: "Menambahkan prestasi Juara 1 Lomba Programming",
      priority: "high",
      category: "achievement",
    },
    {
      id: 4,
      user: "Ahmad Wijaya",
      action: "delete",
      target: "Publikasi Jurnal",
      status: "rejected",
      timestamp: "3 jam yang lalu",
      description: "Menghapus publikasi yang sudah tidak relevan",
      priority: "low",
      category: "publication",
    },
    {
      id: 5,
      user: "System",
      action: "edit",
      target: "Database Backup",
      status: "approved",
      timestamp: "6 jam yang lalu",
      description: "Backup otomatis database berhasil dilakukan",
      priority: "medium",
      category: "system",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAction, setLastAction] = useState<string>("");

  // Success toast effect
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleApprove = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "approved" } : n))
    );
    setLastAction("disetujui");
    setShowSuccess(true);
  };

  const handleReject = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "rejected" } : n))
    );
    setLastAction("ditolak");
    setShowSuccess(true);
  };

  const handleMarkAllRead = () => {
    // Implementasi mark all as read
    setLastAction("semua notifikasi ditandai sudah dibaca");
    setShowSuccess(true);
  };

  // Filter notifications
  const filteredNotifications = notifications
    .filter((n) => (selectedStatus ? n.status === selectedStatus : true))
    .filter((n) => (selectedCategory ? n.category === selectedCategory : true))
    .filter(
      (n) =>
        n.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (n.description &&
          n.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  // Statistics
  const stats = {
    total: notifications.length,
    pending: notifications.filter((n) => n.status === "pending").length,
    approved: notifications.filter((n) => n.status === "approved").length,
    rejected: notifications.filter((n) => n.status === "rejected").length,
    highPriority: notifications.filter((n) => n.priority === "high").length,
  };

  // Get action icon
  const getActionIcon = (action: string) => {
    switch (action) {
      case "add":
        return Plus;
      case "edit":
        return Edit;
      case "delete":
        return Trash2;
      default:
        return FileText;
    }
  };

  // Get category icon and color
  const getCategoryStyle = (category: string) => {
    const styles = {
      publication: {
        icon: FileText,
        color: "text-blue-600",
        bg: "bg-blue-100",
      },
      profile: { icon: User, color: "text-purple-600", bg: "bg-purple-100" },
      system: { icon: Settings, color: "text-gray-600", bg: "bg-gray-100" },
      achievement: {
        icon: Star,
        color: "text-yellow-600",
        bg: "bg-yellow-100",
      },
    };
    return styles[category as keyof typeof styles] || styles.system;
  };

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: { bg: "bg-red-100", text: "text-red-700", label: "Tinggi" },
      medium: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Sedang" },
      low: { bg: "bg-green-100", text: "text-green-700", label: "Rendah" },
    };
    return styles[priority as keyof typeof styles] || styles.medium;
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
            <p className="text-sm opacity-90">Notifikasi {lastAction}</p>
          </div>
        </div>
      )}

      <main className="flex-1 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg relative">
                <Bell className="w-7 h-7 text-white" />
                {stats.pending > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {stats.pending}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Pusat Notifikasi
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Kelola dan pantau semua aktivitas sistem
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-2 bg-white text-gray-700 px-4 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-200"
              >
                <CheckCircle2 className="w-5 h-5" />
                Tandai Semua
              </button>
              <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                <RefreshCw className="w-5 h-5" />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-3xl text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Bell className="w-8 h-8 text-white/80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 rounded-3xl text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">
                    Menunggu
                  </p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-white/80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-3xl text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">
                    Disetujui
                  </p>
                  <p className="text-2xl font-bold">{stats.approved}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-white/80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-3xl text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Ditolak</p>
                  <p className="text-2xl font-bold">{stats.rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-white/80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-3xl text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    Prioritas Tinggi
                  </p>
                  <p className="text-2xl font-bold">{stats.highPriority}</p>
                </div>
                <Zap className="w-8 h-8 text-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari notifikasi, pengguna, atau deskripsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Status Filter */}
              <select
                aria-label="Filter berdasarkan status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none bg-white min-w-[130px]"
              >
                <option value="">Semua Status</option>
                <option value="pending">Menunggu</option>
                <option value="approved">Disetujui</option>
                <option value="rejected">Ditolak</option>
              </select>

              {/* Category Filter */}
              <select
                aria-label="Filter berdasarkan kategori"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none bg-white min-w-[130px]"
              >
                <option value="">Semua Kategori</option>
                <option value="publication">Publikasi</option>
                <option value="achievement">Prestasi</option>
                <option value="profile">Profil</option>
                <option value="system">Sistem</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedStatus || selectedCategory) && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600">Filter aktif:</span>
              {searchQuery && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                  "{searchQuery}"
                </span>
              )}
              {selectedStatus && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {selectedStatus}
                </span>
              )}
              {selectedCategory && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  {selectedCategory}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStatus("");
                  setSelectedCategory("");
                }}
                className="text-gray-400 hover:text-gray-600 text-xs ml-2"
              >
                Reset semua
              </button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Bell className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {notifications.length === 0
                  ? "Tidak Ada Notifikasi"
                  : "Tidak Ada Hasil"}
              </h3>
              <p className="text-gray-600">
                {notifications.length === 0
                  ? "Semua notifikasi akan muncul di sini"
                  : "Coba ubah filter atau kata kunci pencarian"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const ActionIcon = getActionIcon(notification.action);
              const categoryStyle = getCategoryStyle(notification.category);
              const CategoryIcon = categoryStyle.icon;
              const priorityBadge = getPriorityBadge(notification.priority);

              return (
                <div
                  key={notification.id}
                  className="group bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* User Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-semibold shadow-lg flex-shrink-0">
                        {notification.user.charAt(0)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-800 text-lg">
                                {notification.user}
                              </h3>
                              <div
                                className={`${categoryStyle.bg} ${categoryStyle.color} p-1 rounded-lg`}
                              >
                                <CategoryIcon className="w-4 h-4" />
                              </div>
                              <div className="flex items-center gap-1 text-gray-600">
                                <ActionIcon className="w-4 h-4" />
                                <span className="text-sm capitalize">
                                  {notification.action}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-2">
                              <span className="font-medium">
                                {notification.target}
                              </span>
                            </p>
                            {notification.description && (
                              <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                                {notification.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Footer Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Status Badge */}
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                notification.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : notification.status === "approved"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {notification.status === "pending" && (
                                <Clock className="w-3 h-3" />
                              )}
                              {notification.status === "approved" && (
                                <CheckCircle2 className="w-3 h-3" />
                              )}
                              {notification.status === "rejected" && (
                                <XCircle className="w-3 h-3" />
                              )}
                              {notification.status === "pending"
                                ? "Menunggu"
                                : notification.status === "approved"
                                ? "Disetujui"
                                : "Ditolak"}
                            </span>

                            {/* Priority Badge */}
                            <span
                              className={`${priorityBadge.bg} ${priorityBadge.text} px-2 py-1 rounded-full text-xs font-medium`}
                            >
                              {priorityBadge.label}
                            </span>

                            {/* Timestamp */}
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {notification.timestamp}
                            </span>
                          </div>

                          {/* Actions */}
                          {notification.status === "pending" && (
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleApprove(notification.id)}
                                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all transform hover:scale-105"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                Setuju
                              </button>
                              <button
                                onClick={() => handleReject(notification.id)}
                                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all transform hover:scale-105"
                              >
                                <XCircle className="w-4 h-4" />
                                Tolak
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
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
      `}</style>
    </div>
  );
};

export default AdminNotifications;
