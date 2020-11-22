import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieList from './pages/moviesList/moviesList';
import MovieDetail from './pages/movieDetail/movieDetail.js';
import Player from './pages/player';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Home">
        <Stack.Navigator>            
            <Stack.Screen name="Home" component={MovieList} />
            <Stack.Screen name="Detail" component={MovieDetail} />
            <Stack.Screen name="Player" component={Player} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

