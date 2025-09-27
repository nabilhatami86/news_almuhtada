import React from "react";

type ArtikelPopulerItem = {
  title: string;
  desc: string;
};

type ArtikelPopulerProps = {
  items: ArtikelPopulerItem[];
};

const ArtikelPopuler: React.FC<ArtikelPopulerProps> = ({ items }) => {
  return (
    <aside className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Artikel Populer
      </h2>
      {items.map((item, index) => (
        <div key={index} className="bg-white shadow p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.desc}</p>
        </div>
      ))}
    </aside>
  );
};

export default ArtikelPopuler;
