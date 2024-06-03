import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Feather,
  Octicons,
} from "@expo/vector-icons";

import {
  HomePage,
  Map,
  HistoryPage,
  Profile,
  Detail,
  Reservation,
  AdminDashboard,
  UploadImage,
} from "../screens";
import ReservationListAdmin from "../screens/ReservationListAdmin";
import AddHotel from "../screens/AddHotel";

const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#D9D9D9",
        },
      }}
    >
      <Tab.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="idcard"
              size={focused ? 30 : 24}
              color={focused ? "#0C6968" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ReservationList"
        component={ReservationListAdmin}
        options={{
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="list-ordered"
              size={focused ? 30 : 24}
              color={focused ? "#0C6968" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UploadImage"
        component={UploadImage}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="camera"
              size={focused ? 30 : 24}
              color={focused ? "#0C6968" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={focused ? 30 : 24}
              color={focused ? "#0C6968" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddHotel"
        component={AddHotel}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
};

export default AdminTabNavigator;
