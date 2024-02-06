import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';

import { HomePage, Map, HistoryPage, Profile, Detail, Reservation } from '../screens';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
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
            <AntDesign name="home" size={focused ? 30 : 24} color={focused ? '#0C6968' : 'black'} />
          ),
        }}
      />

      <Tab.Screen
        name='HistoryPage'
        component={HistoryPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="history" size={focused ? 32 : 26} color={focused ? '#0C6968' : 'black'} />
          ),
        }}
      />

      <Tab.Screen
        name='Map'
        component={Map}
        options={{
          tabBarIcon: ({ focused }) => (
            < Feather name="map-pin" size={focused ? 30 : 24} color={focused ? '#0C6968' : 'black'} />
          ),
        }}
      />

      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign name="user" size={focused ? 30 : 24} color={focused ? '#0C6968' : 'black'} />
          ),
        }}
      />

        <Tab.Screen name='Detail'
                  component={Detail}
                  options={{ tabBarButton: () => null }}/>
      


      <Tab.Screen name='Reservation'
                  component={Reservation}
                  options={{ tabBarButton: () => null }}/>




    </Tab.Navigator>
  );
};

export default MainTabNavigator;
