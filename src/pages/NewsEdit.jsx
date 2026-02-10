import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getNewsAdmin, editNews, uploadImage } from "../api/news";
import { getCategories } from "../api/categories";

export default function NewsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    Promise.all([getNewsAdmin(id), getCategories()]).then(([n, c]) => {
      setForm(n);
      setCategories(c);
    });
  }, [id]);

  if (!form) return <Layout>Yükleniyor…</Layout>;

  const upload = async (file) => {
    setUploading(true);
    const res = await uploadImage(file);
    if (res.success) {
      setForm((f) => ({ ...f, images: [...f.images, res.url] }));
    }
    setUploading(false);
  };

  const submit = async () => {
    await editNews(form);
    navigate("/news");
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-4">Haberi Düzenle</h1>

      <div className="space-y-4 max-w-2xl">
        <input
          className="border p-2 w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="border p-2 w-full h-40"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          value={form.category_id || ""}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        >
          <option value="">Kategori</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <label className="flex gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_featured == 1}
            onChange={(e) =>
              setForm({ ...form, is_featured: e.target.checked ? 1 : 0 })
            }
          />
          Öne çıkar
        </label>

        <input
          type="file"
          disabled={uploading}
          onChange={(e) => upload(e.target.files[0])}
        />

        <div className="flex gap-2">
          {form.images.map((img, i) => (
            <img
              key={i}
              src={`https://panel.gokhankozak.com${img}`}
              className="w-20 h-14 object-cover"
            />
          ))}
        </div>

        <button
          onClick={submit}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Kaydet
        </button>
      </div>
    </Layout>
  );
}
