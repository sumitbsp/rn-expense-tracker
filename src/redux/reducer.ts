import firestore from '@react-native-firebase/firestore';

const initialState: object = { totalExpense: 0, expenseArray: [] };

console.log(initialState);

const totalCounter = (arr) => {
  let total = 0;
  arr.forEach((obj) => {
    total = parseInt(obj.expenseAmount) + total;
  });
  return total;
};

const reducer = (
  state = { totalExpense: 0, expenseArray: initialState.expenseArray },
  action: any
) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      const newState: object = {
        totalExpense:
          state.totalExpense + parseInt(action.payload.expenseAmount),
        expenseArray: [...state.expenseArray, action.payload],
      };
      return newState;

    case 'RESET':
      return initialState;

    case 'DELETE_EXPENSE':
      let arr = state.expenseArray;
      const index = arr.findIndex(el => el.id === action.payload)
      console.log('arr: ', arr[0].id);
      console.log('INDEX: ', index);

      arr.splice(index, 1);
      let newTotal = totalCounter(arr);
      let newstate: object = {
        totalExpense: newTotal,
        expenseArray: arr,
      };
      return newstate;

    case 'EDIT_EXPENSE':
      const arr2 = state.expenseArray;
      const index2 = arr2.findIndex(el => el.id === action.payload.id)
      // console.log('INDEX: ', index2);
      // console.log('ARR2: ', arr2);

      arr2.splice(index2, 1, action.payload.expense);
      const newTotal2 = totalCounter(arr2);
      const newstate2: object = {
        totalExpense: newTotal2,
        expenseArray: arr2,
      };
      return newstate2;

    case 'LOAD_FROM_FIRESTORE':
      const newTotal3 = totalCounter(action.payload);
      const newState3 = {
        totalExpense: newTotal3,
        expenseArray: action.payload,
      };
      return newState3;

    default:
      return state;
  }
};

import { combineReducers } from 'redux';
export default combineReducers({ expenses: reducer });
