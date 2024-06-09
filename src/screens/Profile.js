import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { logout } from "../redux/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.profileText}>PROFİLİM</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Kullanıcı Oturum Bilgisi</Text>
        <Text style={styles.email}>{user.email}</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
          <AntDesign name="logout" size={24} color="black" />
          <Text style={styles.signOutText}>Çıkış Yap</Text>
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          {/* İstediğiniz kadar ikon ekleyebilirsiniz */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#0C6968",
    paddingVertical: 20,
    alignItems: "center",
  },
  profileText: {
    color: "white",
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  signOutText: {
    marginLeft: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Profile;
