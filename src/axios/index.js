import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://riwa-backend-7a251027bbd5.herokuapp.com/",
  baseURL: "http://localhost:5000/",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const Info = window.sessionStorage.getItem("info");
    if (Info) {
      config.headers["Authorization"] = "Bearer " + JSON.parse(Info)?.token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
axiosInstance.interceptors.response.use(
  function (config) {
    return config;
  },
  function (err) {
    if (err.response.status === 401) {
      window.location.href = "/";
      return Promise.reject(err);
    }
  }
);
