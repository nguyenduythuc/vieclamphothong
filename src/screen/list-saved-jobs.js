/* eslint-disable react-native/no-inline-styles */
/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {JobAppliedItem} from '../components';
import {RecruitmentApi} from '../api';
import {useSelector} from 'react-redux';

const ListSavedJobs = ({navigation}) => {
  const [listSavedJobs, setListSavedJobs] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const userLocation = useSelector((state) => state.user.userLocation);

  useEffect(() => {
    getListData();
  }, []);
  const getListData = () => {
    RecruitmentApi.getListSaved(
      `location=${userLocation.latitude},${userLocation.longitude}`,
    ).then((response) => {
      setTotalQuantity(response.meta.total);
      setListSavedJobs(response.data);
    });
  };
  const onPressDeleteItem = (idRecuitment) => {
    RecruitmentApi.deleteSavedRecruitment(idRecuitment).then((response) => {
      getListData();
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Thành công!',
        text2: 'Đã xóa thành công.',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 70,
      });
    });
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>
            Tổng số: {totalQuantity} công việc
          </Text>
        </View>
        <View style={styles.hairLine} />
        <View style={styles.row}>
          <View style={styles.item}>
            {listSavedJobs.map((item, idx) => (
              <JobAppliedItem
                item={item}
                isSaved
                deleteItem={onPressDeleteItem}
                navigation={navigation}
              />
            ))}
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
  item: {
    width: '100%',
    height: '50%',
  },
  blockTitleText: {
    fontSize: 16,
    fontWeight: '500',
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
    // margin: 30,
  },
  view: {
    // justifyContent: 'flex-end',
    // margin: 0,
    backgroundColor: 'white',
  },
});

export default ListSavedJobs;
