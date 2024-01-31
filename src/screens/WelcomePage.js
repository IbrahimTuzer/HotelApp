import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const WelcomePage = ({ navigation }) => {
  
  const onLoginPress = () => {
    navigation.navigate('LoginPage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hoş Geldiniz!</Text>
      <Button title="Login" onPress={onLoginPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default WelcomePage;
