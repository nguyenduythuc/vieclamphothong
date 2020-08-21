/* eslint-disable react-native/no-inline-styles */
/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {Card, Divider, Button} from 'react-native-elements';
const profile = {
  name: 'Nguyễn Văn Tuấn',
  birthDay: '12/12/1992',
  gender: 'Nam',
  currentAddress: 'Phú Cường - Sóc Sơn - HN',
  phone: '0987654321',
  email: 'tuannguyen@gmail.com',
  level: 'THPT',
  school: 'THPT Sóc Sơn',
  experienceYears: 5,
  jod: 'Nhân viên lắp ráp.',
  genitive: 'Hòa đồng',
  jobWish: 'Cái gì cũng được',
};
const bg = require('../assets/bg1.png');
const Profile = ({navigation}) => {
  useEffect(() => {
    console.log('didmount');
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Image source={bg} style={styles.imageProfile} />
          <View style={styles.btnHeader}>
            <View style={styles.col}>
              <Button
                title="Sửa"
                buttonStyle={styles.btnEdit}
                type="outline"
                titleStyle={{color: 'white'}}
                onPress={() => {}}
              />
            </View>
            <View style={styles.col}>
              <Button
                title="Lưu"
                buttonStyle={styles.btnSave}
                type="outline"
                titleStyle={{color: '#4a5568'}}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
        <Card containerStyle={styles.cardContainer}>
          <View>
            <Text style={styles.noteHeader}>Tiểu sử:</Text>
          </View>
          <View>
            <Text>{`Họ và tên: ${profile.name}`}</Text>
            <Text>{`Ngày sinh: ${profile.birthDay}`}</Text>
            <Text>{`Giới tính: ${profile.gender}`}</Text>
            <Text>{`Địa chỉ đang cư trú: ${profile.currentAddress}`}</Text>
          </View>
          <Divider style={styles.divider} />
          <View>
            <Text style={styles.noteHeader}>Liên hệ:</Text>
          </View>
          <View>
            <Text>{`Điện thoại: ${profile.phone}`}</Text>
            <Text>{`Email: ${profile.email}`}</Text>
          </View>
          <Divider style={styles.divider} />
          <View>
            <Text style={styles.noteHeader}>Học tập:</Text>
          </View>
          <View>
            <Text>{`Trình độ: ${profile.level}`}</Text>
            <Text>{`Trường: ${profile.school}`}</Text>
          </View>
          <Divider style={styles.divider} />
          <View>
            <Text style={styles.noteHeader}>Kinh nghiệm:</Text>
          </View>
          <View>
            <Text>{`Số năm: ${profile.experienceYears}`}</Text>
            <Text>{`Công việc: ${profile.jod}`}</Text>
          </View>
          <Divider style={styles.divider} />
          <View>
            <Text style={styles.noteHeader}>Giới thiệu bản thân:</Text>
          </View>
          <View>
            <Text>{profile.genitive}</Text>
          </View>
          <Divider style={styles.divider} />
          <View>
            <Text style={styles.noteHeader}>Công việc mong muốn:</Text>
          </View>
          <View>
            <Text>{profile.jobWish}</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 8,
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
  imageProfile: {
    height: 120,
    width: 120,
    borderRadius: 12,
  },
  btnHeader: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  btnSave: {
    backgroundColor: '#fed7d7',
  },
  btnEdit: {
    backgroundColor: '#48bb78',
  },
});

export default Profile;
