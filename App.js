import React from "react";
import { StyleSheet, StatusBar, Platform } from "react-native";
import { AppLoading, Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import AppNavigation from "./navigation/AppNavigation";
import { BG_COLOR } from "./colors";

export default class App extends React.Component {
  state = {
    loadCompleted: false
  };
  render() {
    const { loadCompleted } = this.state;
    if (loadCompleted) {
      return (
        <React.Fragment>
          {Platform.OS === "ios" && <StatusBar barStyle={"light-content"} />}
          <AppNavigation />
        </React.Fragment>
      );
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
        ...Ionicons.font
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
    backgroundColor: BG_COLOR,
    alignItems: "center",
    justifyContent: "center"
  }
});
