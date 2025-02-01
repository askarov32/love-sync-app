import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, STYLES } from "../theme";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Ошибка", "Введите email и пароль");
      return;
    }

    try {
      const response = await axios.post("http://192.168.31.105:8080/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      await AsyncStorage.setItem("authToken", token);

      Alert.alert("Успешный вход", "Вы вошли в систему!");
      navigation.navigate("Profile", { token });
    } catch (error) {
      console.log("Ошибка входа:", error);
      let errorMessage = "Ошибка входа";

      if (error.response) {
        errorMessage = `Ошибка ${error.response.status}: ${error.response.data}`;
      } else if (error.request) {
        errorMessage = "Сервер не отвечает. Проверьте подключение.";
      } else {
        errorMessage = error.message;
      }

      Alert.alert("Ошибка", errorMessage);
    }
  };

  return (
    <View style={STYLES.container}>
      <View style={STYLES.card}>
        <Text style={styles.title}>Войти</Text>

        <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" style={STYLES.input} />
        <TextInput label="Пароль" value={password} onChangeText={setPassword} secureTextEntry mode="outlined" style={STYLES.input} />

        <Button mode="contained" onPress={handleLogin} style={STYLES.button}>
          Войти
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Нет аккаунта? Регистрация</Text>
        </TouchableOpacity>
      </View>
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
  link: {
    color: COLORS.primary,
    marginTop: 10,
  },
});

export default LoginScreen;
