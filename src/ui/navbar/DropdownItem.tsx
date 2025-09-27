import { Link } from "react-router-dom";

import type { ReactNode } from "react";

interface DropdownItemProps {
  children: ReactNode;
  to?: string;
}

const DropdownItem = ({ children, to }: DropdownItemProps) => {
  return to ? (
    <Link
      to={to}
      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
    >
      {children}
    </Link>
  ) : (
    <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm">
      {children}
    </div>
  );
};

export default DropdownItem;
