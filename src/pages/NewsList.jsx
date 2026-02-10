import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getAllNews, updateNewsStatus } from "../api/news";
import { Link } from "react-router-dom";

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAllNews();
      setNews(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleStatus = async (item) => {
    await updateNewsStatus(item.id, item.is_active ? 0 : 1);
    load();
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-4">Haberler</h1>

      {loading && <div className="text-sm">Yükleniyor...</div>}

      {!loading && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3">Başlık</th>
                <th className="text-left p-3">Kategori</th>
                <th className="text-center p-3">Durum</th>
                <th className="text-right p-3">İşlem</th>
              </tr>
            </thead>

            <tbody>
              {news.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.category || "-"}</td>

                  <td className="p-3 text-center">
                    {item.is_active ? (
                      <span className="text-green-600">Aktif</span>
                    ) : (
                      <span className="text-gray-400">Pasif</span>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => toggleStatus(item)}
                      className="text-xs underline"
                    >
                      {item.is_active ? "Pasif Yap" : "Aktif Yap"}
                    </button>
                    <Link
                      to={`/news/edit/${item.id}`}
                      className="text-xs underline"
                    >
                      Düzenle
                    </Link>
                  </td>
                </tr>
              ))}

              {news.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Haber yok
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
