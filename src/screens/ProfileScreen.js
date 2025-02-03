import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          Alert.alert("Ошибка", "Токен не найден, войдите снова.");
          navigation.navigate("Login");
          return;
        }

        const response = await axios.get("http://172.20.10.2:8080/api/auth/profile", {
          headers: { Authorization: token },
        });

        setUser(response.data);
      } catch (error) {
        Alert.alert("Ошибка", "Не удалось загрузить профиль");
        navigation.navigate("Login");
      }
    };

    fetchProfile();
  }, []);

  return (
    <LinearGradient colors={["#1E1E2E", "#141414"]} style={styles.container}>
      {user ? (
        <View style={styles.card}>
          <Text style={styles.title}>Профиль</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>Имя: {user.name}</Text>

          <Button title="Выйти" onPress={async () => {
            await AsyncStorage.removeItem("authToken");
            navigation.navigate("Login");
          }} />
        </View>
      ) : (
        <Text style={styles.text}>Загрузка...</Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: "85%",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 15 },
  text: { fontSize: 16, color: "#ddd", marginBottom: 10 },
});

export default ProfileScreen;
