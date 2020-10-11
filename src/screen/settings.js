import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Text} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import {ScrollView} from 'react-native-gesture-handler';
import {RecruitmentApi} from '../api';
import Toast from 'react-native-toast-message';

const bg = require('../assets/bg1.png');
const isNotch = DeviceInfo.hasNotch();
const Settings = ({route, navigation}) => {
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordValidated, setPasswordValidated] = useState(true);
  const [isShowInputOldPassword, setShowOldPassword] = useState(false);
  const [isShowInputPassword, setShowPassword] = useState(false);
  const [isShowReInputPassword, setShowRePassword] = useState(false);

  const onTypingPassword = useCallback((text) => {
    setPassword(text);
  }, []);
  const onTypingOldPassword = useCallback((text) => {
    setOldPassword(text);
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
  const onChangePassword = useCallback(async () => {
    if (!passwordValidated) {
      return;
    }
    try {
      const body = {
        old_password: oldPassword,
        new_password: password,
        new_password_confirmation: password,
      };
      const response = await RecruitmentApi.updatePassword(body);
      setTimeout(() => {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Thành công!',
          text2: 'Thay đổi mật khẩu thành công!',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 70,
        });
        navigation.goBack();
      }, 200);
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Oops!',
        text2: 'Mật khẩu cũ không chính xác!',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 70,
      });
      console.log(JSON.stringify(error));
    }
  }, [passwordValidated, oldPassword, password, navigation]);

  const showInputPassword = useCallback(() => {
    setShowPassword(!isShowInputPassword);
  }, [isShowInputPassword]);

  const showReInputPassword = useCallback(() => {
    setShowRePassword(!isShowReInputPassword);
  }, [isShowReInputPassword]);

  const showInputOldPassword = useCallback(() => {
    setShowOldPassword(!isShowInputOldPassword);
  }, [isShowInputOldPassword]);

  return (
    <>
      <Image source={bg} style={styles.bgImage} />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.loginForm}>
            <View style={{flexDirection: 'row'}}>
              <Input
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                selectionColor="black"
                onChangeText={onTypingOldPassword}
                keyboardType="number-pad"
                textContentType="password"
                maxLength={6}
                placeholder="Mật khẩu cũ (6 số)"
                placeholderTextColor="white"
                errorStyle={styles.errorMessage}
                errorMessage={
                  oldPassword.length > 0 &&
                  oldPassword.length < 6 &&
                  'Mật khẩu gồm 6 ký tự số, từ 0 - 9'
                }
                secureTextEntry={isShowInputOldPassword}
              />
              <Icon
                name="remove-red-eye"
                color={isShowInputOldPassword ? 'black' : 'white'}
                onPress={showInputOldPassword}
                containerStyle={styles.absoluteRight}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Input
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                selectionColor="black"
                onChangeText={onTypingPassword}
                keyboardType="number-pad"
                textContentType="password"
                maxLength={6}
                placeholder="Mật khẩu mới (6 số)"
                placeholderTextColor="white"
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
                selectionColor="black"
                onChangeText={onTypingRePassword}
                keyboardType="number-pad"
                textContentType="password"
                maxLength={6}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="white"
                errorStyle={styles.errorMessage}
                errorMessage={
                  !passwordValidated &&
                  password.length > 0 &&
                  'Mật khẩu không khớp'
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
          </View>
          <Button
            containerStyle={styles.buttonLoginWrapper}
            buttonStyle={styles.buttLoginStyle}
            titleStyle={styles.buttonLoginColor}
            onPress={onChangePassword}
            title="Thay đổi"
            type="outline"
          />
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    marginTop: isNotch ? 30 : 0,
  },
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
    marginBottom: 10,
    borderColor: 'white',
    height: 30,
  },
  absoluteRight: {position: 'absolute', right: 10},
  buttonLoginWrapper: {width: '50%', backgroundColor: 'white', marginTop: 10},
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
  tosWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tos: {
    textDecorationLine: 'underline',
    color: 'white',
    textAlign: 'left',
  },
  errorMessage: {color: '#b51414', fontWeight: '500'},
});

export default Settings;
