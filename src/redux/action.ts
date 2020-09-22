// export const addExpense = (expense: object) => {
//     return {
//         type: 'ADD_EXPENSES',
//         payload: expense
//     }
// }

import firestore from '@react-native-firebase/firestore';

export const loadData = () => async (dispatch) => {
  console.log('hi');

  await firestore()
    .collection('users')
    .doc('sumit')
    .collection('september')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });

  dispatch({
    type: 'LOAD_FROM_FIRESTORE',
  });
};
