import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, STYLES } from "../theme";

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

        const response = await axios.get("http://192.168.31.105:8080/api/auth/profile", {
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
    <View style={STYLES.container}>
      {user ? (
        <View style={STYLES.card}>
          <Text style={styles.title}>Профиль</Text>
          <Text>Email: {user.email}</Text>
          <Text>Имя: {user.name}</Text>

          <Button title="Выйти" onPress={async () => {
            await AsyncStorage.removeItem("authToken");
            navigation.navigate("Login");
          }} />
        </View>
      ) : (
        <Text>Загрузка...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 15,
  },
});

export default ProfileScreen;
