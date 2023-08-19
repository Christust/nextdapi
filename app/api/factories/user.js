export default (axios) => ({
  userProfile() {
    return axios.get("v1/user");
  },
  list(payload) {
    return axios.get("v1/users", { params: payload });
  },
  pwdChange(id, data) {
    return axios.put(`v1/user_password/${id}`, data);
  },
  pwdChangeFirstLogin(data) {
    return axios.put("v1/user_change_password", data);
  },
  saveNewUser(data) {
    return axios.post("v1/users", data);
  },
  saveEditUser(id, data) {
    return axios.put(`v1/users/${id}`, data);
  },
  removeUser(id) {
    return axios.delete(`v1/users/${id}`);
  },
  searchUser(payload) {
    return axios.post("v1/patients_search", payload);
  },
});
