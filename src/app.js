// In App.js in a new project

import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from 'react-native-geolocation-service';
import {configStore, actions} from './app-redux';
import Route from './routes';
import {setToken} from './api';

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
    Geolocation.getCurrentPosition((info) => {
      console.log(info);
      // store.dispatch(
      //   actions.user.saveCurrentLocation({
      //     latitude: info.coords.latitude,
      //     longitude: info.coords.longitude,
      //     latitudeDelta: 0.1,
      //     longitudeDelta: 0.1,
      //   }),
      // );
    });
    store.dispatch(
      actions.user.saveCurrentLocation({
        latitude: 21.008535,
        longitude: 105.836519,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }),
    );
  };

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
