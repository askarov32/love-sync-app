import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = new Animated.Value(0);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          throw new Error("Токен не найден.");
        }

        const response = await axios.get("http://192.168.31.105:8080/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setInterests(response.data.interests || []);
      } catch (error) {
        console.log("Ошибка загрузки профиля:", error.message);
      } finally {
        setLoading(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    };

    fetchUserData();
  }, []);

  return (
    <LinearGradient colors={["#1E1E2E", "#141414"]} style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#E63946" />
      ) : (
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Привет, {user ? user.name : "гость"} 👋</Text>
          <Text style={styles.subtitle}>Твои любимые вещи:</Text>

          {interests.length > 0 ? (
            <FlatList
              data={interests}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.cardText}>{item}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noDataText}>Нет данных о любимых вещах 😔</Text>
          )}
        </Animated.View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: { alignItems: "center", width: "90%" },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  subtitle: { fontSize: 18, color: "#bbb", marginBottom: 10 },
  card: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },
  cardText: { fontSize: 16, color: "#fff" },
  noDataText: { fontSize: 16, color: "#888", marginTop: 20 },
});

export default HomeScreen;
