const initialState: object = {totalExpense: 0, expenseArray: []};

const totalCounter = (arr) => {
  let total = 0;
  arr.forEach((obj) => {
    total = parseInt(obj.expenseAmount) + total;
  });
  return total;
};

const reducer = (state = {totalExpense: 0, expenseArray: []}, action: any) => {
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
      arr.splice(action.payload, 1);
      let newTotal = totalCounter(arr);
      let newstate: object = {
        totalExpense: newTotal,
        expenseArray: arr,
      };
      return newstate;

    case 'EDIT_EXPENSE':
      const arr2 = state.expenseArray;
      arr2.splice(action.payload.index, 1, action.payload.expense);
      const newTotal2 = totalCounter(arr2);
      const newstate2: object = {
        totalExpense: newTotal2,
        expenseArray: arr2,
      };
      return newstate2;

    default:
      return state;
  }
};

import {combineReducers} from 'redux';
export default combineReducers({expenses: reducer});
