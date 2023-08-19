import instance from "../api2/instance";

const authService = {};

authService.login = function login(payload) {
  return instance.post("login/", payload);
};

authService.logout = function logout(payload) {
  return instance.post("logout/", payload);
};

authService.refreshToken = function refreshToken(payload) {
  return instance.post("api/token/refresh/", payload);
};

export default authService;
