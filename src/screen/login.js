import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';

const LoginScreen = ({navigation}) => {
  const phoneNumber = useState('');
  const password = useState('');
  const onLogin = useCallback(
    () => navigation.navigate('Home', {phoneNumber, password}),
    [phoneNumber, password, navigation],
  );
  const onRegister = useCallback(
    () => navigation.navigate('Register', {phoneNumber, password}),
    [phoneNumber, password, navigation],
  );
  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.loginForm}>
        <Input placeholder="Số điện thoại" />
        <Input placeholder="Mật khẩu" />
        <Button onPress={onLogin} title="Đăng nhập" />
      </Card>
      <Button title="Quên mật khẩu?" type="clear" />
      <Button
        buttonStyle={styles.register}
        onPress={onRegister}
        title="Đăng ký"
        type="outline"
        raised
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  loginForm: {width: '90%'},
  register: {paddingHorizontal: 60, backgroundColor: 'white'},
});

export default LoginScreen;
