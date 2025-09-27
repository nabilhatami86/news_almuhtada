import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Clock,
  Eye,
  ArrowRight,
  Star,
  Zap,
  Flame as Fire,
  Calendar,
  Tag,
  Users,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";
import CardHeadliner from "../ui/components-global/card-headliner";
import TrendingList from "../ui/components-global/trending-list";
import ArticleCard from "../ui/components-global/card-artikel";
import { featuredArticles, articles, trendingNews } from "../assets/data/dummy";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: "semua", label: "Semua", icon: Star },
    { id: "teknologi", label: "Teknologi", icon: Zap },
    { id: "pendidikan", label: "Pendidikan", icon: Users },
    { id: "penelitian", label: "Penelitian", icon: Search },
    { id: "prestasi", label: "Prestasi", icon: TrendingUp },
  ];

  const hotTopics = [
    { title: "AI & Machine Learning", count: 15, trend: "+12%" },
    { title: "Pendidikan Digital", count: 8, trend: "+8%" },
    { title: "Riset Terbaru", count: 12, trend: "+15%" },
    { title: "Prestasi Mahasiswa", count: 6, trend: "+5%" },
    { title: "Teknologi Blockchain", count: 4, trend: "+20%" },
  ];

  const stats = [
    { label: "Total Artikel", value: "1,234", icon: Clock },
    { label: "Pembaca Aktif", value: "45K", icon: Users },
    { label: "Artikel Trending", value: "28", icon: Fire },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredArticles =
    activeCategory === "semua"
      ? articles
      : articles.filter(
          (article) => article.category.toLowerCase() === activeCategory
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-10">
            {/* Featured Headliner */}
            <section className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Fire className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Berita Utama
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>
              <CardHeadliner slides={featuredArticles} />
            </section>

            {/* Category Filter */}
            <section>
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    Kategori Berita
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Lihat Semua
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    const isActive = activeCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Latest News */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Berita Terbaru
                  </h2>
                  {activeCategory !== "semua" && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {activeCategory}
                    </span>
                  )}
                </div>
                <button className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-all">
                  <span>Lihat Semua</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-3xl p-6 shadow-lg animate-pulse"
                    >
                      <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className="group rounded-3xl  overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <ArticleCard article={article} featured={index === 0} />
                      {/* Enhanced Footer */}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Spotlight Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Sorotan Khusus
                  </h2>
                </div>
                <button className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-all">
                  <span>Lihat Semua</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(0, 3).map((article, index) => (
                  <div
                    key={article.id}
                    className="group relative  overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    {index === 0 && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          <span className="text-xs font-bold">
                            PILIHAN EDITOR
                          </span>
                        </div>
                      </div>
                    )}
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Enhanced Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Trending Section */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <h3 className="text-lg font-bold">Trending Now</h3>
                </div>
              </div>
              <div className="p-4">
                <TrendingList items={trendingNews} />
              </div>
            </div>

            {/* Hot Topics */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Fire className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Topik Hangat
                </h3>
              </div>

              <div className="space-y-4">
                {hotTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                        {topic.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {topic.count} artikel
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {topic.trend}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Ikuti Kami
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Facebook", color: "bg-blue-600", followers: "12K" },
                  { name: "Twitter", color: "bg-sky-500", followers: "8.5K" },
                  { name: "Instagram", color: "bg-pink-500", followers: "15K" },
                  { name: "YouTube", color: "bg-red-600", followers: "6.2K" },
                ].map((social, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`${social.color} text-white p-3 rounded-2xl mb-2 hover:scale-105 transition-transform cursor-pointer`}
                    >
                      <span className="font-semibold text-sm">
                        {social.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {social.followers} followers
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Home;
