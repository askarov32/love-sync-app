import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "http://192.168.31.105:8080/api",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Ошибка при входе";
  }
};

export const registerUser = async (email, password, name) => {
  try {
    const response = await API.post("/auth/register", { email, password, name });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Ошибка при регистрации";
  }
};

export const fetchProfile = async () => {
  try {
    const response = await API.get("/auth/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Ошибка загрузки профиля";
  }
};

export const uploadProfileImage = async (userId, imageUri) => {
  try {
    let formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "profile.jpg",
      type: "image/jpeg",
    });

    const response = await API.put(`/profile/${userId}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || "Ошибка загрузки фото";
  }
};

export default API;
