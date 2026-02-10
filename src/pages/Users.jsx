import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getUsers, updateUserStatus } from "../api/users";

export default function Users() {
  const [users, setUsers] = useState([]);

  const load = async () => setUsers(await getUsers());
  useEffect(() => {
    load();
  }, []);

  const toggle = async (u) => {
    await updateUserStatus(u.id, u.is_active ? 0 : 1);
    load();
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-4">Kullanıcılar</h1>

      <div className="bg-white border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Ad</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Durum</th>
              <th className="p-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 text-center">
                  {u.is_active ? "Aktif" : "Pasif"}
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => toggle(u)}
                    className="underline text-xs"
                  >
                    {u.is_active ? "Pasif Yap" : "Aktif Yap"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
