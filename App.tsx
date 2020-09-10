/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {StyleSheet} from 'react-native';

import {Provider} from 'react-redux';
import store from './src/redux/store';
import Home from './src/screens/home/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginComponent from './src/screens/auth/LoginComponent';
import firestore from '@react-native-firebase/firestore'

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

const App = (): JSX.Element => {

  const getUsers = async () => {
    try {
      const userDocument = await firebase().firestore().collection('users').get()
      console.log('user is- ', userDocument);
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginComponent} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
