import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Path } from "react-native-svg";

const SplashScreen = () => {
  const navigation = useNavigation();

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
      <Animated.View style={[styles.heartWrapper, { transform: [{ scale }], opacity }]}>
        <Svg width="160" height="160" viewBox="0 0 24 24">
          <G transform="translate(0 -1028.4)">
            <Path
              d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
              fill="#FF6B81"
            />
          </G>
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
