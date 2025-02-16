import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchProfile, loginUser, registerUser } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const userData = await fetchProfile();
          setUser(userData);
        }
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      console.log("📡 Отправка запроса на вход...");
      const { token } = await loginUser(email, password);

      if (!token) {
        throw new Error("⚠️ Сервер не вернул токен!");
      }

      await AsyncStorage.setItem("authToken", `Bearer ${token}`);
      console.log("✅ Токен сохранен, загружаем профиль...");

      const userData = await fetchProfile();
      console.log("✅ Профиль загружен:", userData);

      setUser(userData);
    } catch (error) {
      console.log("❌ Ошибка в login():", error);
      throw error;
    }
  };

  const register = async (email, password, name) => {
    try {
      const { token } = await registerUser(email, password, name);
      await AsyncStorage.setItem("authToken", `Bearer ${token}`);
      const userData = await fetchProfile();
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {console.log("🔍 AuthContext user:", user)}
      {children}
    </AuthContext.Provider>
  );
};
