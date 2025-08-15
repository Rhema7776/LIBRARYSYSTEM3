// // src/api/axios.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// // Attach access token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Optional: refresh token logic
// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;
//     if (err.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refresh_token");

//       if (refreshToken) {
//         try {
//           const res = await axios.post(
//             "http://127.0.0.1:8000/api/token/refresh/",
//             { refresh: refreshToken }
//           );
//           localStorage.setItem("access_token", res.data.access);
//           originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
//           return api(originalRequest);
//         } catch (refreshError) {
//           localStorage.removeItem("access_token");
//           localStorage.removeItem("refresh_token");
//           window.location.href = "/login";
//           return Promise.reject(refreshError);
//         }
//       }
//     }
//     return Promise.reject(err);
//   }
// );

// export default api;

// // src/api/axios.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// // Attach access token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

// import axios from "axios";

// // Create axios instance
// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// // Request interceptor to attach access token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor to handle 401 and refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refresh_token");

//       if (refreshToken) {
//         try {
//           // Call refresh endpoint
//           const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
//             refresh: refreshToken,
//           });

//           // Save new access token
//           localStorage.setItem("access_token", res.data.access);

//           // Update original request headers
//           originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

//           // Retry original request
//           return api(originalRequest);
//         } catch (refreshError) {
//           // Refresh failed → logout
//           localStorage.removeItem("access_token");
//           localStorage.removeItem("refresh_token");
//           window.location.href = "/login";
//           return Promise.reject(refreshError);
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Request interceptor → attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle 401 + refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        // No refresh token → logout
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh: refreshToken,
        });

        // Save new access token
        localStorage.setItem("access_token", res.data.access);

        // Update original request headers
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
