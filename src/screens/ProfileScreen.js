import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import SvgSettings from "../../assets/svgs/SvgSettings";
import SvgNotifications from "../../assets/svgs/SvgNotifications";
import SvgHelp from "../../assets/svgs/SvgHelp";
import SvgFeedback from "../../assets/svgs/SvgFeedback";

const ProfileScreen = () => {
  const { user, logout } = React.useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#1E1E2E", "#141414"]} style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileName}>{user?.name || "User"}</Text>
        <Text style={styles.profileEmail}>{user?.email || "email@example.com"}</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem icon={<SvgSettings width={24} height={24} />} text="Settings" onPress={() => navigation.navigate("Settings")} />
        <MenuItem icon={<SvgNotifications width={24} height={24} />} text="Notifications" onPress={() => navigation.navigate("Notifications")} />
        <MenuItem icon={<SvgHelp width={24} height={24} />} text="Help Center" onPress={() => navigation.navigate("HelpCenter")} />
        <MenuItem icon={<SvgFeedback width={24} height={24} />} text="Give us feedback" onPress={() => navigation.navigate("Feedback")} />
      </View>

      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const MenuItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    {icon}
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  profileHeader: { alignItems: "center", marginBottom: 30 },
  profileName: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  profileEmail: { fontSize: 14, color: "#bbb" },
  menuContainer: { borderTopWidth: 1, borderColor: "#444", paddingTop: 20 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 15 },
  menuText: { color: "#fff", fontSize: 16, marginLeft: 10 },
  logoutButton: { marginTop: 20, alignItems: "center" },
  logoutText: { color: "#E63946", fontSize: 16, fontWeight: "bold" },
});

export default ProfileScreen;
