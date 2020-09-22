import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { styles } from './styles';
import ModalComponent from '../../shared/components/Modal/ModalComponent';
import FormComponent from '../../shared/components/Form/FormComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { loadData } from '../../redux/action';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

export default function Home({ navigation, route }): JSX.Element {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
        console.log('User signed out!');
      });
  };

  const date = new Date();
  const currMonth = date.getMonth();

  const [index, setIndex] = useState(0);
  const [expense, setExpense] = useState({});

  const [addExpenseModal, setAddExpenseModal] = useState(false);

  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState();

  const expenses = useSelector((state: RootStateOrAny) => {
    return state.expenses.expenseArray;
  });

  useEffect(() => {
    console.log('expenses: ', expenses);

  })

  const state = useSelector((state: RootStateOrAny) => state);

  const totalExpense = useSelector(
    (state: RootStateOrAny) => state.expenses.totalExpense
  );

  const newExpense = {
    amount: expenseAmount,
    description: expenseDesc,
  };

  const dispatch = useDispatch();

  const openAddExpenseModal = () => {
    setIndex(0);
    setExpense({});
    setAddExpenseModal(true);
  };

  const openEditExpenseModal = () => {
    setAddExpenseModal(true);
  };

  const setModalVisibility = (visibility: boolean) => {
    setAddExpenseModal(visibility);
  };

  const [dataState, setDataState] = useState([])

  const dataFromFS: object[] = [];
  const month = moment().format('MMMM').toLowerCase();
  const { email } = route.params

  useEffect(() => {
    const getData = async () => {
      try {
        await firestore()
          .collection('users')
          .doc(email)
          .collection(month)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              dataFromFS.push(doc.data());
              console.log('data from fs: ', doc.data());

            });
          }).catch(error => {
            console.log(error);
          });
        // console.log('fs data', dataFromFS);

        dispatch({
          type: 'LOAD_FROM_FIRESTORE',
          payload: dataFromFS,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // const setEditModalVisibility = (visibility: boolean) => {
  //   setEditExpenseModal(visibility);
  // };

  const resetExpenses = () => {
    dispatch({
      type: 'RESET',
    });
    firestore()
      .collection('users')
      .doc(email)
      .collection(month)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete()
        });
      })
  };

  const deleteExpense = (i: string): void => {
    dispatch({
      type: 'DELETE_EXPENSE',
      payload: i,
    });
    firestore().
      collection('users')
      .doc(email)
      .collection(month)
      .doc(i).delete()
      .then(() => {
        console.log('Deleted doc successfully')
      })
  };

  const setEditExpenseModal = (
    index: number,
    expense: { expenseAmount: string; expenseDesc: string }
  ) => {
    setIndex(index);
    setExpense(expense);
  };

  return (
    <View style={{}}>
      <StatusBar backgroundColor="#293241" />
      <View style={styles.userInfoContainer}>
        <Text style={{ color: '#fff' }}>Hi, {route.params.user}</Text>
        <TouchableOpacity onPress={signOut}>
          <View style={styles.logOutBtnContainer}>
            <Text style={{ color: '#fff' }}>Log-Out</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.totalExContainer}>
        <Text style={styles.totalExpense}>
          Total Expense: {parseInt(totalExpense)}
        </Text>
      </View>

      <ModalComponent visibility={addExpenseModal}>
        <FormComponent
          setModal={setModalVisibility}
          formValue={expense}
          id={expense.id}
          email={route.params.email}
        />
      </ModalComponent>

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          paddingHorizontal: 10,
          justifyContent: 'space-around',
        }}
      >
        <View style={{ width: '45%' }}>
          <Button
            color="#ee6c4d"
            title="Add Expense"
            onPress={openAddExpenseModal}
          />
        </View>
        <View style={{ width: '45%' }}>
          <Button color="#52b788" title="Reset" onPress={resetExpenses} />
        </View>
      </View>

      <ScrollView style={styles.expenseContainer}>
        <Text style={{ fontSize: 20 }}>All Expenses</Text>
        {expenses.map(
          (
            expense: { expenseDesc: string; expenseAmount: string, id: string }
          ) => {
            return (
              <View
                key={expense.id}
                style={styles.individualExpenseContainer}
              >
                <View style={styles.expenseContainerText}>
                  <Text style={styles.font16}>{expense.expenseDesc}</Text>
                  <Text style={styles.font16}>{expense.expenseAmount}</Text>
                </View>
                <View style={styles.expenseBtnContainer}>
                  <TouchableOpacity
                    style={{ width: '50%', backgroundColor: '#f94144' }}
                    onPress={() => {
                      deleteExpense(expense.id);
                      // console.log(index, 'index of');
                    }}
                  >
                    <View style={styles.expenseBtn}>
                      <Text style={styles.btnText}>Delete</Text>
                      <Icon name="delete-empty" size={18} color="#fff" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ backgroundColor: '#277da1', width: '50%' }}
                    onPress={() => {
                      setEditExpenseModal(index, expense);
                      openEditExpenseModal();
                    }}
                  >
                    <View style={styles.expenseBtn}>
                      <Text style={styles.btnText}>Edit</Text>
                      <Icon name="square-edit-outline" size={18} color="#fff" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        )}
      </ScrollView>
    </View>
  );
}
