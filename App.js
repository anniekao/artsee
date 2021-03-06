import React, { useState, useEffect } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { View, Header } from "react-native";
import { AppLoading, SplashScreen } from "expo";

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './src/reducers'

import Icon from "react-native-vector-icons/FontAwesome5";
import * as Font from "expo-font";
import mainStyle from "./styles/main";
import { colors } from './styles/variables';

import LoginScreen from "./src/Components/LoginScreen";
import SignUpScreen from "./src/Components/SignUpScreen";
import AuthLoadingScreen from "./src/Components/AuthLoadingScreen";
import SplashLoadingScreen from "./src/Components/SplashLoadingScreen";
import SecondSignUpScreen from "./src/Components/SecondSignUpScreen";
import ModalArt from './src/Components/ModalArt/ModalArt';

import cameraScreen from "./src/containers/cameraScreen";
import mapScreen from "./src/containers/mapScreen";
import profileScreen from "./src/containers/profileScreen";
import feedScreen from "./src/containers/feedScreen";


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const AppStack = createBottomTabNavigator(
  {
    Map: mapScreen,
    Feed: feedScreen,
    Camera: cameraScreen,
    Profile: profileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;

        switch (routeName) {
          case "Map":
            iconName = "map";
            break;
          case "Profile":
            iconName = "ghost";
            break;
          case "Camera":
            iconName = "camera-retro";
            break;
          case "Feed":
            iconName = "broadcast-tower";
            break;
          default:
            return;
        }

        return <IconComponent name={iconName} navigation={navigation} size={30} color={colors.tabButts} style={{
          paddingTop: 10,
          paddingBottom: 10
        }} />;
      },
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#39c2c9",
      inactiveTintColor: "#363a43",
      style: mainStyle.tabBar
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: AppStack,
    },
    ArtModal: {
      screen: ModalArt,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null
    }
  }
});

let Navigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: RootStack,
      Auth: AuthStack,
      Splash: SplashLoadingScreen,
      SecondSignup: SecondSignUpScreen
    },
    {
      initialRouteName: "AuthLoading"
    }
  ));

export default App = ({navigation}) => {
  const [fontLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    setLoaded(true);
  };

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}
