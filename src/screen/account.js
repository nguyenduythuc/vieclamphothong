import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {ListItem, Icon} from 'react-native-elements';

const list = [
  {
    title: 'Hồ sơ',
    screen: 'Profile',
  },
  {
    title: 'Danh sách công việc',
    screen: 'ListJobs',
  },
  {
    title: 'Công việc đã xem',
    screen: 'ListSeenJobs',
  },
  {
    title: 'Công việc đã lưu',
    screen: 'ListSavedJobs',
  },
  {
    title: 'Công việc đã ứng tuyển',
    screen: 'ListAppliedJobs',
  },
  // {
  //   title: 'Lịch phỏng vấn',
  //   screen: 'InterviewDate',
  // },
  // {
  //   title: 'Hotline',
  //   screen: 'Hotline',
  // },
  // {
  //   title: 'Cài đặt',
  //   screen: 'Setting',
  // },
  // {
  //   title: 'Thông báo',
  //   screen: 'Notification',
  // },
];
const AccountScreen = ({navigation}) => {
  const user = useSelector((state) => state.user);

  function onSelectedItem(screen) {
    navigation.navigate(screen);
  }

  console.log(user);

  return (
    <SafeAreaView>
      <View style={styles.userInfo}>
        <Icon
          style={styles.avatar}
          name="face"
          type="material-community"
          color="#517fa4"
          size={100}
        />
        <View>
          <Text style={styles.username}>Nguyen Van A</Text>
          <Text>098 765 43 21</Text>
        </View>
      </View>
      {list.map((item, i) => (
        <ListItem
          key={i}
          chevron
          bottomDivider
          title={item.title}
          onPress={() => onSelectedItem(item.screen)}
          contentContainerStyle={styles.featureItem}
        />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    margin: 20,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  avatar: {
    marginRight: 20,
  },
  featureItem: {height: 50},
});

export default AccountScreen;
