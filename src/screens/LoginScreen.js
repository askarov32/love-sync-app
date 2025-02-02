import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      let errorMessage = "Ошибка входа";
      if (error.response) {
        errorMessage = `Ошибка ${error.response.status}: ${error.response.data}`;
      } else {
        errorMessage = "Сервер не отвечает. Проверьте подключение.";
      }

      Alert.alert("Ошибка", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoveSync</Text>

      <View style={styles.card}>
        <TextInput label="Your Email" value={email} onChangeText={setEmail} mode="outlined" style={styles.input} />
        <TextInput label="Your Password" value={password} onChangeText={setPassword} secureTextEntry mode="outlined" style={styles.input} />

        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Log in
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Already have an account? <Text style={styles.boldLink}>Sign in</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
  },
  card: {
    width: "85%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#F8F8F8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#000",
  },
  link: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  boldLink: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default LoginScreen;
