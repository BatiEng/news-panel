import { clearToken } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <div className="text-sm text-gray-600">Admin Panel</div>

      <button onClick={logout} className="text-sm text-red-500 hover:underline">
        Çıkış
      </button>
    </header>
  );
}
