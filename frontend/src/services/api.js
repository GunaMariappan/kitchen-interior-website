import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Designs
export const getDesigns = () => api.get("/designs/");
export const getDesignBySlug = (slug) => api.get(`/designs/${slug}/`);

// Projects
export const getProjects = () => api.get("/projects/");
export const getProjectBySlug = (slug) => api.get(`/projects/${slug}/`);

// Services
export const getServices = () => api.get("/services/");

// Categories
export const getCategories = () => api.get("/categories/");

// Enquiries
export const submitEnquiry = (data) => api.post("/enquiries/", data);

export default api;