import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Animated,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SvgBasketball from "../../assets/svgs/SvgBasketball";
import SvgGuitar from "../../assets/svgs/SvgGuitar";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const translateYBottom = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateYBottom, {
          toValue: 8,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(translateYBottom, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert("Ошибка", "Все поля должны быть заполнены");
      return;
    }

    try {
      await axios.post("http://172.20.10.2:8080/api/auth/register", {
        email,
        password,
        name,
      });

      Alert.alert("Успех", "Вы зарегистрированы!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Ошибка регистрации", "Не удалось зарегистрироваться");
    }
  };

  return (
    <LinearGradient colors={["#1E1E2E", "#141414"]} style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.card}>
        <TextInput
          label="Your Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { text: "#fff", placeholder: "#bbb", outline: "transparent" } }}
        />
        <TextInput
          label="Your Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
          theme={{ colors: { text: "#fff", placeholder: "#bbb", outline: "transparent" } }}
        />
        <TextInput
          label="Your Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          theme={{ colors: { text: "#fff", placeholder: "#bbb", outline: "transparent" } }}
        />

        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Sign Up
        </Button>

        <Animated.View style={[styles.svgBottomLeft, { transform: [{ translateY: translateYBottom }] }]}>
          <SvgBasketball width={50} height={50} />
        </Animated.View>
        <Animated.View style={[styles.svgBottomRight, { transform: [{ translateY: translateYBottom }] }]}>
          <SvgGuitar width={50} height={50} />
        </Animated.View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>
            Already have an account? <Text style={styles.boldLink}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 36, fontWeight: "bold", color: "#fff", marginBottom: 30 },
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
  input: { marginBottom: 15, backgroundColor: "rgba(255, 255, 255, 0.05)" },
  button: { marginTop: 10, backgroundColor: "#E63946" },
  link: { textAlign: "center", marginTop: 10, fontSize: 14, color: "#ddd" },
  boldLink: { fontWeight: "bold", color: "#E63946" },
  svgBottomLeft: { position: "absolute", bottom: 20, left: 20 },
  svgBottomRight: { position: "absolute", bottom: 20, right: 20 },
});

export default RegisterScreen;
