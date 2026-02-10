import http from "./http";

export const getPendingComments = async () => {
  const { data } = await http.get("/comments_pending.php");
  return data.data || [];
};

export const updateCommentStatus = async (id, is_active) => {
  const { data } = await http.post("/comments_update.php", {
    id,
    is_active,
  });
  return data;
};
