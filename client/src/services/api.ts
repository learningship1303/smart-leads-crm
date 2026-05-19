import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/*
========================================
REQUEST INTERCEPTOR
Automatically attaches JWT token
========================================
*/

API.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/*
========================================
RESPONSE INTERCEPTOR
Auto logout if token invalid
========================================
*/

API.interceptors.response.use(

  (response) => response,

  (error) => {

    if (
      error.response &&
      error.response.status === 401
    ) {

      localStorage.removeItem("token");

      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;