import axios from "axios";
import swal from "sweetalert";
import store from "../../store";
import { setLoaderCount } from "../../store/reducers/loader/loaderSlice";

const instance = axios.create({
  baseURL: "https://daapi-53223c26c4dc.herokuapp.com/",
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  store.dispatch(setLoaderCount(+1));
  return config;
});

instance.interceptors.response.use(
  (res) => {
    store.dispatch(setLoaderCount(-1));
    return res;
  },
  (error) => {
    store.dispatch(setLoaderCount(-1));
    console.log(error);
    swal("Error!");
    return error;
  }
);

export default instance;
