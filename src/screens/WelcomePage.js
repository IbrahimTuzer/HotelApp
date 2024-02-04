import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import MyButton from "../components/MyButton";

const WelcomePage = ({ navigation }) => {
  const onLoginPress = () => {
    navigation.navigate("LoginPage");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.hotelImage}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/images%2Fhotel_text.png?alt=media&token=050317ae-7b31-4f09-854a-e71e9f52cace",
        }}
      />
      <Image
        style={styles.fındrImage}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/images%2Ff%C4%B1ndr_text.png?alt=media&token=1b7f7039-b4ec-40f0-be2b-f46c72c7f103",
        }}
      />
      <Image
        style={styles.bageModelImage}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/images%2Fwelcome_page_bage_model.png?alt=media&token=33e86ae9-89a8-4dd9-8ee9-0b7962dc8da6",
        }}
      />

      <Text style={styles.welcomeText}>Hoş Geldiniz!</Text>
      <View style={styles.buttonContainer}>
        <MyButton title="Go on !" handleButton={onLoginPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C6968",
  },
  welcomeText: {
    position: "absolute",
    bottom: 150,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    alignItems: "center",
    color: "#F3B456",
  },

  hotelImage: {
    position: "absolute",
    top: 80,
    right: 90,
    width: 230,
    height: 80,
    resizeMode: "cover",
  },
  fındrImage: {
    position: "absolute",
    top: 115,
    left: 90,
    width: 210,
    height: 95,
    resizeMode: "cover",
  },
  bageModelImage: {
    position: "absolute",
    top: 165,
    right: 30,
    width: 300,
    height: 350,
    resizeMode: "cover",
    zIndex: -1,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
});

export default WelcomePage;
