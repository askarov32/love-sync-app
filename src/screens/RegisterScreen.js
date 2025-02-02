import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";

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
      await axios.post("http://192.168.31.105:8080/api/auth/register", {
        email,
        password,
        name,
      });

      Alert.alert("Успех", "Вы зарегистрированы!");
      navigation.navigate("Login");
    } catch (error) {
      let errorMessage = "Не удалось зарегистрироваться";
      if (error.response) {
        errorMessage = `Ошибка ${error.response.status}: ${error.response.data}`;
      } else {
        errorMessage = "Сервер не отвечает. Проверьте подключение.";
      }

      Alert.alert("Ошибка регистрации", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput label="Name" value={name} onChangeText={setName} mode="outlined" style={styles.input} />
        <TextInput label="Surname (Optional)" mode="outlined" style={styles.input} />
        <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" keyboardType="email-address" style={styles.input} />
        <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry mode="outlined" style={styles.input} />

        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Sign Up
        </Button>

        <Text style={styles.terms}>
          By registering you agree to our{" "}
          <Text style={styles.termsHighlight}>Terms of Use</Text> and{" "}
          <Text style={styles.termsHighlight}>Privacy Policy</Text>
        </Text>
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
  terms: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 10,
    color: "#666",
  },
  termsHighlight: {
    color: "red",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
