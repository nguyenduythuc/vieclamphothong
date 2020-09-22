/* eslint-disable react-native/no-inline-styles */
/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import {Card, Icon, Divider} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../app-redux';
import ImagePicker from 'react-native-image-picker';
import {formatCurrency, formatCurrencyToSring} from '../utils/common';
import {UserApi} from '../api';
import moment from 'moment';

const defaultAvatar = require('../assets/default-avatar.png');
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user?.userProfile);

  const [avatarSource, setAvatarSource] = useState(
    userProfile?.profile_picture,
  );
  const selectPhotoTapped = () => {
    const options = {
      title: 'Chọn một ảnh',
      quality: 1.0,
      takePhotoButtonTitle: 'Chụp ảnh',
      chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
      cancelButtonTitle: 'Hủy',
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};
        const photo = {
          uri: response.uri,
          type: response.type,
          name: 'avatar.jpg',
        };
        const formData = new FormData();
        console.log('formData', formData);
        formData.append('image', photo);
        formData.append('_method', 'PUT');
        console.log(formData);
        UserApi.updateAvatarProfile(formData).then((apiResponse) => {
          console.log(apiResponse);
          dispatch(actions.user.saveProfile(apiResponse.data));
          setAvatarSource(apiResponse.data?.profile_picture);
        });
      }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={selectPhotoTapped}
              styles={styles.uploadWrapper}>
              <View
                style={[
                  styles.avatar,
                  styles.avatarContainer,
                  {marginBottom: 20},
                ]}>
                {avatarSource === null ? (
                  <Text>Chọn ảnh đại diện</Text>
                ) : (
                  <Image style={styles.avatar} source={{uri: avatarSource}} />
                )}
              </View>
              {/* <Text styles={styles.textUpload}>Chọn ảnh</Text> */}
            </TouchableOpacity>
            <View>
              <Text style={styles.headerText}>{userProfile.full_name}</Text>
              <Text style={styles.headerText}>{userProfile.phone_number}</Text>
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
              <Divider style={styles.divider} />
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
              <Divider style={styles.divider} />
            </View>
            <View>
              <Text>{`Điện thoại: ${userProfile?.phone_number}`}</Text>
              <Text>{`Email: ${userProfile?.email}`}</Text>
            </View>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <View>
              <Text style={styles.noteHeader}>Trình độ học vấn:</Text>
              <Divider style={styles.divider} />
            </View>
            <View>
              <Text>{`Trình độ: ${userProfile?.resume?.educational_background_id}`}</Text>
              <Text>{`Trường: ${userProfile?.resume?.education_description}`}</Text>
            </View>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <View>
              <Text style={styles.noteHeader}>Kinh nghiệm:</Text>
              <Divider style={styles.divider} />
            </View>
            <View>
              <Text>{`Số năm làm việc: ${userProfile?.resume?.experience}`}</Text>
              <Text>{`Công việc: ${userProfile?.resume?.experience_description}`}</Text>
            </View>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <View>
              <Text style={styles.noteHeader}>Công việc mong muốn:</Text>
              <Divider style={styles.divider} />
            </View>
            <View style={styles.primary}>
              <Text style={styles.textPrimary}>Công việc chính:</Text>
              {userProfile?.resume?.primary_occupation && (
                <Text>- {userProfile?.resume?.primary_occupation?.name}</Text>
              )}
            </View>
            <View>
              <Text style={styles.textPrimary}>Công việc phụ:</Text>
              {userProfile?.resume?.secondary_occupations.map((item, idx) => (
                <Text>- {item?.name}</Text>
              ))}
            </View>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <View>
              <Text style={styles.noteHeader}>Mức lương mong muốn:</Text>
              <Divider style={styles.divider} />
            </View>
            <View style={styles.salaryWrapper}>
              <Text>Mức lương: </Text>
              <Text style={styles.textSalary}>{`${formatCurrencyToSring(
                userProfile?.resume?.expect_price_min,
              )} - ${formatCurrencyToSring(
                userProfile?.resume?.expect_price_max,
              )} triệu`}</Text>
            </View>
          </Card>
          <Card containerStyle={styles.cardContainer}>
            <View>
              <Text style={styles.noteHeader}>Giới thiệu bản thân:</Text>
              <Divider style={styles.divider} />
            </View>
            <View>
              <Text>{userProfile?.introduce}</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  salaryWrapper: {
    flexDirection: 'row',
  },
  textSalary: {
    marginBottom: 5,
    fontWeight: '600',
  },
  primary: {
    marginBottom: 10,
  },
  textPrimary: {
    marginBottom: 5,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerText: {
    fontSize: 20,
    lineHeight: 25,
    width: 150,
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
    textTransform: 'uppercase',
    fontWeight: '500',
    color: '#3182ce',
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
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  textUpload: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  uploadWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: 100,
  },
});

export default Profile;
