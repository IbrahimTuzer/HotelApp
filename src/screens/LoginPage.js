import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { login, autoLogin } from "../redux/userSlice";
import MyButton from "../components/MyButton";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handleErrorMessage, setHandleErrorMessage] = useState("");

  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    const trueEmail = "Firebase: Error (auth/invalid-email)";
    setHandleErrorMessage(
      trueEmail === errorMessage
        ? "Invalid Email or Password! Try Again"
        : errorMessage
    );
  }, [errorMessage]);

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.backIconContainer}>
          <Pressable
            style={({ pressed }) => [
              { transform: [{ translateX: pressed ? -5 : 0 }] },
            ]}
            onPress={() => navigation.navigate("WelcomePage")}
          >
            <Ionicons name="arrow-back" size={36} color="black" />
          </Pressable>
        </View>
        <Image
          style={styles.logoImage}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/images%2Fhotel_findr_logo.png?alt=media&token=f90f0d66-4ba5-49fa-a559-92486516ac24",
          }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor="black"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="black"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>

        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorText}>{handleErrorMessage}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <MyButton title="Login" handleButton={handleLogin} />

          <Pressable
            style={styles.TextButton}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.Text}>Forgot Password</Text>
          </Pressable>

          <Pressable
            style={styles.TextButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.Text}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerKeyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0C6968",
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  backIconContainer: {
    flex: 1,
    width: "95%",
  },
  logoImage: {
    // position: "absolute",
    top: 100,
    width: 350,
    height: 96,
    resizeMode: "cover",
  },
  inputContainer: {
    flex: 3,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  inputText: {
    width: "100%",
    height: 50,
    textAlign: "center",
    marginVertical: 15,
    paddingVertical: 15,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
  },
  errorMessageContainer: {
    width: "95%",
    position: "relative",
    bottom: 70,
    marginVertical: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F33",
  },
  buttonContainer: {
    flex: 2,
    width: "100%",
    position: "relative",
    bottom: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  TextButton: {
    paddingTop: 10,
  },
  Text: {
    fontSize: 16,
    color: "white",
  },
});

export default LoginPage;
