import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {AuthApi} from '../api';

const bg = require('../assets/bg1.png');
const ForgotPassword = ({navigation, route}) => {
  const [password, setPassword] = useState('');
  const [passwordValidated, setPasswordValidated] = useState(true);
  const [isShowInputPassword, setShowPassword] = useState(false);
  const [isShowReInputPassword, setShowRePassword] = useState(false);

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

  const showInputPassword = useCallback(() => {
    setShowPassword(!isShowInputPassword);
  }, [isShowInputPassword]);

  const showReInputPassword = useCallback(() => {
    setShowRePassword(!isShowReInputPassword);
  }, [isShowReInputPassword]);

  return (
    <>
      <Image source={bg} style={styles.bgImage} />
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Input
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={onTypingPassword}
            placeholder="Mật khẩu (6 số)"
            placeholderTextColor="white"
            selectionColor="black"
            keyboardType="number-pad"
            textContentType="password"
            maxLength={6}
            errorStyle={styles.errorMessage}
            errorMessage={
              password.length > 0 &&
              password.length < 6 &&
              'Mật khẩu gồm 6 ký tự số, từ 0 - 9'
            }
            secureTextEntry={isShowInputPassword}
          />
          <Icon
            name="remove-red-eye"
            color={isShowInputPassword ? 'black' : 'white'}
            onPress={showInputPassword}
            containerStyle={styles.absoluteRight}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Input
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={onTypingRePassword}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor="white"
            selectionColor="black"
            keyboardType="number-pad"
            textContentType="password"
            maxLength={6}
            errorStyle={styles.errorMessage}
            errorMessage={
              !passwordValidated && password.length > 0 && 'Mật khẩu không khớp'
            }
            secureTextEntry={isShowReInputPassword}
          />
          <Icon
            name="remove-red-eye"
            color={isShowReInputPassword ? 'black' : 'white'}
            onPress={showReInputPassword}
            containerStyle={styles.absoluteRight}
          />
        </View>

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
    marginTop: 10,
    borderColor: 'white',
    height: 30,
  },
  buttonLoginWrapper: {width: '80%'},
  buttLoginStyle: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    fontSize: 24,
  },
  buttonLoginColor: {color: 'rgb(38,76,193)', fontSize: 20},
  errorMessage: {color: '#b51414', fontWeight: '500'},
  absoluteRight: {position: 'absolute', right: 10, top: 10},
});

export default ForgotPassword;
