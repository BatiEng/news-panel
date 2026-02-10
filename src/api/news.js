import http from "./http";

export const getAllNews = async () => {
  const { data } = await http.get("/news_get.php");
  return data.data || [];
};

export const updateNewsStatus = async (id, is_active) => {
  const { data } = await http.post("/news_update.php", {
    id,
    is_active,
  });
  return data;
};
export const createNews = async (payload) => {
  const { data } = await http.post("/news_create.php", payload);
  return data;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await http.post("/upload.php", formData);
  return data;
};
export const getNewsAdmin = async (id) => {
  const { data } = await http.get(`/news_get_one_admin.php?id=${id}`);
  return data.data;
};

export const editNews = async (payload) => {
  const { data } = await http.post("/news_edit.php", payload);
  return data;
};
