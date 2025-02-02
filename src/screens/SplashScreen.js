import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { Svg, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  // Анимационные значения
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
    ]).start(() => {
      setTimeout(() => {
        navigation.replace("Login");
      }, 2500);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* SVG-сердце с исправленной формой */}
      <Animated.View style={[styles.heartWrapper, { transform: [{ scale }], opacity }]}>
        <Svg width="150" height="150" viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 21C11.7 21 6 16.9 3 13.2C0.5 10.2 1 6.5 3.8 4.4C6 2.8 9.3 3.2 11 5.5C12.7 3.2 16 2.8 18.2 4.4C21 6.5 21.5 10.2 19 13.2C16 16.9 12.3 21 12 21Z"
            fill="#FF6B81"
            stroke="#FF6B81"
            strokeWidth="1"
            strokeLinejoin="round" // Делаем края плавными
          />
        </Svg>
      </Animated.View>

      <Animated.Text style={[styles.text, { opacity }]}>Love Sync</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  heartWrapper: {
    alignSelf: "center",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6B81",
    position: "absolute",
    bottom: 60,
  },
});

export default SplashScreen;
