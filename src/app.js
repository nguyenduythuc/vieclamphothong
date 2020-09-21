// In App.js in a new project

import React, {useRef} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {configStore, actions} from './app-redux';
import Route from './routes';
import {setToken} from './api';

const isIOS = Platform.OS === 'ios';
const {store, persistor} = configStore();
let navigationNative;
const App = ({navigation}) => {
  const navigationRef = useRef(null);
  const onBeforeLift = () => {
    const {user} = store.getState();
    setTimeout(() => {
      if (user?.user?.token) {
        setToken(user.user.token);
        navigationRef.current?.reset({index: 0, routes: [{name: 'Home'}]});
      } else if (user?.userType) {
        navigationRef.current?.reset({index: 0, routes: [{name: 'Login'}]});
      }
      navigationNative = navigationRef;
    }, 500);
    setTimeout(() => SplashScreen.hide(), 800);
    checkLocation();
  };

  async function checkLocation() {
    if (isIOS) {
      Geolocation.getCurrentPosition((info) => {
        console.log(info);
        store.dispatch(
          actions.user.saveCurrentLocation({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }),
        );
      });
      return;
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition((info) => {
          console.log(info);
          store.dispatch(
            actions.user.saveCurrentLocation({
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }),
          );
        });
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={onBeforeLift}>
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

export {navigationNative};
export default App;
