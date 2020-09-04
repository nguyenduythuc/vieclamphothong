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
import {Icon} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import {JobAppliedItem, Sortable} from '../components';
import {RecruitmentApi} from '../api';
import {useDispatch, useSelector} from 'react-redux';

const ENTRIES2 = [
  {
    id: 1,
    text: 'Đang đợi doanh nghiệp trả lời',
  },
  {
    id: 2,
    text: 'Được mời phỏng vấn',
  },
  {
    id: 3,
    text: 'Đã đồng ý phỏng vấn',
  },
  {
    id: 4,
    text: 'Đã từ chối phỏng vấn',
  },
  {
    id: 5,
    text: 'Doanh nghiệp đã từ chối',
  },
];

const ListSavedJobs = ({navigation}) => {
  const [listAppliedJobs, setListAppliedJobs] = useState([]);
  const [sortList, setSortList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const userLocation = useSelector((state) => state.user.userLocation);

  useEffect(() => {
    getListData();
    setSortList(ENTRIES2);
  }, []);
  const getListData = () => {
    RecruitmentApi.getListApplied(
      `location=${userLocation.latitude},${userLocation.longitude}`,
    ).then((response) => {
      setListAppliedJobs(response.data);
    });
  };
  const onPressDeleteItem = (idRecuitment) => {
    console.log(idRecuitment);
    RecruitmentApi.deleteAppliedRecruitment(idRecuitment).then((response) => {
      getListData();
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Thành công!',
        text2: 'Đã xóa công việc đã ứng tuyển thành công.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 70,
      });
    });
  };

  const toggleModal = (string) => {
    console.log(string);
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>
            Tổng số: {listAppliedJobs.length} công việc
          </Text>
          <View style={styles.row}>
            <Icon
              name="sort-descending"
              type="material-community"
              color="#517fa4"
              onPress={toggleModal}
            />
          </View>
        </View>
        <View style={styles.hairLine} />
        <View style={styles.row}>
          <View style={styles.item}>
            {listAppliedJobs.map((item, idx) => (
              <JobAppliedItem
                item={item}
                isApplied
                navigation={navigation}
                deleteItem={onPressDeleteItem}
              />
            ))}
          </View>
        </View>
        <Sortable
          toggleModal={toggleModal}
          isModalVisible={isModalVisible}
          sortList={sortList}
          title="LỌC TRẠNG THÁI"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: '50%',
  },
  blockTitleText: {
    fontSize: 20,
  },
  blockTitle: {
    marginTop: 20,
    paddingLeft: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  view: {
    backgroundColor: 'white',
  },
});

export default ListSavedJobs;
