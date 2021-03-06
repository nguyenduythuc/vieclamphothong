import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/home';
import DeviceInfo from 'react-native-device-info';
import LegalConsultantScreen from '../screen/legal-consultant';
import AccountScreen from '../screen/account';
import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();
const isNotch = DeviceInfo.hasNotch();
export default function HomeTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 17,
          // color: '#3182ce',
        },
        style: {
          paddingBottom: isNotch ? 30 : 10,
          paddingTop: isNotch ? 10 : 5,
          height: isNotch ? 90 : 70,
        },
      }}>
      <Tab.Screen
        key="Home"
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Việc làm',
          tabBarIcon: ({focused}) => {
            let colorIcon = `${focused ? '#3182ce' : 'grey'}`;
            return <Icon name="search1" type="antdesign" color={colorIcon} />;
          },
        }}
      />
      <Tab.Screen
        key="LegalConsultant"
        name="LegalConsultant"
        component={LegalConsultantScreen}
        options={{
          title: 'Tư vấn luật',
          tabBarIcon: ({focused}) => {
            let colorIcon = `${focused ? '#3182ce' : 'grey'}`;
            return (
              <Icon name="commenting-o" type="font-awesome" color={colorIcon} />
            );
          },
        }}
      />
      <Tab.Screen
        key="Account"
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({focused}) => {
            let colorIcon = `${focused ? '#3182ce' : 'grey'}`;
            return <Icon name="user" type="antdesign" color={colorIcon} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
