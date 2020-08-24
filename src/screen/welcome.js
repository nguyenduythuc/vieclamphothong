import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet, Image, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {actions} from '../app-redux';

const bg = require('../assets/bg1.png');
const logo = require('../assets/logo-transparent.png');
function navigateToLogin(type, dispatch, navigation) {
  dispatch(actions.user.saveUserType(type));
  navigation.navigate('Login');
}
const WelcomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const onApplicant = useCallback(
    () => navigateToLogin('APPLICANT', dispatch, navigation),
    [dispatch, navigation],
  );
  const onRecruiter = useCallback(
    () => navigateToLogin('RECRUITER', dispatch, navigation),
    [dispatch, navigation],
  );

  return (
    <>
      <Image source={bg} style={styles.bgImage} />
      <SafeAreaView style={styles.container}>
        <View style={styles.logo}>
          <Image source={logo} style={styles.logoImage} />
          <Text style={styles.welcome}>
            {'S.Job bản đồ tìm việc làm\nXin chào!'}
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            title="Bạn là người tìm việc"
            titleStyle={styles.buttonText}
            buttonStyle={styles.buttonStyle}
            onPress={onApplicant}
            type="outline"
          />
          <Button
            title="Bạn là nhà tuyển dụng"
            titleStyle={styles.buttonText}
            style={styles.buttonWrapper}
            buttonStyle={styles.buttonStyle}
            onPress={onRecruiter}
            type="outline"
          />
        </View>
        <Text style={styles.bottomText}>
          Sản phẩm được phát triển bởi công ty cổ phần tập doàn công nghệ
          Seralead Việt Nam
        </Text>
      </SafeAreaView>
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
  },
  logo: {
    paddingTop: 30,
    alignItems: 'center',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
  buttons: {
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
  buttonWrapper: {
    marginVertical: 30,
  },
  buttonStyle: {
    borderColor: 'white',
    borderWidth: 2,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
  },
  bottomText: {
    color: 'white',
    padding: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
