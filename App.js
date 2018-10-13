import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading, Font, Icon } from "expo";
import MainTabNavigator from "./navigation/MainTabNavigator";

export default class App extends React.Component {
  state = {
    loadCompleted: false
  };
  render() {
    const { loadCompleted } = this.state;
    if (loadCompleted) {
      return <MainTabNavigator />;
    } else {
      return (
        <AppLoading
          startAsync={this._loadAssets}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
  }
  _loadAssets = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ loadCompleted: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
