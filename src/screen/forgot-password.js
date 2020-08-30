import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {AuthApi} from '../api';

const bg = require('../assets/bg1.png');
const ForgotPassword = ({navigation, route}) => {
  const [password, setPassword] = useState('');
  const [passwordValidated, setPasswordValidated] = useState(false);

  const {idToken} = route.params;

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

  const confirmResetPassword = async () => {
    try {
      if (!passwordValidated) {
        return;
      }

      await AuthApi.forgotPassword(idToken, password);
      navigation.navigate('Login');
      alert('Đổi mật khẩu thành công, vui lòng đăng nhập lại!');
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <>
      <Image source={bg} style={styles.bgImage} />
      <SafeAreaView style={styles.container}>
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

        <Button
          style={styles.buttonLoginWrapper}
          buttonStyle={styles.buttLoginStyle}
          titleStyle={styles.buttonLoginColor}
          title="Đổi mật khẩu"
          onPress={confirmResetPassword}
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
  },
  buttonLoginWrapper: {width: '80%'},
  buttLoginStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 24,
  },
  buttonLoginColor: {color: 'rgb(38,76,193)', fontSize: 20},
});

export default ForgotPassword;
