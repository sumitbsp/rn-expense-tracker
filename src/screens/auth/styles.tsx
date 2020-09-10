import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  LoginScreenContainer: {
    backgroundColor: '#2B3242',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
    marginTop: height / 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 35,
    color: '#fff',
    marginLeft: 15,
    // fontWeight: 'bold',
  },
  continueWithGoogle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
});
