/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import axios from "axios";
import store from "@/store";
import { refreshAccessToken, logOut } from "@/helpers/auth";
import { loaderBlackList, authHeaderBlackList } from "@/constants/auth";
import { succesfullAlertsByUrl, blackList } from "@/constants/alertMessages";

store.getters.getLoginTokens; // eslint-disable-line no-unused-expressions

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  responseType: "json",
});

// Interceptors for request
instance.interceptors.request.use((config) => {
  const endpoint = config.url.replace(config.baseURL, "");
  const foundAuth = authHeaderBlackList.find((element) =>
    config.url.includes(element)
  );
  const found = loaderBlackList.find((element) => endpoint.includes(element));

  if (!foundAuth) {
    const tokens = store.getters.getLoginTokens;
    if (tokens) {
      config.headers.Authorization = `Bearer ${tokens.access_token}`;
    }
  }

  if (!found) {
    store.dispatch("updateLoaderCount", +1);
  }
  return config;
});

// Interceptors for response
instance.interceptors.response.use(
  (res) => {
    let configUrl = res.config.url;
    const lastIndex = configUrl.lastIndexOf("/");
    const lastPart = configUrl.slice(lastIndex);
    if (/\d/.test(lastPart)) {
      configUrl = configUrl.slice(0, lastIndex);
    }
    const isInBlackList = blackList.includes(configUrl);
    const isRefreshToken =
      configUrl === "/oauth/token" &&
      res.config.data?.includes("grant_type=refresh_token");
    store.dispatch("updateLoaderCount", -1);
    if (
      (res.config.method === "put" || res.config.method === "post") &&
      !isInBlackList &&
      !isRefreshToken
    ) {
      const successGeneralMessage = "Acción realizada con éxito";
      let succesfullMessage = Object.keys(succesfullAlertsByUrl).includes(
        configUrl
      )
        ? succesfullAlertsByUrl[configUrl]
        : successGeneralMessage;
      if (res.config.method === "post") {
        succesfullMessage = succesfullMessage.replace("actualizada", "creada");
        succesfullMessage = succesfullMessage.replace("actualizado", "creado");
      }
      store.dispatch("updateAlerts", {
        content: succesfullMessage,
        status: "success",
      });
    }
    return res;
  },
  (error) => {
    store.dispatch("updateLoaderCount", -1);
    const message = error.response?.data?.message
      ? error.response?.data?.message
      : "Error en la aplicación";
    if (error.response?.status === 401) {
      store.dispatch("updateAlerts", {
        content: `Error 401 en ${error.response.url}`,
        status: "error",
      });
    } else {
      store.dispatch("updateAlerts", {
        content: message,
        status: "error",
      });
    }
    if (error.response && error.response.status === 401) {
      const tokens = store.getters.getLoginTokens;
      if (error.config.url === "/oauth/token") return Promise.reject(error);
      if (!tokens) {
        logOut();
        return Promise.reject(error);
      }
      refreshAccessToken(tokens?.refresh_token)()
        .then((res) => {
          store.dispatch("updateLoginTokens", res);
          window.location.reload(true);
        })
        .catch(() => {
          logOut();
        });
    }
    return Promise.reject(error);
  }
);

export default instance;
