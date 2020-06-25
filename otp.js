import React, {useState, useEffect} from 'react';
import {Button, TextInput, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';

const PhoneSignIn: () => React$Node = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  useEffect(() => {
    console.log('didmount');
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      const response = await confirm.confirm(code);
      console.log(response)
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <SafeAreaView>
      {!confirm ? (
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber('+84987654321')}
        />
      ) : (
        <>
          <TextInput style={{backgroundColor: 'red'}} value={code} onChangeText={(text) => setCode(text)} />
          <Button title="Confirm Code" onPress={() => confirmCode()} />
        </>
      )}
    </SafeAreaView>
  );
};

export default PhoneSignIn;
