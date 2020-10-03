/* eslint-disable react-native/no-inline-styles */
/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Icon, Button} from 'react-native-elements';
import Modal from 'react-native-modal';
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
  const [sortValue, setSortValue] = useState(ENTRIES2[0]);
  const [paramStatus, setParamStatus] = useState('');
  const [sortList, setSortList] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const userLocation = useSelector((state) => state.user.userLocation);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleAlert, setModalVisibleAlert] = useState(false);
  const [idForDelete, setIdForDelete] = useState('');

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
  const callBackFromItem = (id, action) => {
    const newListJobs = listAppliedJobs.map((item) => {
      if (item.id === id && action === 'SAVE') {
        const newItem = {...item, has_save: true};
        return newItem;
      }
      if (item.id === id && action === 'APPLY') {
        const newItem = {...item, has_apply: true};
        return newItem;
      }
      if (item.id === id && action === 'SEEN') {
        const newItem = {...item, has_seen: true};
        console.log(newItem);
        return newItem;
      }
      return item;
    });
    setListAppliedJobs(newListJobs);
  };
  const onPressDeleteItem = (idRecuitment) => {
    toggleModalAlert();
    setIdForDelete(idRecuitment);
  };
  const deleteItem = useCallback(
    (idRecuitment) => {
      RecruitmentApi.deleteAppliedRecruitment(idForDelete).then((response) => {
        getListData();
        toggleModalAlert();
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
      toggleModalAlert();
    },
    [getListData, idForDelete, toggleModalAlert],
  );
  const toggleModalAlert = () => {
    setModalVisibleAlert(!isModalVisibleAlert);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onPressTag = useCallback(
    (radio) => {
      setSortValue(radio);
      let param = radio.value === 'ALL' ? '' : `&filter[status]=${radio.value}`;
      setListAppliedJobs([]);
      setParamStatus(param);
      getListData(param);
      toggleModal();
    },
    [getListData, toggleModal],
  );

  return (
    <SafeAreaView>
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
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <View style={styles.item}>
            {listAppliedJobs.map((item, idx) => (
              <JobAppliedItem
                item={item}
                isApplied
                navigation={navigation}
                deleteItem={onPressDeleteItem}
                callBackFromItem={callBackFromItem}
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
      <Modal isVisible={isModalVisibleAlert} style={styles.modalView}>
        <View style={[styles.modalContent]}>
          <Text style={styles.textAlert}>
            Bạn muốn xóa công việc này khỏi danh sách?
          </Text>

          <View style={styles.groupBtnDialog}>
            <Button
              title="Hủy"
              onPress={toggleModalAlert}
              type="outline"
              buttonStyle={styles.btnViewResult}
            />
            <Button
              title="Đồng ý"
              onPress={deleteItem}
              buttonStyle={styles.btnViewResult}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textAlert: {
    paddingBottom: 20,
    fontSize: 18,
  },
  textBtnCancel: {
    paddingTop: 20,
    fontSize: 20,
  },
  textAlertOk: {
    paddingTop: 20,
    fontSize: 20,
    color: 'blue',
  },
  groupBtnDialog: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalView: {
    paddingHorizontal: 30,
    flex: 1,
    width: '100%',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  container: {
    backgroundColor: '#f7fafc',
    paddingBottom: 60,
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
    marginBottom: 10,
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
  btnViewResult: {
    paddingHorizontal: 30,
  },
});

export default ListAppliedJobs;
