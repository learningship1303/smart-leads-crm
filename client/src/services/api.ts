import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-leads-crm-backend.onrender.com/api",
});

/*
========================================
REQUEST INTERCEPTOR
Automatically attaches JWT token
========================================
*/

API.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);

      config.headers.Authorization =
        `Bearer ${parsedUser.token}`;
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