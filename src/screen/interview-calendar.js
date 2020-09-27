/**
 * DHomes: Thuc Nguyen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Dimensions} from 'react-native';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import DeviceInfo from 'react-native-device-info';
import {RecruitmentApi} from '../api';

const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  return `${year} + '-' + ${month} + '-' + ${date}`;
};
LocaleConfig.locales.vi = {
  monthNames: [
    'Tháng Một',
    'Tháng Hai',
    'Tháng Ba',
    'Tháng Bốn',
    'Tháng Năm',
    'Tháng Sáu',
    'Tháng Bảy',
    'Tháng Tám',
    'Tháng Chín',
    'Tháng Mười',
    'Tháng Mười Một',
    'Tháng Mười Hai',
  ],
  monthNamesShort: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ],
  dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vi';
const isNotch = DeviceInfo.hasNotch();
const InterviewCalendar = () => {
  const [selectedMonth, setMonth] = useState(1);
  useEffect(() => {
    RecruitmentApi.getList(
      `filter[status]=1&filter[interview_month]=${selectedMonth}`,
    );
  });
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Calendar
          current={getCurrentDate}
          style={styles.calendar}
          hideExtraDays
          // markedDates={{
          //   '2020-09-10': {
          //     selected: true,
          //     disableTouchEvent: true,
          //     selectedColor: 'orange',
          //     selectedTextColor: 'red',
          //   },
          //   '2020-09-15': {
          //     selected: true,
          //     disableTouchEvent: true,
          //     selectedColor: 'orange',
          //     selectedTextColor: 'red',
          //   },
          //   '2020-09-19': {
          //     selected: true,
          //     disableTouchEvent: true,
          //     selectedColor: 'orange',
          //     selectedTextColor: 'red',
          //   },
          //   '2020-09-20': {
          //     selected: true,
          //     disableTouchEvent: true,
          //     selectedColor: 'orange',
          //     selectedTextColor: 'red',
          //   },
          // }}
        />
        <View style={styles.textNothing}>
          <Text>Hiện tại bạn chưa có lịch phỏng vấn cho công việc nào</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 20},
  textNothing: {
    position: 'absolute',
    zIndex: 10,
    top: isNotch ? (height * 1) / 2 - 30 : (height * 1) / 2 + 30,
    alignSelf: 'center',
  },
});

export default InterviewCalendar;
