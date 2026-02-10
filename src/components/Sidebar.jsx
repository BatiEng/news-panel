import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded ${
    isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"
  }`;

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r p-4 space-y-4">
      <div className="font-bold text-lg">GK Admin</div>

      <nav className="space-y-1 text-sm">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/categories" className={linkClass}>
          Kategoriler
        </NavLink>

        <NavLink to="/news" className={linkClass}>
          Haberler
        </NavLink>

        <NavLink to="/news/create" className={linkClass}>
          Haber Ekle
        </NavLink>

        <NavLink to="/comments" className={linkClass}>
          Yorumlar
        </NavLink>
        <NavLink to="/users" className={linkClass}>
          Kullanıcılar
        </NavLink>
      </nav>
    </aside>
  );
}
