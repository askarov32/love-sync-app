import React, { useState, useContext, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert, Animated } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";
import SvgLoveLetter from "../../assets/svgs/SvgLoveLetter";
import SvgBear from "../../assets/svgs/SvgBear";
import SvgVinil from "../../assets/svgs/SvgVinil";
import SvgRose from "../../assets/svgs/SvgRose";

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const translateY = useRef(new Animated.Value(0)).current;
  const translateYBottom = useRef(new Animated.Value(0)).current;

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
      Alert.alert("Ошибка", "Все поля должны быть заполнены");
      return;
    }

    try {
      await register(email, password, name);
      Alert.alert("Успех", "Вы зарегистрированы!");
    } catch (error) {
      Alert.alert("Ошибка", error);
    }
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
        <TextInput label="Your Email" value={email} onChangeText={setEmail} mode="outlined" keyboardType="email-address" style={styles.input} />
        <TextInput label="Your Password" value={password} onChangeText={setPassword} secureTextEntry mode="outlined" style={styles.input} />
        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Sign Up
        </Button>

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
  input: { marginBottom: 15, backgroundColor: "rgba(255, 255, 255, 0.05)" },
  button: { marginTop: 10, backgroundColor: "#E63946" },
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
});

export default RegisterScreen;
