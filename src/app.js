// In App.js in a new project

import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {Provider, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {configStore} from './app-redux';
import Route from './routes';
import {setToken} from './api';

const {store, persistor} = configStore();

const App = ({navigation}) => {
  const navigationRef = useRef(null);
  const {user} = store.getState();
  useEffect(() => {
    setTimeout(() => {
      if (user?.user?.token) {
        setToken(user.user.token);
        navigationRef.current?.navigate('Home');
      } else {
        // navigationRef.current?.navigate('Login');
      }
      SplashScreen.hide();
    }, 200);
    console.log('user', user);
  }, [user.user, navigation, user]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <Route />
          <Toast
            style={{fontSize: 30, height: 300}}
            ref={(ref) => Toast.setRef(ref)}
          />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
