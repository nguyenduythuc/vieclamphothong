import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Card, Input, Button, Divider} from 'react-native-elements';

const RegisterScreen = ({navigation}) => {
  const phoneNumber = useState('');
  const password = useState('');
  const onLogin = useCallback(
    () => navigation.navigate('Home', {phoneNumber, password}),
    [phoneNumber, password, navigation],
  );
  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.loginForm}>
        <Input placeholder="Số điện thoại" />
        <Input placeholder="Mật khẩu" />
        <Button onPress={onLogin} title="Đăng ký" />
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  loginForm: {width: '90%'},
});

export default RegisterScreen;
