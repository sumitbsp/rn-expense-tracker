import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from './styles';

export default function LoginComponent({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
      '354478286752-si7cadifsi9lknk2lcv5fgj2an006sav.apps.googleusercontent.com',
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    // console.log(user);
    if (initializing) setInitializing(false);
  }

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      navigation.navigate('Home', { user: user.displayName, email: user.email });
    }
  }, [user]);

  const signInAno = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  return (
    <View style={{ backgroundColor: '#344250', flex: 1 }}>
      {
        !user && (
          <View style={styles.LoginScreenContainer}>
            <View style={styles.logoContainer}>
              <Icon name="money-check" size={34} color="#fff" />
              <Text style={styles.welcomeText}>Expense Tracker</Text>
            </View>
            <Text style={styles.continueWithGoogle}>
              Continue with Google to sync your data
      </Text>
            <GoogleSigninButton
              color={GoogleSigninButton.Color.Dark}
              size={GoogleSigninButton.Size.Wide}
              onPress={() =>
                onGoogleButtonPress()
                  .then(() => console.log('Signed in with Google!'))
                  .catch((error) => {
                    console.log('Some error', error);
                  })
              }
            />
          </View>
        )
      }
    </View>);
}
