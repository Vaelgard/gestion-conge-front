export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refrechtoken");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  window.location.href = "/login";
};
  