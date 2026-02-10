import http from "./http";

export const adminLogin = async (email, password) => {
  const { data } = await http.post("/admin_login.php", { email, password });
  return data;
};
