import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screen/welcome';
import LoginScreen from '../screen/login';
import RegisterScreen from '../screen/register';
import OTPScreen from '../screen/otp';
import TOSScreen from '../screen/tos';
import FilterScreen from '../screen/filter';
import ListJobs from '../screen/list-jobs';
import ListSeenJobs from '../screen/list-seen-jobs';
import HomeTabNavigator from './home-tab-navigator';

const Stack = createStackNavigator();

export default function Route() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListSeenJobs"
        component={ListSeenJobs}
        options={{title: 'Danh sách công việc đã xem'}}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Đăng nhập'}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: 'Đăng ký'}}
      />
      <Stack.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{title: 'Xác minh SĐT'}}
      />
      <Stack.Screen
        name="TOS"
        component={TOSScreen}
        options={{title: 'Điều khoản và chính sách'}}
      />
      <Stack.Screen
        name="Filter"
        component={FilterScreen}
        options={{title: 'Lọc kết quả'}}
      />
      <Stack.Screen
        name="ListJob"
        component={ListJobs}
        options={{title: 'Danh sách công việc'}}
      />
    </Stack.Navigator>
  );
}
