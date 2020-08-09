import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';

const bg = require('../assets/bg1.png');
const RegisterScreen = ({route, navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidated, setPasswordValidated] = useState(false);
  const logo = require('../assets/logo-transparent.png');

  const onTypingPhoneNumber = useCallback((text) => setPhoneNumber(text), []);
  const onTypingFullname = useCallback((text) => setFullname(text), []);
  const onTypingPassword = useCallback((text) => {
    setPassword(text);
  }, []);
  const onTypingRePassword = useCallback(
    (text) => {
      if (text === password) {
        setPasswordValidated(true);
      } else {
        setPasswordValidated(false);
      }
    },
    [password],
  );

  const onRegister = useCallback(async () => {
    if (!passwordValidated) {
      return;
    }
    const deviceName = await DeviceInfo.getDeviceName();
    navigation.navigate('OTP', {fullname, password, phoneNumber, deviceName});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullname, password, passwordValidated, phoneNumber]);

  const onTOSPressed = useCallback(() => {
    navigation.navigate('TOS');
  }, [navigation]);

  const onLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <>
      <Image source={bg} style={styles.bgImage} />
      <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.logoImage} />
        <View style={styles.loginForm}>
          <Input
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={onTypingFullname}
            placeholder="Họ và tên"
            placeholderTextColor="white"
          />
          <Input
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={onTypingPassword}
            placeholder="Mật khẩu (6 số)"
            placeholderTextColor="white"
            secureTextEntry
          />
          <Input
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={onTypingRePassword}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor="white"
            errorMessage={
              !passwordValidated && password.length > 0 && 'Mật khẩu không khớp'
            }
            secureTextEntry
          />
          <Input
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={onTypingPhoneNumber}
            placeholder="Số điện thoại"
            placeholderTextColor="white"
          />
          <Button
            onPress={onTOSPressed}
            type="clear"
            titleStyle={styles.tos}
            title="Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật"
          />
        </View>
        <Button
          style={styles.buttonLoginWrapper}
          buttonStyle={styles.buttLoginStyle}
          titleStyle={styles.buttonLoginColor}
          onPress={onRegister}
          title="Đăng ký"
          type="outline"
        />
        <View style={styles.registerWrapper}>
          <Text style={styles.registerText}>Đã có tài khoản?</Text>
          <Button
            titleStyle={styles.register}
            onPress={onLogin}
            title="Đăng nhập"
            type="clear"
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  loginForm: {width: '90%', marginBottom: 10, alignItems: 'center'},
  inputStyle: {
    color: 'white',
  },
  inputContainerStyle: {
    borderColor: 'white',
  },
  buttonLoginWrapper: {width: '50%'},
  buttLoginStyle: {
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonLoginColor: {color: 'white'},
  register: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  registerWrapper: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {color: 'white', fontSize: 20, fontWeight: '500'},
  tos: {
    textDecorationLine: 'underline',
    color: 'white',
    textAlign: 'left',
  },
  logoImage: {
    width: 130,
    height: 130,
    marginBottom: 60,
  },
});

export default RegisterScreen;
