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
import Toast from 'react-native-toast-message';
import {JobAppliedItem, TagSort} from '../components';
import {RecruitmentApi} from '../api';
import {useDispatch, useSelector} from 'react-redux';

const ListSavedJobs = ({navigation}) => {
  const [listAppliedJobs, setListAppliedJobs] = useState([]);
  const [sortId, setSortId] = useState('ALL');
  const [paramStatus, setParamStatus] = useState('');
  const [sortList, setSortList] = useState([]);
  const userLocation = useSelector((state) => state.user.userLocation);
  const listStatusApplied = useSelector(
    (state) => state.recruitment.listStatusApplied,
  );

  useEffect(() => {
    getListData();
    setSortList([{label: 'Tất cả', value: 'ALL'}, ...listStatusApplied]);
  }, []);
  useEffect(() => {
    getListData();
  }, [paramStatus]);
  const getListData = useCallback(
    (param) => {
      console.log(paramStatus);
      RecruitmentApi.getListApplied(
        `location=${userLocation.latitude},${userLocation.longitude}`,
        paramStatus,
      ).then((response) => {
        setListAppliedJobs(response.data);
      });
    },
    [paramStatus, userLocation.latitude, userLocation.longitude],
  );
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
  const onPressTag = (value) => {
    console.log(value);
    setSortId(value);
    let param = value === 'ALL' ? '' : `&filter[status]=${value}`;
    setParamStatus(param);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>
            Tổng số: {listAppliedJobs.length} công việc
          </Text>
        </View>
        <View style={styles.sidebarCustom}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TagSort data={sortList} activeId={sortId} onClick={onPressTag} />
          </ScrollView>
        </View>
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
  sidebarCustom: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});

export default ListSavedJobs;
