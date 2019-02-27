import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";

import { Provider } from "react-redux";
import store from "./store";

import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

import MapScreen from "./screens/MapScreen";
import DeckScreen from "./screens/DeckScreen";

import ReviewScreen from "./screens/ReviewScreen";
import SettingsScreen from "./screens/SettingsScreen";

const ReviewFlow = createStackNavigator(
  {
    review: ReviewScreen,
    settings: SettingsScreen
  },
  {
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#E43F3F",
      },
      headerTintColor: "#FFF"
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    map: MapScreen,
    deck: DeckScreen,
    review: {
      screen: ReviewFlow,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="favorite" size={25} color={tintColor} />;
        },
        title: "Review Jobs"
      }
    }
  },
  {
    tabBarOptions: {
      labelStyle: { fontSize: 13 },
      activeTintColor: "#E43F3F",
      style: {
        padding: 2,
        height: 60
      }
    }
  }
);

const MainNavigator = createSwitchNavigator(
  {
    welcome: WelcomeScreen,
    auth: AuthScreen,
    main: TabNavigator
  },
  { initialRouteName: "welcome" }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center"
  }
});
