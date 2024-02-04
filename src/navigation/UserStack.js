import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, Entypo, FontAwesome} from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomePage, Map, HistoryPage, Profile } from '../screens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#D9D9D9',
        },
      }}
    >
      <Tab.Screen
        name='HomePage'
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign name="home" size={24} color={focused ? 'tomato' : 'black'} />
          ),
        }}
      />

      <Tab.Screen
        name='HistoryPage'
        component={HistoryPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="history" size={24} color={focused ? 'tomato' : 'black'} />
          ),
        }}
      />

      <Tab.Screen
        name='Map'
        component={Map}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="map" size={24} color={focused ? 'tomato' : 'black'} />
          ),
        }}
      />

      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign name="user" size={24} color={focused ? 'tomato' : 'black'} />
          ),
        }}
      />

      {/* <Tab.Screen
        name='HistoryPage'
        component={HistoryPage}
        options={{ tabBarButton: () => null }}
      /> */}
    </Tab.Navigator>
  );
};

export default UserStack;
