import React, { useState, useContext, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Animated, ActivityIndicator } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";
import SvgLoveLetter from "../../assets/svgs/SvgLoveLetter";
import SvgBear from "../../assets/svgs/SvgBear";
import SvgVinil from "../../assets/svgs/SvgVinil";
import SvgRose from "../../assets/svgs/SvgRose";
import SvgWarning from "../../assets/svgs/SvgWarning";

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Добавляем состояние загрузки

  const translateY = useRef(new Animated.Value(0)).current;
  const translateYBottom = useRef(new Animated.Value(0)).current;
  const errorShake = useRef(new Animated.Value(0)).current;
  const svgScale = useRef(new Animated.Value(1)).current;

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

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError("Все поля должны быть заполнены");
      startErrorAnimation();
      return;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      startErrorAnimation();
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      startErrorAnimation();
      return;
    }

    setError("");
    setLoading(true); // ✅ Включаем загрузку

    try {
      await register(email, password, name);
      navigation.replace("Profile");
    } catch (error) {
      setError("Ошибка регистрации. Попробуйте позже.");
      startErrorAnimation();
    } finally {
      setLoading(false); // ✅ Выключаем загрузку
    }
  };

  const startErrorAnimation = () => {
    Animated.sequence([
      Animated.timing(errorShake, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(errorShake, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(errorShake, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(errorShake, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();

    Animated.sequence([
      Animated.timing(svgScale, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.timing(svgScale, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Введите корректный email \n(example@mail.com)";
    }
    return "";
  };

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUppercase = /[A-Z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) {
      return "Пароль должен содержать минимум 8 символов";
    }
    if (!hasUppercase.test(password)) {
      return "Пароль должен содержать хотя \nбы одну заглавную букву";
    }
    if (!hasNumber.test(password)) {
      return "Пароль должен содержать хотя \nбы одну цифру";
    }
    if (!hasSpecialChar.test(password)) {
      return "Пароль должен содержать хотя \nбы один спецсимвол (!@#$%^&*)";
    }
    return "";
  };

  return (
    <LinearGradient colors={["#1E1E2E", "#141414"]} style={styles.container}>
      <Animated.View style={[styles.svgTopLeft, { transform: [{ translateY }] }]}>
        <SvgVinil width={50} height={50} />
      </Animated.View>
      <Animated.View style={[styles.svgTopRight, { transform: [{ translateY }] }]}>
        <SvgRose width={40} height={40} />
      </Animated.View>

      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.card}>
        <TextInput label="Your Name" value={name} onChangeText={setName} mode="outlined" style={styles.input} />
        <TextInput label="Your Email" value={email} onChangeText={setEmail} mode="outlined" keyboardType="email-address" autoCapitalize="none" style={styles.input} />
        <TextInput label="Your Password" value={password} onChangeText={setPassword} secureTextEntry mode="outlined" style={styles.input} />

        {error ? (
          <Animated.View style={[styles.errorContainer, { transform: [{ translateX: errorShake }, { scale: svgScale }] }]}>
            <SvgWarning width={24} height={24} color="#E63946" />
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        ) : null}

        {/* ✅ Кнопка со спиннером */}
        {loading ? (
          <ActivityIndicator size="large" color="#E63946" />
        ) : (
          <Button mode="contained" onPress={handleRegister} style={styles.button} disabled={loading}>
            Sign Up
          </Button>
        )}

        <Animated.View style={[styles.svgBottomLeft, { transform: [{ translateY: translateYBottom }] }]}>
          <SvgLoveLetter width={40} height={40} />
        </Animated.View>
        <Animated.View style={[styles.svgBottomRight, { transform: [{ translateY: translateYBottom }] }]}>
          <SvgBear width={40} height={40} />
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
  input: { marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.91)" },
  button: { marginTop: 10, backgroundColor: "#E63946" },
  errorContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  link: { textAlign: "center", marginTop: 10, fontSize: 14, color: "#ddd" },
  boldLink: { fontWeight: "bold", color: "#E63946" },

  svgTopLeft: { position: "absolute", top: 50, left: 20 },
  svgTopRight: { position: "absolute", top: 50, right: 20 },

  svgBottomLeft: { 
    position: "absolute", 
    bottom: -210,
    left: -20 
  },
  svgBottomRight: { 
    position: "absolute", 
    bottom: -210,
    right: -10 
  },
  errorText: { color: "#E63946", marginLeft: 5 },
});

export default RegisterScreen;
