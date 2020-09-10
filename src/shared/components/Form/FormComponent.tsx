import React, {useEffect} from 'react';
import {Formik} from 'formik';
// import {} from 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type propsType = {
  setModal: any;
  formValue?: {expenseAmount: string; expenseDesc: string} | {};
  index?: number;
};

export default function FormComponent({
  setModal,
  formValue,
  index,
}: propsType): JSX.Element {
  const dispatch = useDispatch();
  let initialValues: {expenseAmount: string; expenseDesc: string} | {};
  if (formValue) {
    initialValues = formValue;
  } else {
    initialValues = {expenseDesc: '', expenseAmount: ''};
  }

  useEffect(() => {
    // console.log('currentFormValue: ', formValue);
  }, [formValue]);

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, action) => {
          action.resetForm();
          // console.log(values);

          setModal(false);
          if (formValue.expenseAmount > 0) {
            dispatch({
              type: 'EDIT_EXPENSE',
              payload: {
                index: index,
                expense: values,
              },
            });
          } else {
            dispatch({
              type: 'ADD_EXPENSE',
              payload: values,
            });
          }
        }}>
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
              <View style={{marginTop: 20}}>
                <Button
                  color="#ee6c4d"
                  title="Submit"
                  onPress={props.handleSubmit}
                />
              </View>
              <View style={{marginTop: 10}}>
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
