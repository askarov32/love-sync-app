import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          Alert.alert("Ошибка", "Токен не найден, войдите снова.");
          navigation.navigate("Login");
          return;
        }

        const response = await axios.get("http://192.168.31.105:8080/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setProfileImage(response.data.profileImage);
      } catch (error) {
        console.log("Ошибка получения профиля:", error.response?.data || error.message);
        Alert.alert("Ошибка", "Не удалось загрузить профиль");
        navigation.navigate("Login");
      }
    };

    fetchProfile();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await uploadImage(uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        console.log("Отправляемый токен:", token);

        if (!token) {
            Alert.alert("Ошибка", "Токен не найден.");
            return;
        }

        let formData = new FormData();
        formData.append("file", {
            uri,
            name: "profile.jpg",
            type: "image/jpeg",
        });

        const response = await axios.put(
            `http://192.168.31.105:8080/api/profile/${user.id}/upload`,
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        setProfileImage(response.data.profileImage);
        Alert.alert("Успех", "Фото успешно загружено!");
    } catch (error) {
        console.log("Ошибка загрузки изображения:", error.response?.data || error.message);
        Alert.alert("Ошибка", "Не удалось загрузить фото");
    }
  };

  return (
    <LinearGradient colors={["#1E1E2E", "#141414"]} style={styles.container}>
      {user ? (
        <View style={styles.card}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            <Image
              source={profileImage ? { uri: profileImage } : require("../../assets/placeholder.png")}
              style={styles.profileImage}
            />
            <Text style={styles.changePhotoText}>Изменить фото</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{user.name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          {user.bio && <Text style={styles.text}>Bio: {user.bio}</Text>}
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
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoText: {
    color: "#E63946",
    fontSize: 14,
    marginTop: 5,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  text: { fontSize: 16, color: "#ddd", marginBottom: 10 },
});

export default ProfileScreen;
