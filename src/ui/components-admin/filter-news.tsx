import { Search, LayoutGrid, List, Download } from "lucide-react";

type NewsFiltersProps = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  availableCategories: string[];
  viewMode: "grid" | "list";
  setViewMode: (val: "grid" | "list") => void;
  onReset: () => void;
};

const NewsFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  availableCategories,
  viewMode,
  setViewMode,
  onReset,
}: NewsFiltersProps) => (
  <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-8">
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari artikel, penulis, atau konten..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Category */}
        <select
          aria-label="Filter berdasarkan kategori"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none bg-white min-w-[150px]"
        >
          <option value="">Semua Kategori</option>
          {availableCategories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>

        {/* Status */}
        <select
          aria-label="Filter berdasarkan status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none bg-white min-w-[130px]"
        >
          <option value="">Semua Status</option>
          <option value="published">Dipublikasi</option>
          <option value="draft">Draft</option>
          <option value="archived">Arsip</option>
        </select>
      </div>

      {/* View Mode */}
      <div className="flex items-center gap-3">
        <div className="flex bg-gray-100 rounded-2xl p-1">
          <button
            aria-label="Ubah ke tampilan grid"
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
            aria-label="Ubah ke tampilan daftar"
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
          aria-label="Unduh data artikel"
          className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>

    {/* Reset Filters */}
    {(searchQuery || selectedCategory || selectedStatus) && (
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-600">Filter aktif:</span>
        {searchQuery && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            "{searchQuery}"
          </span>
        )}
        {selectedCategory && (
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
            {selectedCategory}
          </span>
        )}
        {selectedStatus && (
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
            {selectedStatus}
          </span>
        )}
        <button
          aria-label="Reset semua filter"
          onClick={onReset}
          className="text-gray-400 hover:text-gray-600 text-xs ml-2"
        >
          Reset semua
        </button>
      </div>
    )}
  </div>
);

export default NewsFilters;
