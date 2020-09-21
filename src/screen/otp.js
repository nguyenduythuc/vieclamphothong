import React, {useCallback, useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {AuthApi} from '../api';
import {actions} from '../app-redux';
import { reset } from '../utils/navigation';

const bg = require('../assets/bg1.png');
const OTPScreen = ({navigation, route}) => {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const {
    fullname,
    password,
    phoneNumber,
    deviceName,
    forgotPassword,
  } = route.params;
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

  useEffect(() => {
    if (!confirm) return;

    Toast.show({
      type: 'success',
      position: 'top',
      text1: '',
      text2: 'Mã xác thực đã được gửi tin nhắn đến số điện thoại của bạn!',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 70,
    });
  }, [confirm]);

  const onTypingCode = useCallback((text) => setCode(text), []);

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      const idToken = await auth().currentUser.getIdToken();
      if (forgotPassword) {
        navigation.navigate('ForgotPassword', {idToken});
        return;
      }
      const response = await AuthApi.register(
        idToken,
        password,
        fullname,
        deviceName,
      );
      dispatch(actions.user.saveUser(response));
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Xác nhận mã thất bại, vui lòng thử lại!',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 70,
      });
    }
  };
  return (
    <>
      <Image source={bg} style={styles.bgImage} />
      <SafeAreaView style={styles.container}>
        {/* {confirm && (
          <Text style={styles.tips}>
            Mã xác thực đã được gửi về điện thoại của bạn!
          </Text>
        )} */}
        <Input
          inputStyle={styles.inputStyle}
          inputContainerStyle={styles.inputContainerStyle}
          value={code}
          onChangeText={onTypingCode}
          selectionColor="black"
          placeholder="Nhập mã xác thực"
          placeholderTextColor="white"
        />

        <Button
          style={styles.buttonLoginWrapper}
          buttonStyle={styles.buttLoginStyle}
          titleStyle={styles.buttonLoginColor}
          title="Xác nhận mã"
          onPress={confirmCode}
        />
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
  inputStyle: {
    color: 'white',
  },
  inputContainerStyle: {
    borderColor: 'white',
    height: 30,
  },
  buttonLoginWrapper: {width: '80%'},
  buttLoginStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    fontSize: 24,
  },
  buttonLoginColor: {color: 'rgb(38,76,193)', fontSize: 20},
  tips: {color: 'white', fontSize: 15, marginBottom: 20},
});

export default OTPScreen;
