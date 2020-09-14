import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screen/welcome';
import LoginScreen from '../screen/login';
import RegisterScreen from '../screen/register';
import ForgotPasswordScreen from '../screen/forgot-password';
import OTPScreen from '../screen/otp';
import TOSScreen from '../screen/tos';
import FilterScreen from '../screen/filter';
import ListJobs from '../screen/list-jobs';
import ListSeenJobs from '../screen/list-seen-jobs';
import ListSavedJobs from '../screen/list-saved-jobs';
import ListAppliedJobs from '../screen/list-applied-jobs';
import InterviewLetter from '../screen/interview-letter';
import Profile from '../screen/profile';
import ProfileEdit from '../screen/profile-edit';
import SelectMultiple from '../screen/select-multiple';
import EmployerInfo from '../screen/employer-info';
import InterviewCalendar from '../screen/interview-calendar';
import HomeTabNavigator from './home-tab-navigator';

const Stack = createStackNavigator();

export default function Route() {
  return (
    <Stack.Navigator>
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
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{title: 'Quên mật khẩu'}}
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
        name="ListJobs"
        component={ListJobs}
        options={{title: 'Danh sách công việc'}}
      />
      <Stack.Screen
        name="ListSeenJobs"
        component={ListSeenJobs}
        options={{title: 'Danh sách công việc đã xem'}}
      />
      <Stack.Screen
        name="ListSavedJobs"
        component={ListSavedJobs}
        options={{title: 'Công việc đã lưu'}}
      />
      <Stack.Screen
        name="ListAppliedJobs"
        component={ListAppliedJobs}
        options={{title: 'Công việc đã ứng tuyển'}}
      />
      <Stack.Screen
        name="InterviewLetter"
        component={InterviewLetter}
        options={{title: 'Thư mời phỏng vấn'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Hồ sơ xin việc'}}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{title: 'Sửa hồ sơ'}}
      />
      <Stack.Screen
        name="EmployerInfo"
        component={EmployerInfo}
        options={{title: 'Công ty TNHH Samsung'}}
      />
      <Stack.Screen
        name="SelectMultiple"
        component={SelectMultiple}
        options={{title: 'Lựa chọn'}}
      />
      <Stack.Screen
        name="InterviewCalendar"
        component={InterviewCalendar}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
