import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { createNews, uploadImage } from "../api/news";
import { getCategories } from "../api/categories";
import { useNavigate } from "react-router-dom";

export default function NewsCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // ⬇️ UPLOAD NET VE KİLİTLİ
  const handleUpload = async (file) => {
    if (!file) return;

    setUploading(true);

    try {
      const res = await uploadImage(file);
      console.log("UPLOAD RES:", res);

      if (res.success && res.url) {
        setImages((prev) => {
          const next = [...prev, res.url];
          console.log("IMAGES STATE:", next);
          return next;
        });
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      alert("Upload error");
    } finally {
      setUploading(false);
    }
  };

  // ⬇️ SUBMIT KORUMALI
  const submit = async () => {
    if (uploading) {
      alert("Görsel yükleme bitmeden kaydedemezsin");
      return;
    }

    if (!title || !description) {
      alert("Başlık ve içerik zorunlu");
      return;
    }

    if (images.length === 0) {
      alert("En az 1 görsel eklemelisin");
      return;
    }

    console.log("SENDING IMAGES:", images);

    setLoading(true);

    try {
      const res = await createNews({
        title,
        description,
        source,
        category_id: categoryId || null,
        is_featured: isFeatured ? 1 : 0,
        images,
      });

      if (!res.success) {
        alert(res.message || "Kayıt başarısız");
        return;
      }

      navigate("/news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-6">Haber Ekle</h1>

      <div className="max-w-2xl space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded h-40"
          placeholder="Haber içeriği"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Kaynak (opsiyonel)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Kategori seç</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          Öne çıkar
        </label>

        {/* IMAGE UPLOAD */}
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => handleUpload(e.target.files[0])}
          />

          <div className="flex gap-2 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={`https://panel.gokhankozak.com${img}`}
                className="w-24 h-16 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        <button
          onClick={submit}
          disabled={loading || uploading}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {uploading
            ? "Görsel yükleniyor..."
            : loading
              ? "Kaydediliyor..."
              : "Kaydet"}
        </button>
      </div>
    </Layout>
  );
}
