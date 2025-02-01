import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import { COLORS, STYLES } from "../theme";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert("Ошибка", "Все поля должны быть заполнены");
      return;
    }

    try {
      const response = await axios.post("http://192.168.31.105:8080/api/auth/register", {
        email,
        password,
        name,
      });

      Alert.alert("Успех", "Вы зарегистрированы!");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Ошибка регистрации:", error);

      let errorMessage = "Не удалось зарегистрироваться";
      if (error.response) {
        errorMessage = `Ошибка ${error.response.status}: ${error.response.data}`;
      } else if (error.request) {
        errorMessage = "Сервер не отвечает. Проверьте подключение.";
      } else {
        errorMessage = error.message;
      }

      Alert.alert("Ошибка регистрации", errorMessage);
    }
  };

  return (
    <View style={STYLES.container}>
      <View style={STYLES.card}>
        <Text style={styles.title}>Регистрация</Text>

        <TextInput
          label="Имя"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={STYLES.input}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          style={STYLES.input}
        />
        <TextInput
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={STYLES.input}
        />

        <Button mode="contained" onPress={handleRegister} style={STYLES.button}>
          Зарегистрироваться
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Уже есть аккаунт? Войти</Text>
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

export default RegisterScreen;
