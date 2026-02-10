import http from "./http";

export const getCategories = async () => {
  const { data } = await http.get("/categories_get.php");
  return data.data || [];
};

export const getCategoriesAdmin = async () => {
  const { data } = await http.get("/categories_get_admin.php");
  return data.data || [];
};

export const createCategory = async (title) => {
  const { data } = await http.post("/categories_create.php", { title });
  return data;
};

export const updateCategory = async (payload) => {
  const { data } = await http.post("/categories_update.php", payload);
  return data;
};
