import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  totalExContainer: {
    height: height / 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#293241',
  },
  userInfoContainer: {
    backgroundColor: '#293241',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  logOutBtnContainer: {
    marginTop: 5,
    paddingVertical: 2,
    paddingBottom: 5,
    paddingHorizontal: 15,
    backgroundColor: '#F94244',
    elevation: 3,
  },
  totalExpense: {
    fontSize: 30,
    color: '#FFF',
  },
  expenseContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  individualExpenseContainer: {
    marginVertical: 10,
    backgroundColor: '#fff',
    elevation: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseContainerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  font16: {
    fontSize: 16,
  },
  expenseBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
});
