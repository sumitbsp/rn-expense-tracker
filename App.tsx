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
import { StyleSheet, Button } from 'react-native';

import { Provider } from 'react-redux';
import store from './src/redux/store';
import Home from './src/screens/home/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from './src/screens/auth/LoginComponent';
import firestore from '@react-native-firebase/firestore';

declare const global: { HermesInternal: null | {} };

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  // useEffect(() => {
  //   firestore()
  //     .collection('users')
  //     .doc('sumit')
  //     .collection('september')
  //     .onSnapshot(function (doc) {
  //       // console.log('Current data: ', doc);
  //     });
  //   // .get()
  //   // .then(function (querySnapshot) {
  //   //   querySnapshot.forEach(function (doc) {
  //   //     // doc.data() is never undefined for query doc snapshots
  //   //     console.log(doc.id, ' => ', doc.data());
  //   //   });
  //   // });
  // }, []);
  useEffect(() => {
    firestore()
      .collection('users')
      .doc('sumit')
      .collection('september')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
        });
      });
  });
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginComponent} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
