import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, Image, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {Card, Input, Button, Overlay} from 'react-native-elements';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import {AuthApi, setToken} from '../api';
import {actions} from '../app-redux';
import {reset} from '../utils/navigation';

const bg = require('../assets/bg1.png');
const logo = require('../assets/logo-transparent.png');
const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [forgotPasswordPhoneNumber, setForgotPasswordPhoneNumber] = useState(
    '',
  );

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onTypingPhone = useCallback((text) => {
    setPhoneNumber(text);
  }, []);

  const onLogin = useCallback(async () => {
    try {
      const deviceName = await DeviceInfo.getDeviceName();
      const response = await AuthApi.login(phoneNumber, password, deviceName);
      setToken(response.token);
      dispatch(actions.user.saveUser(response));
      setTimeout(
        () => navigation.reset({index: 0, routes: [{name: 'Home'}]}),
        200,
      );
    } catch (error) {
      alert(
        'Số điện thoại hoặc mật khẩu đã nhập sai Bạn vui lòng đăng nhập lại!'
      );
      console.log(JSON.stringify(error));
    }
  }, [phoneNumber, password, navigation, dispatch]);

  const onRegister = useCallback(
    () => navigation.navigate('Register', {phoneNumber, password}),
    [phoneNumber, password, navigation],
  );

  const onForgotPasswordTypingPhone = useCallback((text) => {
    setForgotPasswordPhoneNumber(text);
  }, []);

  const onForgotPasswordSubmit = useCallback(() => {
    setOverlayVisible(false);
    navigation.navigate('OTP', {
      phoneNumber: forgotPasswordPhoneNumber,
      forgotPassword: true,
    });
  }, [navigation, forgotPasswordPhoneNumber]);

  const onForgotPassword = () => setOverlayVisible(true);

  const toggleOverlay = useCallback(() => {
    setOverlayVisible(!overlayVisible);
  }, [overlayVisible]);

  return (
    <>
      <Image source={bg} style={styles.bgImage} />
      <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.logoImage} />
        <View style={styles.loginForm}>
          <Input
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={onTypingPhone}
            selectionColor="black"
            placeholderTextColor="white"
            placeholder="Số điện thoại"
          />
          {user.userType === 'RECRUITER' && (
            <Input
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              placeholderTextColor="white"
              placeholder="Mật khẩu"
            />
          )}
          {user.userType === 'APPLICANT' && (
            <>
              <Text style={styles.passwordTitle}>Mật khẩu</Text>
              <SmoothPinCodeInput
                codeLength={6}
                placeholder={<View style={styles.mask} />}
                mask={<View style={[styles.mask, {opacity: 1}]} />}
                maskDelay={1000}
                password
                cellStyle={null}
                cellStyleFocused={null}
                value={password}
                onTextChange={(code) => setPassword(code)}
              />
            </>
          )}
          <View style={styles.otpAndPasswordButton}>
            {/* <Button
              title="Gửi mã OTP"
              titleStyle={styles.sendOTP}
              type="clear"
            />
            <Button
              title="Quên mật khẩu?"
              titleStyle={styles.sendOTP}
              type="clear"
            /> */}
          </View>
          <Button
            containerStyle={styles.buttonLoginWrapper}
            buttonStyle={styles.buttLoginStyle}
            titleStyle={styles.buttonLoginColor}
            onPress={onLogin}
            title="Đăng nhập"
            type="outline"
          />
          <View style={styles.otpAndPasswordButton}>
            <Button
              onPress={onForgotPassword}
              title="Quên mật khẩu?"
              titleStyle={styles.sendOTP}
              type="clear"
            />
          </View>
        </View>
        <View style={styles.registerWrapper}>
          <Text style={styles.registerText}>Bạn chưa có tài khoản?</Text>
          <Button
            titleStyle={styles.register}
            onPress={onRegister}
            title="Đăng ký"
            type="clear"
          />
        </View>
      </SafeAreaView>
      <Overlay
        overlayStyle={styles.overlayStyle}
        isVisible={overlayVisible}
        onBackdropPress={toggleOverlay}>
        <Text style={styles.overlayTitle}>Quên mật khẩu</Text>
        <Input
          inputStyle={styles.overlayInputStyle}
          inputContainerStyle={styles.overlayInputContainerStyle}
          onChangeText={onForgotPasswordTypingPhone}
          keyboardType="number-pad"
          maxLength={10}
          placeholderTextColor="black"
          placeholder="Số điện thoại"
        />
        <Button
          titleStyle={styles.overlayButtonTitleStyle}
          buttonStyle={styles.overlayButtonStyle}
          onPress={onForgotPasswordSubmit}
          title="Xác nhận"
          type="clear"
        />
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'space-between'},
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  logoImage: {
    width: 130,
    height: 130,
    marginTop: 10,
  },
  logo: {
    paddingTop: 30,
    alignItems: 'center',
  },
  loginForm: {width: '90%', marginBottom: 10, alignItems: 'center'},
  inputStyle: {
    color: 'white',
  },
  inputContainerStyle: {
    borderColor: 'white',
    height: 30,
  },
  passwordTitle: {color: 'white', fontSize: 20},
  buttonLoginWrapper: {width: '80%', backgroundColor: 'white'},
  buttLoginStyle: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 24,
  },
  otpAndPasswordButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonLoginColor: {color: 'rgb(38,76,193)', fontSize: 20},
  sendOTP: {
    color: 'white',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  register: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  mask: {
    width: 20,
    height: 20,
    borderRadius: 45,
    opacity: 0.5,
    backgroundColor: 'white',
  },
  registerWrapper: {
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {color: 'white', fontSize: 20, fontWeight: '500'},
  // Overlay
  overlayStyle: {
    width: '90%',
    height: 200,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlayTitle: {fontSize: 22},
  overlayInputStyle: {color: 'black'},
  overlayInputContainerStyle: {borderColor: 'black'},
  overlayButtonTitleStyle: {color: 'white', width: '100%'},
  overlayButtonStyle: {backgroundColor: '#377bf5', width: '100%'},
});

export default LoginScreen;
