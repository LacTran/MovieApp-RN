import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { loadAsync } from 'expo-font';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './src/screens/Main/MainScreen';
import MovieDetailsScreen from './src/screens/MovieDetails/MovieDetails';
import ActorDetailsScreen from './src/screens/ActorDetails/ActorDetails';
import { ConfigContextProvider } from './src/context/useConfig';
import { GenresContextProvider, useGenres } from './src/context/useGenre';
import { TypeContextProvider } from './src/context/useType';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Sidebar from './src/components/Sidebar';

const drawerNavigator = createDrawerNavigator({
  Main: createStackNavigator({
    MainScreen,
    MovieDetails: MovieDetailsScreen,
    ActorDetails: ActorDetailsScreen
  }),
}, { contentComponent: props => <Sidebar {...props} /> })



const App = createAppContainer(drawerNavigator)

export default () => {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    loadAsync({
      Oxanium: require('./assets/fonts/Oxanium/Oxanium-Regular.ttf'),
      OxaniumLight: require('./assets/fonts/Oxanium/Oxanium-Light.ttf'),
      OxaniumMedium: require('./assets/fonts/Oxanium/Oxanium-Medium.ttf'),
      OxaniumSemiBold: require('./assets/fonts/Oxanium/Oxanium-SemiBold.ttf'),
      OxaniumBold: require('./assets/fonts/Oxanium/Oxanium-Bold.ttf'),
    }).then(() => setIsReady(true))
  })
  return (
    isReady &&
    <GenresContextProvider>
      <ConfigContextProvider>
        <TypeContextProvider>
          <App />
        </TypeContextProvider>
      </ConfigContextProvider>
    </GenresContextProvider>
  )
}
