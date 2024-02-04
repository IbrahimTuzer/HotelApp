import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {WelcomePage, LoginPage, SignUp, ForgotPassword} from "../screens/"

import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>

      <Stack.Screen name='WelcomePage' component={WelcomePage}/>
      <Stack.Screen name='LoginPage' component={LoginPage}/>
      <Stack.Screen name='SignUp' component={SignUp}/>
      <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>

    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})