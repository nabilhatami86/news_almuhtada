import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ children, to, className, ...props }: NavLinkProps) => {
  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
