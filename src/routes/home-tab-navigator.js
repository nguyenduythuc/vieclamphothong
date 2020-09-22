import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/home';
import DeviceInfo from 'react-native-device-info';
import LegalConsultantScreen from '../screen/legal-consultant';
import AccountScreen from '../screen/account';

const Tab = createBottomTabNavigator();
const isNotch = DeviceInfo.hasNotch();
export default function HomeTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 17,
        },
        style: {
          paddingBottom: isNotch ? 30 : 10,
        },
      }}>
      <Tab.Screen
        key="Home"
        name="Home"
        component={HomeScreen}
        options={{title: 'Việc làm'}}
      />
      <Tab.Screen
        key="LegalConsultant"
        name="LegalConsultant"
        component={LegalConsultantScreen}
        options={{title: 'Tư vấn luật'}}
      />
      <Tab.Screen
        key="Account"
        name="Account"
        component={AccountScreen}
        options={{title: 'Tài khoản'}}
      />
    </Tab.Navigator>
  );
}
