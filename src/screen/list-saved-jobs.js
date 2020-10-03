/* eslint-disable react-native/no-inline-styles */
/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import {JobAppliedItem} from '../components';
import Modal from 'react-native-modal';
import {RecruitmentApi} from '../api';
import {useSelector} from 'react-redux';

const ListSavedJobs = ({navigation}) => {
  const [listSavedJobs, setListSavedJobs] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const userLocation = useSelector((state) => state.user.userLocation);
  const [isModalVisibleAlert, setModalVisibleAlert] = useState(false);
  const [idForDelete, setIdForDelete] = useState('');

  useEffect(() => {
    getListData();
  }, []);
  const getListData = useCallback(() => {
    RecruitmentApi.getListSaved(
      `location=${userLocation.latitude},${userLocation.longitude}`,
    ).then((response) => {
      setTotalQuantity(response.meta.total);
      setListSavedJobs(response.data);
    });
  }, [userLocation.latitude, userLocation.longitude]);
  const onPressDeleteItem = (idRecuitment) => {
    toggleModalAlert();
    setIdForDelete(idRecuitment);
  };
  const deleteItem = useCallback(
    (idRecuitment) => {
      RecruitmentApi.deleteSavedRecruitment(idForDelete).then((response) => {
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
    },
    [getListData, idForDelete, toggleModalAlert],
  );
  const toggleModalAlert = () => {
    setModalVisibleAlert(!isModalVisibleAlert);
  };

  return (
    <SafeAreaView>
      <View style={styles.blockTitle}>
        <Text style={styles.blockTitleText}>
          Tổng số: {totalQuantity} công việc
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
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
    // paddingTop: 20,
    fontSize: 20,
    color: 'blue',
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 10,
    borderRadius: 10,
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
    // margin: 30,
  },
  view: {
    // justifyContent: 'flex-end',
    // margin: 0,
    backgroundColor: 'white',
  },
  btnViewResult: {
    paddingHorizontal: 30,
  },
});

export default ListSavedJobs;
