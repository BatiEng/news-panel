import http from "./http";

export const getUsers = async () => {
  const { data } = await http.get("/users_get.php");
  return data.data || [];
};

export const updateUserStatus = async (id, is_active) => {
  const { data } = await http.post("/users_update.php", { id, is_active });
  return data;
};
