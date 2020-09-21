import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Text} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import {ScrollView} from 'react-native-gesture-handler';

const bg = require('../assets/bg1.png');
const RegisterScreen = ({route, navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidated, setPasswordValidated] = useState(true);
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
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Image source={logo} style={styles.logoImage} />
          <View style={styles.loginForm}>
            <Input
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              selectionColor="black"
              onChangeText={onTypingFullname}
              placeholder="Họ và tên"
              placeholderTextColor="white"
            />
            <Input
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              selectionColor="black"
              onChangeText={onTypingPassword}
              keyboardType="number-pad"
              textContentType="password"
              maxLength={6}
              placeholder="Mật khẩu (6 số)"
              placeholderTextColor="white"
              errorMessage={
                password.length > 0 &&
                password.length < 6 &&
                'Mật khẩu gồm 6 ký tự số, từ 0 - 9'
              }
              secureTextEntry
            />
            <Input
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              selectionColor="black"
              onChangeText={onTypingRePassword}
              keyboardType="number-pad"
              textContentType="password"
              maxLength={6}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="white"
              errorMessage={
                !passwordValidated &&
                password.length > 0 &&
                'Mật khẩu không khớp'
              }
              secureTextEntry
            />
            <Input
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              selectionColor="black"
              onChangeText={onTypingPhoneNumber}
              keyboardType="number-pad"
              textContentType="telephoneNumber"
              maxLength={10}
              placeholder="Số điện thoại"
              placeholderTextColor="white"
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="checksquareo" type="antdesign" color="white" />
              <Button
                onPress={onTOSPressed}
                type="clear"
                titleStyle={styles.tos}
                title="Tôi đã đọc và đồng ý với điều khoản sử dụng và chính sách bảo mật"
              />
            </View>
          </View>
          <Button
            containerStyle={styles.buttonLoginWrapper}
            buttonStyle={styles.buttLoginStyle}
            titleStyle={styles.buttonLoginColor}
            onPress={onRegister}
            title="Đăng ký"
            type="outline"
          />
          <View style={styles.registerWrapper}>
            <Text style={styles.registerText}>Bạn đã có tài khoản?</Text>
            <Button
              titleStyle={styles.register}
              onPress={onLogin}
              title="Đăng nhập"
              type="clear"
            />
          </View>
        </SafeAreaView>
      </ScrollView>
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
  loginForm: {
    width: '90%',
    marginBottom: 10,
    paddingBottom: 40,
    alignItems: 'center',
  },
  inputStyle: {
    color: 'white',
  },
  inputContainerStyle: {
    borderColor: 'white',
    height: 30,
  },
  buttonLoginWrapper: {width: '50%', backgroundColor: 'white'},
  buttLoginStyle: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 24,
  },
  buttonLoginColor: {color: 'rgb(38,76,193)', fontSize: 20},
  register: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 20,
  },
  registerWrapper: {
    marginTop: 30,
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
    marginBottom: 40,
  },
});

export default RegisterScreen;
