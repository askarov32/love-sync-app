import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { fetchProfile, uploadProfileImage } from "../utils/api";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await fetchProfile();
        setUser(userData);
      } catch (error) {
        Alert.alert("Ошибка", error);
        navigation.navigate("Login");
      }
    };
    loadProfile();
  }, []);

  return (
    <LinearGradient colors={["#1E1E2E", "#141414"]} style={styles.container}>
      {user ? (
        <View style={styles.card}>
          <Text style={styles.title}>{user.name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Button title="Выйти" onPress={async () => {
            await AsyncStorage.removeItem("authToken");
            navigation.navigate("Login");
          }} />
        </View>
      ) : (
        <Text style={styles.text}>Загрузка...</Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  changePhotoText: {
    color: "#E63946",
    fontSize: 14,
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 10,
  },
});

export default ProfileScreen;
