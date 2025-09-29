import React, { useState } from "react";
import { Plus, Trash2, Pencil, X, Users, Search, Filter } from "lucide-react";
import Sidebar from "../../ui/components-admin/sidebar";

type Role = "admin" | "editor" | "viewer" | "customer" | "vendor";

type UserData = {
  id?: number;
  name: string;
  email: string;
  role: Role;
  status?: "active" | "inactive";
  joinDate?: string;
  avatar?: string;
};

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: 1,
      name: "Rafa Monton",
      email: "rafa@example.com",
      role: "admin",
      status: "active",
      joinDate: "2024-01-15",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Budi Santoso",
      email: "budi@example.com",
      role: "editor",
      status: "active",
      joinDate: "2024-02-20",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Siti Nurhaliza",
      email: "siti@example.com",
      role: "viewer",
      status: "inactive",
      joinDate: "2024-03-10",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    },
  ]);

  const [filteredUsers, setFilteredUsers] = useState<UserData[]>(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [form, setForm] = useState<UserData>({
    name: "",
    email: "",
    role: "viewer",
    status: "active",
  });

  // Filter and search functionality
  React.useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter]);

  const openAddModal = () => {
    setEditMode(false);
    setForm({ name: "", email: "", role: "viewer", status: "active" });
    setIsModalOpen(true);
  };

  const openEditModal = (index: number) => {
    setEditMode(true);
    setCurrentIndex(index);
    const userToEdit = users.find((u) => u.id === filteredUsers[index].id);
    if (userToEdit) setForm(userToEdit);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return;

    if (editMode && currentIndex !== null) {
      const userToUpdate = filteredUsers[currentIndex];
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userToUpdate.id
            ? { ...form, id: userToUpdate.id, joinDate: userToUpdate.joinDate }
            : u
        )
      );
    } else {
      const newUser = {
        ...form,
        id: Date.now(),
        joinDate: new Date().toISOString().split("T")[0],
      };
      setUsers((prev) => [...prev, newUser]);
    }

    setIsModalOpen(false);
    setEditMode(false);
    setCurrentIndex(null);
  };

  const handleDelete = (index: number) => {
    const userToDelete = filteredUsers[index];
    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
  };

  const getRoleBadgeStyle = (role: Role) => {
    const styles = {
      admin: "bg-red-100 text-red-700 border border-red-200",
      editor: "bg-blue-100 text-blue-700 border border-blue-200",
      viewer: "bg-gray-100 text-gray-700 border border-gray-200",
      customer: "bg-green-100 text-green-700 border border-green-200",
      vendor: "bg-purple-100 text-purple-700 border border-purple-200",
    };
    return styles[role];
  };

  const getStatusBadgeStyle = (status: string) => {
    return status === "active"
      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
      : "bg-orange-100 text-orange-700 border border-orange-200";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 lg:p-10">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-100 rounded-xl">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                Manajemen User
              </h1>
              <p className="text-slate-600 text-base">
                Kelola semua pengguna dalam sistem dengan mudah dan efisien
              </p>
            </div>
            <button
              type="button"
              onClick={openAddModal}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Tambah User
            </button>
          </div>

          {/* Stats Cards */}

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama atau email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all"
                />
              </div>
              <div className="relative min-w-[200px]">
                <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <select
                  aria-label="Filter berdasarkan role"
                  value={roleFilter}
                  onChange={(e) =>
                    setRoleFilter(e.target.value as Role | "all")
                  }
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none appearance-none bg-white transition-all"
                >
                  <option value="all">Semua Role</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced User List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="py-16 text-center">
              <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 text-lg mb-2">
                {searchTerm || roleFilter !== "all"
                  ? "Tidak ada user yang ditemukan"
                  : "Belum ada user"}
              </p>
              <p className="text-slate-400 text-sm">
                {searchTerm || roleFilter !== "all"
                  ? "Coba ubah filter pencarian"
                  : "Klik tombol 'Tambah User' untuk memulai"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="p-4 text-left font-semibold text-slate-700">
                      User
                    </th>
                    <th className="p-4 text-left font-semibold text-slate-700">
                      Role
                    </th>
                    <th className="p-4 text-left font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="p-4 text-left font-semibold text-slate-700">
                      Bergabung
                    </th>
                    <th className="p-4 text-left font-semibold text-slate-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-all duration-150"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-800">
                              {user.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadgeStyle(
                            user.role
                          )}`}
                        >
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeStyle(
                            user.status || "active"
                          )}`}
                        >
                          {user.status === "active" ? "Aktif" : "Tidak Aktif"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-slate-600">
                          {user.joinDate}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(index)}
                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-150"
                            aria-label="Edit user"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(index)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-150"
                            aria-label="Hapus user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {editMode ? "Edit User" : "Tambah User Baru"}
              </h2>
              <p className="text-slate-600">
                {editMode
                  ? "Perbarui informasi user"
                  : "Isi data user yang akan ditambahkan"}
              </p>
            </div>

            {/* Enhanced Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all placeholder-slate-400"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all placeholder-slate-400"
                  placeholder="user@example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Role
                  </label>
                  <select
                    aria-label="Pilih role user"
                    value={form.role}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value as Role })
                    }
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    aria-label="Pilih status user"
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as "active" | "inactive",
                      })
                    }
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all"
                  >
                    <option value="active">Aktif</option>
                    <option value="inactive">Tidak Aktif</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-150"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={!form.name.trim() || !form.email.trim()}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-slate-300 disabled:to-slate-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-150 active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {editMode ? "Update" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
