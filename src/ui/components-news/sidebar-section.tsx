import React from "react";

interface Props {
  title: string;
  items: string[];
}

const SidebarSection: React.FC<Props> = ({ title, items }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h3 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="text-sm text-gray-600 hover:text-emerald-700 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarSection;
