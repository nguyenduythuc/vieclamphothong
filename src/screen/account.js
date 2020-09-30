import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ListItem, Icon} from 'react-native-elements';
import {actions} from '../app-redux';
import {UserApi} from '../api';

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
  // {
  //   title: 'Điều khoản sử dụng',
  //   screen: 'Notification',
  //   iconName: 'profile',
  //   iconType: 'antdesign',
  // },
];
const AccountScreen = ({navigation}) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user?.userProfile);
  useEffect(() => {
    UserApi.getProfile().then((response) => {
      dispatch(actions.user.saveProfile(response.data));
    });
  }, []);

  const [avatarSource, setAvatarSource] = useState(
    userProfile?.profile_picture,
  );
  function onSelectedItem(screen) {
    navigation.navigate(screen);
  }

  console.log(user);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.header}>
            <View
              style={[
                styles.avatar,
                styles.avatarContainer,
                {marginBottom: 20},
              ]}>
              <Image style={styles.avatar} source={{uri: avatarSource}} />
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
});

export default AccountScreen;
