import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Animated, Easing, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";
import Svg, { G, Path } from "react-native-svg";

const SplashScreen = () => {
  const navigation = useNavigation();
  const { user, loading } = useContext(AuthContext);

  const scale = new Animated.Value(0.5);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 1500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(scale, {
        toValue: 1,
        duration: 800,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    const checkAuth = async () => {
      setTimeout(() => {
        if (!loading) {
          navigation.replace(user ? "Profile" : "Login");
        }
      }, 2500);
    };

    checkAuth();
  }, [user, loading]);

  return (
    <LinearGradient colors={["#1E1E2E", "#141414"]} style={styles.container}>
      <Animated.View style={[styles.heartWrapper, { transform: [{ scale }], opacity }]}>
        <Svg width="160" height="160" viewBox="0 0 24 24">
          <G transform="translate(0 -1028.4)">
            <Path
              d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
              fill="#E63946"
            />
          </G>
        </Svg>
      </Animated.View>

      <Animated.Text style={[styles.text, { opacity }]}>LoveSync</Animated.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartWrapper: {
    alignSelf: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E63946",
    marginTop: 20,
  },
});

export default SplashScreen;
