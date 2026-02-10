import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getPendingComments, updateCommentStatus } from "../api/comments";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getPendingComments();
      setComments(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    await updateCommentStatus(id, 1);
    load();
  };

  const reject = async (id) => {
    if (!confirm("Yorumu silmek istiyor musun?")) return;
    await updateCommentStatus(id, 0);
    load();
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-4">Yorum Moderasyonu</h1>

      {loading && <div className="text-sm">Yükleniyor...</div>}

      {!loading && comments.length === 0 && (
        <div className="text-sm text-gray-500">Onay bekleyen yorum yok</div>
      )}

      {!loading && comments.length > 0 && (
        <div className="space-y-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-white border rounded-lg p-4 space-y-2"
            >
              <div className="text-sm font-medium">{c.user_name}</div>

              <div className="text-xs text-gray-500">Haber: {c.news_title}</div>

              <div className="text-sm">{c.comment}</div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => approve(c.id)}
                  className="text-green-600 text-sm underline"
                >
                  Onayla
                </button>

                <button
                  onClick={() => reject(c.id)}
                  className="text-red-500 text-sm underline"
                >
                  Reddet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
