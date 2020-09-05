/* eslint-disable react-native/no-inline-styles */
/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';
import {Icon, Card, Divider, Button} from 'react-native-elements';
const interviewLater = {
  name: 'Công ty TNHH SamSung Bắc Ninh',
  jobPosition: 'Nhân viên sản xuất',
  salary: '8-10tr',
  date: '01-01-2021',
  time: '10h',
  address:
    'Tầng 1 - Tòa nhà 1A - Công ty SamSung - Yên Trung - Yên Phong - Bắc Ninh',
  contact: 'Ms Hoa - HR',
  notes: 'Thời hạn trả lời thư',
  commitment: 'Chúng tôi cam kết không thu bất kì khoản phí nào.',
};

const InterviewLetter = ({navigation}) => {
  useEffect(() => {
    console.log('didmount');
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{interviewLater.name}</Text>
          <Text style={styles.headerText}>Mời bạn tham gia phỏng vấn</Text>
        </View>
        <Card containerStyle={styles.cardContainer}>
          <View>
            <Text>{`Vị trí công việc: ${interviewLater.jobPosition}`}</Text>
            <Text>{`Lương: ${interviewLater.salary}`}</Text>
          </View>
          <Divider style={styles.divider} />
          <View>
            <Text>{`Ngày: ${interviewLater.date}`}</Text>
            <Text>{`Giờ: ${interviewLater.time}`}</Text>
          </View>
          <Divider style={styles.divider} />
          <View>
            <Text>{`Địa chỉ: ${interviewLater.address}`}</Text>
          </View>
          <Divider style={styles.divider} />
          <View>
            <Text>{`Người liên hệ: ${interviewLater.contact}`}</Text>
          </View>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <View>
            <Text style={styles.noteHeader}>Lưu ý:</Text>
          </View>
          <View>
            <Text>{interviewLater.notes}</Text>
          </View>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <View>
            <Text style={styles.commitmentHeader}>CAM KẾT:</Text>
          </View>
          <View>
            <Text>{interviewLater.commitment}</Text>
          </View>
        </Card>
        <View style={styles.btnFooter}>
          <View style={styles.col}>
            <Button
              title="Đồng ý"
              buttonStyle={styles.btnAccess}
              type="outline"
              titleStyle={{color: 'white'}}
              onPress={() => {}}
            />
          </View>
          <View style={styles.col}>
            <Button
              title="Từ chối"
              buttonStyle={styles.btnRefuse}
              type="outline"
              titleStyle={{color: '#4a5568'}}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7fafc',
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    color: 'blue',
    fontWeight: '500',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 8,
    borderWidth: 0,
  },
  item: {
    width: '100%',
  },
  divider: {
    backgroundColor: 'grey',
    marginVertical: 10,
  },
  noteHeader: {
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  commitmentHeader: {
    textDecorationLine: 'underline',
    marginBottom: 15,
    color: 'red',
  },
  btnFooter: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  btnRefuse: {
    backgroundColor: '#fed7d7',
    paddingHorizontal: 30,
    borderWidth: 0,
  },
  btnAccess: {
    backgroundColor: '#3182ce',
    paddingHorizontal: 30,
  },
});

export default InterviewLetter;
