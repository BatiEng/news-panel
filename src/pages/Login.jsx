import { useState } from "react";
import { adminLogin } from "../api/auth";
import { setToken } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    const res = await adminLogin(email, password);
    if (!res.success) {
      alert(res.message);
      return;
    }
    console.log(res);
    setToken(res.token);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded w-80 space-y-4">
        <h1 className="font-semibold text-lg">Admin Login</h1>

        <input
          className="border w-full p-2 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-2 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-black text-white py-2 rounded"
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}
