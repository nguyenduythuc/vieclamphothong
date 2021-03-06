import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ListItem, Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {actions} from '../app-redux';
import {UserApi, setToken} from '../api';

const list = [
  {
    title: 'Hồ sơ xin việc',
    screen: 'Profile',
    iconName: 'account-box-outline',
    iconType: 'material-community',
  },
  {
    title: 'Công việc đã xem',
    screen: 'ListSeenJobs',
    iconName: 'eye-check-outline',
    iconType: 'material-community',
  },
  {
    title: 'Công việc đã lưu',
    screen: 'ListSavedJobs',
    iconName: 'download',
    iconType: 'antdesign',
  },
  {
    title: 'Công việc đã nộp',
    screen: 'ListAppliedJobs',
    iconName: 'paper-plane-o',
    iconType: 'font-awesome',
  },
  {
    title: 'Lịch phỏng vấn',
    screen: 'InterviewCalendar',
    iconName: 'date',
    iconType: 'fontisto',
  },
  // {
  //   title: 'Hotline',
  //   screen: 'Hotline',
  //   iconName: 'phone-call',
  //   iconType: 'feather',
  // },
  {
    title: 'Cài đặt',
    screen: 'Settings',
    iconName: 'settings',
    iconType: 'simple-line-icon',
  },
  {
    title: 'Điều khoản sử dụng',
    screen: 'TOS',
    iconName: 'profile',
    iconType: 'antdesign',
  },
];
const AccountScreen = ({navigation}) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user?.userProfile);
  useEffect(() => {
    UserApi.getProfile().then((response) => {
      dispatch(actions.user.saveProfile(response.data));
      response.data.profile_picture
        ? setAvatarSource(response.data.profile_picture)
        : null;
    });
  }, [dispatch]);

  const [avatarSource, setAvatarSource] = useState(
    userProfile?.profile_picture || null,
  );
  function onSelectedItem(screen) {
    navigation.navigate(screen);
  }

  const onLogout = () => {
    dispatch(actions.user.saveUser({}));
    setToken('');
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };
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

  console.log(user);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.header}>
            <View>
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
                    <Icon
                      name="camera"
                      type="simple-line-icon"
                      color="#517fa4"
                      size={40}
                    />
                  ) : (
                    <Image style={styles.avatar} source={{uri: avatarSource}} />
                  )}
                </View>
              </TouchableOpacity>
              {/* <Image style={styles.avatar} source={{uri: avatarSource}} /> */}
            </View>
            <View>
              <Text style={styles.headerText}>{userProfile.full_name}</Text>
              <Text style={styles.headerText}>{userProfile.phone_number}</Text>
            </View>
          </View>
        </View>
        {list.map((item, i) => (
          <ListItem
            key={i}
            chevron
            bottomDivider
            title={item.title}
            leftIcon={{name: item.iconName, type: item.iconType}}
            onPress={() => onSelectedItem(item.screen)}
            contentContainerStyle={styles.featureItem}>
            {/* <Icon name={item.iconName} type={item.iconType} /> */}
          </ListItem>
        ))}

        <Button title="Đăng xuất" color="#517fa4" onPress={onLogout} />
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
    width: 150,
  },
  userInfo: {
    flexDirection: 'row',
    margin: 20,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  featureItem: {height: 50},
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
    marginLeft: 100,
  },
});

export default AccountScreen;
