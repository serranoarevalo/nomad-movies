import React from "react";
import { createStackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import DetailScreen from "../screens/DetailScreen";
import { HeaderStyles } from "../config";

export default createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: { header: null }
    },
    Detail: {
      screen: DetailScreen
    }
  },
  {
    navigationOptions: {
      ...HeaderStyles
    }
  }
);
