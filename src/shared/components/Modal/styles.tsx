import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#000000AA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childrenContainer: {
    backgroundColor: '#ededed',
    padding: 20,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: '#fff',
    width: Dimensions.get('window').width / 1.2,
  },
});
