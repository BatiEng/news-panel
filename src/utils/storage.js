const KEY = "gk_admin_token";

export const setToken = (token) => {
  localStorage.setItem(KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(KEY);
};

export const clearToken = () => {
  localStorage.removeItem(KEY);
};
