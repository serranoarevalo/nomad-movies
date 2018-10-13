import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import TVScreen from "../screens/TVScreen";
import TabBarIcon from "../components/TabBarIcon";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Movies",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-film` : "md-film"}
    />
  )
};

const TVStack = createStackNavigator({
  TV: TVScreen
});

TVStack.navigationOptions = {
  tabBarLabel: "TV",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-tv" : "md-tv"}
    />
  )
};

const SearchStack = createStackNavigator({
  Search: SearchScreen
});

SearchStack.navigationOptions = {
  tabBarLabel: "Search",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-search` : "md-search"}
    />
  )
};

export default createBottomTabNavigator(
  {
    HomeStack,
    TVStack,
    SearchStack
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#2c3e50"
      },
      activeTintColor: "white",
      inactiveTintColor: "#7f8c8d"
    }
  }
);
