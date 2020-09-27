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
import {Icon, Button} from 'react-native-elements';
import {JobAppliedItem, Sortable} from '../components';
import {RecruitmentApi} from '../api';
import {useSelector} from 'react-redux';
const ENTRIES2 = [
  {
    value: 'ALL',
    label: 'Tất cả',
    index: 1,
  },
  {
    value: '0',
    label: 'Đang đợi doanh nghiệp trả lời',
    index: 2,
  },
  {
    value: '1',
    label: 'Được mời phỏng vấn',
    index: 3,
  },
  {
    value: '2',
    label: 'Đã đồng ý phỏng vấn',
    index: 4,
  },
  {
    value: '3',
    label: 'Đã từ chối phỏng vấn',
    index: 5,
  },
  {
    value: '4',
    label: 'Doanh nghiệp đã từ chối',
    index: 6,
  },
];

const ListAppliedJobs = ({navigation}) => {
  const [listAppliedJobs, setListAppliedJobs] = useState([]);
  const [sortId, setSortId] = useState('ALL');
  const [sortValue, setSortValue] = useState(ENTRIES2[0]);
  const [paramStatus, setParamStatus] = useState('');
  const [sortList, setSortList] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const userLocation = useSelector((state) => state.user.userLocation);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getListData();
    setSortList(ENTRIES2);
  }, []);
  useEffect(() => {
    getListData();
  }, [getListData]);
  const getListData = useCallback(
    (param) => {
      console.log(paramStatus);
      RecruitmentApi.getListApplied(
        `location=${userLocation.latitude},${userLocation.longitude}`,
        param || paramStatus,
      ).then((response) => {
        setTotalQuantity(response.meta.total);
        setListAppliedJobs(response.data);
      });
    },
    [paramStatus, userLocation.latitude, userLocation.longitude],
  );
  const onPressDeleteItem = (idRecuitment) => {
    RecruitmentApi.deleteAppliedRecruitment(idRecuitment).then((response) => {
      getListData();
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Thành công!',
        text2: 'Đã xóa công việc đã ứng tuyển thành công.',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 70,
      });
    });
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onPressTag = useCallback(
    (radio) => {
      setSortValue(radio);
      let param = radio.value === 'ALL' ? '' : `&filter[status]=${radio.value}`;
      setListAppliedJobs([]);
      // setMetaResponse({});
      // setIsLoading(true);
      setParamStatus(param);
      getListData(param);
      toggleModal();
    },
    [getListData, toggleModal],
  );

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>
            Tổng số: {totalQuantity} công việc
          </Text>
          <Button
            icon={
              <Icon name="filter" type="antdesign" color="#517fa4" size={19} />
            }
            buttonStyle={styles.listButtonBackgroundStyle}
            onPress={toggleModal}
            type="clear"
          />
        </View>
        {/* <View style={styles.sidebarCustom}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TagSort data={sortList} activeId={sortId} onClick={onPressTag} />
          </ScrollView>
        </View> */}
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
          title="Lọc theo"
          sortValue={sortValue}
          onPressTag={onPressTag}
        />
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
  },
  view: {
    backgroundColor: 'white',
  },
  sidebarCustom: {
    paddingTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  listButtonBackgroundStyle: {
    backgroundColor: 'white',
    borderColor: '#3c89ff',
    borderWidth: 1,
  },
});

export default ListAppliedJobs;
