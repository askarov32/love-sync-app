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
import SvgHeadphones from "../../assets/svgs/SvgHeadphones";
import SvgGuitar from "../../assets/svgs/SvgGuitar";
import SvgCamera from "../../assets/svgs/SvgCamera";
import SvgBasketball from "../../assets/svgs/SvgBasketball";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const translateY = new Animated.Value(0);
  const translateYBottom = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

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

  const handleLogin = async () => {
    if (!email || !password) {
        Alert.alert("Ошибка", "Введите email и пароль");
        return;
    }

    try {
        const response = await axios.post(
            "http://192.168.31.105:8080/api/auth/login",
            { email, password }
        );

        const token = response.data.token;
        console.log("Полученный JWT:", token);

        if (!token) {
            Alert.alert("Ошибка", "Сервер не вернул токен.");
            return;
        }

        await AsyncStorage.setItem("authToken", `Bearer ${token}`);
        Alert.alert("Успешный вход", "Вы вошли в систему!");
        navigation.navigate("Profile");
    } catch (error) {
        let errorMessage = "Ошибка входа";
        if (error.response) {
            errorMessage = `Ошибка ${error.response.status}: ${error.response.data}`;
        } else {
            errorMessage = "Сервер не отвечает. Проверьте подключение.";
        }
        console.log("Ошибка входа:", errorMessage);
        Alert.alert("Ошибка", errorMessage);
    }
  };

  return (
    <LinearGradient colors={["#1E1E2E", "#141414"]} style={styles.container}>
      <Animated.View style={[styles.svgTopLeft, { transform: [{ translateY }] }]}>
        <SvgHeadphones width={80} height={80} />
      </Animated.View>
      <Animated.View style={[styles.svgTopRight, { transform: [{ translateY }] }]}>
        <SvgCamera width={60} height={60} />
      </Animated.View>

      <Text style={styles.title}>LoveSync</Text>

      <View style={styles.card}>
        <TextInput
          label="Your Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          theme={{
            colors: {
              primary: "rgb(255, 255, 255)",
              text: "rgb(0, 0, 0)",
              placeholder: "rgb(240, 240, 240)",
              outline: "transparent",
            },
          }}
        />
        <TextInput
          label="Your Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          theme={{
            colors: {
              primary: "rgb(255, 255, 255)",
              text: "rgb(255, 255, 255)",
              placeholder: "rgb(252, 252, 252)",
              outline: "transparent",
            },
          }}
        />
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Log in
        </Button>

        <Animated.View style={[styles.svgBottomLeft, { transform: [{ translateY: translateYBottom }] }]}>
          <SvgBasketball width={50} height={50} />
        </Animated.View>
        <Animated.View style={[styles.svgBottomRight, { transform: [{ translateY: translateYBottom }] }]}>
          <SvgGuitar width={50} height={50} />
        </Animated.View>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>
            Don't have an account? <Text style={styles.boldLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
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
  input: {
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.91)",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#E63946",
  },
  link: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#ddd",
  },
  boldLink: {
    fontWeight: "bold",
    color: "#E63946",
  },
  svgTopLeft: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  svgTopRight: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  svgBottomLeft: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  svgBottomRight: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default LoginScreen;
