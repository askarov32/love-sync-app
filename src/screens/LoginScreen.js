import React, { useState, useContext, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Animated } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";
import SvgHeadphones from "../../assets/svgs/SvgHeadphones";
import SvgCamera from "../../assets/svgs/SvgCamera";
import SvgBasketball from "../../assets/svgs/SvgBasketball";
import SvgGuitar from "../../assets/svgs/SvgGuitar";
import SvgWarning from "../../assets/svgs/SvgWarning";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const translateY = useRef(new Animated.Value(0)).current;
  const translateYBottom = useRef(new Animated.Value(0)).current;
  const errorShake = useRef(new Animated.Value(0)).current; // <== Для анимации ошибки

  useEffect(() => {
    const startAnimation = (animatedValue, toValue, duration) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, { toValue, duration, useNativeDriver: true }),
          Animated.timing(animatedValue, { toValue: 0, duration, useNativeDriver: true }),
        ])
      ).start();
    };

    startAnimation(translateY, 10, 1500);
    startAnimation(translateYBottom, 8, 1800);
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Введите email и пароль");
      startErrorAnimation(); 
      return;
    }

    try {
      setError("");
      await login(email, password);
      navigation.replace("Profile");
    } catch (error) {
      setError("Неверный email или пароль");
      startErrorAnimation(); // <== Анимация при ошибке
    }
  };

  // Функция анимации ошибки (эффект дрожания)
  const startErrorAnimation = () => {
    Animated.sequence([
      Animated.timing(errorShake, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(errorShake, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(errorShake, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(errorShake, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
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
        {/* Поля ввода */}
        <TextInput label="Your Email" value={email} onChangeText={setEmail} mode="outlined" style={styles.input} />
        <TextInput label="Your Password" value={password} onChangeText={setPassword} secureTextEntry mode="outlined" style={styles.input} />

        {/* Анимированная SVG ошибки */}
        {error ? (
          <Animated.View style={[styles.errorContainer, { transform: [{ translateX: errorShake }] }]}>
            <SvgWarning width={24} height={24} color="#E63946" />
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        ) : null}

        {/* Кнопка логина */}
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Log in
        </Button>

        {/* Нижние SVG иконки */}
        <Animated.View style={[styles.svgBottomLeft, { transform: [{ translateY: translateYBottom }] }]}>
          <SvgBasketball width={50} height={50} />
        </Animated.View>
        <Animated.View style={[styles.svgBottomRight, { transform: [{ translateY: translateYBottom }] }]}>
          <SvgGuitar width={50} height={50} />
        </Animated.View>

        {/* Ссылка на регистрацию */}
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
  input: { marginBottom: 15, backgroundColor: "rgba(255, 255, 255, 0.91)" },
  button: { marginTop: 10, backgroundColor: "#E63946" },
  link: { textAlign: "center", marginTop: 10, fontSize: 14, color: "#ddd" },
  boldLink: { fontWeight: "bold", color: "#E63946" },
  errorContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  errorText: { color: "#E63946", marginLeft: 5 },
  svgTopLeft: { position: "absolute", top: 50, left: 20 },
  svgTopRight: { position: "absolute", top: 50, right: 20 },
  svgBottomLeft: { 
    position: "absolute", 
    bottom: -220,
    left: -20 
  },
  svgBottomRight: { 
    position: "absolute", 
    bottom: -220,
    right: -10 
  },
});

export default LoginScreen;
