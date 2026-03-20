import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // 🔥 THIS IS THE FIX
});

// AUTH
export const adminLogin = (data) => API.post("/auth/login", data);
export const checkAuth = () => API.get("/auth/check");
export const logoutAdmin = () => API.post("/auth/logout");

export const getCategories = () => API.get("/categories");
export const getEquipments = () => API.get("/equipments");
export const getPackages = () => API.get("/packages");

export const getServices = () => API.get("/services");
export const getServiceBySlug = (slug) => API.get(`/services/${slug}`);
export const deleteService = (id) => API.delete(`/services/${id}`);
export const createService = (data) => API.post("/services", data, { headers: { "Content-Type": "multipart/form-data" }, });
export const updateService = (id, data) => API.put(`/services/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });

export const getServiceGallery = (serviceId) => API.get(`/service-gallery/${serviceId}`);
export const getAllServiceGallery = () => API.get("/service-gallery");
export const uploadServiceGallery = (serviceId, data) => API.post(`/service-gallery/${serviceId}`, data, { headers: { "Content-Type": "multipart/form-data" }, });
export const deleteServiceGalleryImage = (id) => API.delete(`/service-gallery/${id}`);
export const reorderServiceGallery = (data) => API.put("/service-gallery/reorder", data);

export const getPortfolio = () => API.get("/portfolio")
export const uploadPortfolio = (data, config) => API.post("/portfolio", data, { headers: { "Content-Type": "multipart/form-data" }, ...config, });
export const deletePortfolio = (id) => API.delete(`/portfolio/${id}`);
export const reorderPortfolio = (data) => API.put("/portfolio/reorder", data);

export const getBackdrops = () => API.get("/backdrops");
export const uploadBackdrop = (data, config) => API.post("/backdrops", data, { headers: { "Content-Type": "multipart/form-data" }, ...config, });
export const deleteBackdrop = (id) => API.delete(`/backdrops/${id}`);
export const reorderBackdrop = (data) => API.put("/backdrops/reorder", data);

export const createPackage = (data) => API.post("/packages", data);
export const updatePackage = (id, data) => API.put(`/packages/${id}`, data);
export const deletePackage = (id) => API.delete(`/packages/${id}`);
export const reorderPackages = (data) => API.put("/packages/reorder", data);

