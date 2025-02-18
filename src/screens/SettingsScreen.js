import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";

const SettingsScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUsername(parsedUser.name || "");
        }
      } catch (error) {
        console.log("Ошибка загрузки данных пользователя:", error);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Выход", "Вы уверены, что хотите выйти?", [
      { text: "Отмена", style: "cancel" },
      {
        text: "Да",
        onPress: async () => {
          await logout();
          navigation.replace("Login");
        },
      },
    ]);
  };

  const handleUsernameChange = async (newName) => {
    setUsername(newName);
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      parsedUser.name = newName;
      await AsyncStorage.setItem("user", JSON.stringify(parsedUser));
    }
  };

  return (
    <LinearGradient colors={["#1E1E2E", "#141414"]} style={styles.container}>
      <Text style={styles.title}>Настройки</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Имя пользователя:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={handleUsernameChange}
          placeholder="Введите новое имя"
          placeholderTextColor="#bbb"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Темная тема</Text>
        <Switch value={isDarkTheme} onValueChange={() => setIsDarkTheme(!isDarkTheme)} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Выйти из аккаунта</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  card: {
    width: "85%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 15,
  },
  label: { fontSize: 16, color: "#fff", marginBottom: 5 },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#E63946",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default SettingsScreen;
