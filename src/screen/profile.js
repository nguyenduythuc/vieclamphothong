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
import {Card, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../app-redux';
import {UserApi} from '../api';
import moment from 'moment';

const bg = require('../assets/bg1.png');
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  useEffect(() => {
    UserApi.getProfile().then((response) => {
      dispatch(actions.user.saveProfile(response.data));
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.header}>
            <Image source={bg} style={styles.imageProfile} />
            <View>
              <Text style={styles.headerText}>Thanh Tran</Text>
              <Text style={styles.headerText}>0987654321</Text>
            </View>
          </View>
          <Icon
            name="form"
            type="antdesign"
            color="#517fa4"
            size={28}
            onPress={() => {
              navigation.navigate('ProfileEdit');
            }}
          />
        </View>
        <View>
          <Card containerStyle={styles.cardContainer}>
            <View>
              <Text style={styles.noteHeader}>Tiểu sử:</Text>
            </View>
            <View>
              <Text>{`Họ và tên: ${userProfile?.full_name}`}</Text>
              <Text>{`Ngày sinh: ${moment(userProfile?.dob).format(
                'DD/MM/YYYY',
              )}`}</Text>
              <Text>{`Giới tính: ${
                userProfile.gender === 'male' ? 'Nam' : 'Nữ'
              }`}</Text>
              <Text>{`Địa chỉ đang cư trú: ${userProfile?.address}`}</Text>
            </View>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <View>
              <Text style={styles.noteHeader}>Liên hệ:</Text>
            </View>
            <View>
              <Text>{`Điện thoại: ${userProfile?.phone_number}`}</Text>
              <Text>{`Email: ${userProfile?.email}`}</Text>
            </View>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <View>
              <Text style={styles.noteHeader}>Học tập:</Text>
            </View>
            <View>
              <Text>{`Trình độ: ${userProfile?.resume?.educational_background_id}`}</Text>
              <Text>{`Trường: ${userProfile?.resume?.education_description}`}</Text>
            </View>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <View>
              <Text style={styles.noteHeader}>Kinh nghiệm:</Text>
            </View>
            <View>
              <Text>{`Số năm: ${userProfile?.resume?.experience}`}</Text>
              <Text>{`Công việc: ${userProfile?.resume?.experience_description}`}</Text>
            </View>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <View>
              <Text style={styles.noteHeader}>Giới thiệu bản thân:</Text>
            </View>
            <View>
              <Text>{userProfile?.introduce}</Text>
            </View>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <View>
              <Text style={styles.noteHeader}>Công việc mong muốn:</Text>
            </View>
            <View>
              {userProfile?.resume?.occupations.map((item, idx) => (
                <Text>- {item?.name}</Text>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerText: {
    fontSize: 20,
    lineHeight: 25,
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
    borderRadius: 60,
    marginRight: 20,
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
