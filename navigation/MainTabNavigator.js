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
import { BG_COLOR, INACTIVE_COLOR, TINT_COLOR } from "../colors";
import { HeaderStyles } from "../config";

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Movies",
      ...HeaderStyles
    }
  }
});

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-film` : "md-film"}
    />
  )
};

const TVStack = createStackNavigator({
  TV: {
    screen: TVScreen,
    navigationOptions: {
      title: "TV",
      ...HeaderStyles
    }
  }
});

TVStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-tv" : "md-tv"}
    />
  )
};

const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      title: "Search",
      ...HeaderStyles
    }
  }
});

SearchStack.navigationOptions = {
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
      showLabel: false,
      style: {
        backgroundColor: BG_COLOR
      },
      activeTintColor: TINT_COLOR,
      inactiveTintColor: INACTIVE_COLOR
    }
  }
);
