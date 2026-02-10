import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getCategoriesAdmin,
  createCategory,
  updateCategory,
} from "../api/categories";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const data = await getCategoriesAdmin();
    setCategories(data);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!title.trim()) return;
    await createCategory(title);
    setTitle("");
    load();
  };

  const toggle = async (c) => {
    await updateCategory({
      id: c.id,
      title: c.title,
      is_active: c.is_active ? 0 : 1,
    });
    load();
  };

  const rename = async (id, newTitle, is_active) => {
    await updateCategory({
      id,
      title: newTitle,
      is_active,
    });
    load();
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-4">Kategoriler</h1>

      {/* ADD */}
      <div className="flex gap-2 mb-6 max-w-md">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Yeni kategori"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={add} className="bg-black text-white px-4 rounded">
          Ekle
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white border rounded max-w-md">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-2 p-3 border-b last:border-0"
          >
            <input
              className="border p-1 text-sm flex-1"
              defaultValue={c.title}
              onBlur={(e) => rename(c.id, e.target.value, c.is_active)}
            />

            <button onClick={() => toggle(c)} className="text-xs underline">
              {c.is_active ? "Pasif" : "Aktif"}
            </button>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="p-3 text-sm text-gray-500">Kategori yok</div>
        )}
      </div>
    </Layout>
  );
}
