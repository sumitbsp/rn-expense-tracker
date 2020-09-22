import React, { useEffect } from 'react';
import { Formik } from 'formik';
// import {} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

type propsType = {
  setModal: any;
  formValue?: { expenseAmount: string; expenseDesc: string, id: string } | {};
  id?: string;
  email?: string;
};

export default function FormComponent({
  setModal,
  formValue,
  id,
  email
}: propsType): JSX.Element {
  const dispatch = useDispatch();
  let initialValues: { expenseAmount: string; expenseDesc: string } | {};
  if (formValue) {
    initialValues = formValue;
  } else {
    initialValues = { expenseDesc: '', expenseAmount: '' };
  }

  useEffect(() => {
    console.log('currentFormValue: ', formValue);
  }, [formValue]);

  // firestore

  const date = new Date();
  const month = moment().format('MMMM').toLowerCase();

  // const addData = async (username, month, amount, desc) => {
  //   try {
  //     await firestore()
  //       .collection('users')
  //       .doc(username)
  //       .collection(month.toString())
  //       .add({
  //         expenseAmount: amount,
  //         expenseDesc: desc,
  //       });
  //     console.log('Data Added to firestore');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, action) => {
          action.resetForm();
          console.log('VALUES: ', values);
          console.log('ID: ', id);

          setModal(false);
          if (formValue.expenseAmount > 0) {
            dispatch({
              type: 'EDIT_EXPENSE',
              payload: {
                id: id,
                expense: values,
              },
            });
            firestore()
              .collection('users')
              .doc(email)
              .collection(month)
              .doc(id)
              .update(values)
          } else {
            let newDoc = firestore()
              .collection('users')
              .doc(email)
              .collection(month)
              .doc();

            newDoc.set({
              expenseAmount: values.expenseAmount,
              expenseDesc: values.expenseDesc,
              id: newDoc.id,
            });

            dispatch({
              type: 'ADD_EXPENSE',
              payload: {
                expenseAmount: values.expenseAmount,
                expenseDesc: values.expenseDesc,
                id: newDoc.id

              },
            });

            console.log('data added to firestore');
          }
        }}
      >
        {(props) => (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <View>
              <TextInput
                placeholder="Expense Description"
                value={props.values.expenseDesc}
                onChangeText={props.handleChange('expenseDesc')}
              />
              <TextInput
                placeholder="Expense Amount"
                value={props.values.expenseAmount}
                keyboardType="number-pad"
                onChangeText={props.handleChange('expenseAmount')}
              />
              <View style={{ marginTop: 20 }}>
                <Button
                  color="#ee6c4d"
                  title="Submit"
                  onPress={props.handleSubmit}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Button
                  color="#52b788"
                  title="Cancel"
                  onPress={() => setModal(false)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </View>
  );
}
