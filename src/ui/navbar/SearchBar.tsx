const SearchBar = () => (
  <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#047857"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 21l-4.35-4.35" />
      <circle cx="11" cy="11" r="8" />
    </svg>
    <input
      type="search"
      placeholder="Cari artikel..."
      className="bg-transparent outline-none text-sm"
    />
  </div>
);

export default SearchBar;
