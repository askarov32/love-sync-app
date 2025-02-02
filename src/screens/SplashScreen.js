import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { Svg, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  const scale = new Animated.Value(0.1);
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
      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <Svg width="150" height="150" viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 21s-6-4.35-10-9c-2.4-2.7-2-6.5 1-8.5 2.5-1.6 5.6-0.9 7 1.5 1.4-2.4 4.5-3.1 7-1.5 3 2 3.4 5.8 1 8.5-4 4.65-10 9-10 9z"
            fill="#FF6B81"
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
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6B81",
    position: "absolute",
    bottom: 80,
  },
});

export default SplashScreen;
