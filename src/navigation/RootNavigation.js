import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import AdminStack from "./AdminStack";

const RootNavigation = () => {
  const { isAuth, isAdmin } = useSelector((state) => state.user);
  useEffect(() => {
    console.log("isAuth", isAuth);
    console.log("isAdmin", isAdmin);
  }, [isAuth, isAdmin]);

  let Stack;
  if (!isAuth) {
    Stack = AuthStack;
  } else if (isAdmin) {
    Stack = AdminStack;
  } else {
    Stack = UserStack;
  }

  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
};

export default RootNavigation;
