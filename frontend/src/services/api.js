import axios from "axios";
import { getToken } from "../utils/auth";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach auth token to every request automatically, if logged in
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Designs
export const getDesigns = () => api.get("/designs/");
export const getDesignBySlug = (slug) => api.get(`/designs/${slug}/`);
export const createDesign = (data) => api.post("/designs/", data);
export const updateDesign = (id, data) => api.patch(`/designs/${id}/`, data);
export const deleteDesign = (id) => api.delete(`/designs/${id}/`);

// Projects

export const getProjects = () => api.get("/projects/");
export const getProjectBySlug = (slug) => api.get(`/projects/${slug}/`);
export const createProject = (data) => api.post("/projects/", data);
export const updateProject = (slug, data) => api.patch(`/projects/${slug}/`, data);
export const deleteProject = (slug) => api.delete(`/projects/${slug}/`);
export const uploadProjectImages = (slug, formData) =>
  api.post(`/projects/${slug}/upload-images/`, formData);
export const deleteProjectImage = (imageId) => api.delete(`/project-images/${imageId}/`);

// Services
export const getServices = () => api.get("/services/");

// Categories
export const getCategories = () => api.get("/categories/");

// Enquiries
export const submitEnquiry = (data) => api.post("/enquiries/", data);
export const getEnquiries = () => api.get("/enquiries/");
export const updateEnquiryStatus = (id, status) => api.patch(`/enquiries/${id}/`, { status });

// Auth
export const loginRequest = (username, password) =>
  api.post("/auth/login/", { username, password });

export default api;