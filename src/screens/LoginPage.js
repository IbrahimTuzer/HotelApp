import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { login, autoLogin } from '../redux/userSlice';
import MyButton from '../components/MyButton';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [handleErrorMessage, setHandleErrorMessage] = useState('');

  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    const trueEmail = 'Firebase: Error (auth/invalid-email)';
    setHandleErrorMessage(trueEmail === errorMessage ? 'Invalid Email or Password! Try Again' : errorMessage);
  }, [errorMessage]);

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  // useEffect(() => {
  //   dispatch(autoLogin());
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.backIconContainer}>
          <Pressable
            style={({ pressed }) => [{ transform: [{ translateX: pressed ? -5 : 0 }] }]}
            onPress={() => navigation.navigate('WelcomePage')}>
            <Ionicons name="arrow-back" size={36} color="black" />
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="black"
            onChangeText={(text) => setEmail(text.toLowerCase())}
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

        <MyButton
            title='Login'
            handleButton={handleLogin}
           />

           <Pressable style={styles.TextButton} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.Text}>Forgot Password</Text>
           </Pressable>

          <Pressable style={styles.TextButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.Text}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIconContainer: {
    flex: 1,
    width: '95%',
  },
  inputContainer: {
    flex: 3,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    width: '100%',
    textAlign: 'center',
    marginVertical: 15,
    paddingVertical: 15,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
  },
  errorMessageContainer: {
    width: '95%',
    marginVertical: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A20040',
  },
  buttonContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextButton: {
    paddingTop: 10,
  },
   Text: {
    fontSize: 16,
  },
});

export default LoginPage;
