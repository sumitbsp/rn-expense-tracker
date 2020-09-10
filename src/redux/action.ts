export const addExpense = (expense: object) => {
    return {
        type: 'ADD_EXPENSES',
        payload: expense
    }
}