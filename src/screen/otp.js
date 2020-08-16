import React, {useCallback, useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';
import {Input, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {AuthApi} from '../api';
import {actions} from '../app-redux';

const bg = require('../assets/bg1.png');
const OTPScreen = ({navigation, route}) => {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const {fullname, password, phoneNumber, deviceName} = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    async function getOTPCode() {
      try {
        auth().languageCode = 'vi';
        const firebasePhonenumber = phoneNumber.replace('0', '+84');
        const confirmation = await auth().signInWithPhoneNumber(
          firebasePhonenumber,
        );
        setConfirm(confirmation);
      } catch (e) {
        console.log(e);
      }
    }
    getOTPCode();
  }, []);

  const onTypingCode = useCallback((text) => setCode(text), []);

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      const idToken = await auth().currentUser.getIdToken();
      const response = await AuthApi.register(
        idToken,
        password,
        fullname,
        deviceName,
      );
      dispatch(actions.user.saveUser(response));
      navigation.navigate('Home');
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };
  return (
    <>
      <Image source={bg} style={styles.bgImage} />
      <SafeAreaView style={styles.container}>
        <Input
          placeholder="Nhập mã xác thực"
          style={{backgroundColor: 'red'}}
          value={code}
          onChangeText={onTypingCode}
        />
        <Button title="Xác nhận mã" onPress={confirmCode} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  loginForm: {width: '90%'},
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default OTPScreen;
