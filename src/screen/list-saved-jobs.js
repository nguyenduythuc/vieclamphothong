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
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import {JobItem} from '../components';

const ENTRIES1 = [
  {
    title: 'Nhân viên sản xuất',
    salary: '8 - 10tr',
    quantity: 10,
    expiry: '01-01-2020',
    timeLeft: 20,
    company: 'Công ty TNHH Samsung Bắc Ninh',
    address: 'Yên Phong, Yên Trung, Bắc Ninh',
    range: '1',
  },
  {
    title: 'Earlier this morning, NYC',
    salary: '8 - 10tr',
    quantity: 10,
    expiry: '01-01-2020',
    timeLeft: 20,
    company: 'Công ty TNHH Samsung Bắc Ninh',
    address: 'Yên Phong, Yên Trung, Bắc Ninh',
    range: '1',
  },
  {
    title: 'White Pocket Sunset',
    salary: '8 - 10tr',
    quantity: 10,
    expiry: '01-01-2020',
    timeLeft: 20,
    company: 'Công ty TNHH Samsung Bắc Ninh',
    address: 'Yên Phong, Yên Trung, Bắc Ninh',
    range: '1',
  },
  {
    title: 'Acrocorinth, Greece',
    salary: '8 - 10tr',
    quantity: 10,
    expiry: '01-01-2020',
    timeLeft: 20,
    company: 'Công ty TNHH Samsung Bắc Ninh',
    address: 'Yên Phong, Yên Trung, Bắc Ninh',
    range: '1',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    salary: '8 - 10tr',
    quantity: 10,
    expiry: '01-01-2020',
    timeLeft: 20,
    company: 'Công ty TNHH Samsung Bắc Ninh',
    address: 'Yên Phong, Yên Trung, Bắc Ninh',
    range: '1',
  },
];

const ListSavedJobs = ({navigation}) => {
  const [entries, setEntries] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('didmount');
    setEntries(ENTRIES1);
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onFilter = useCallback(() => {
    navigation.navigate('Filter');
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Tổng số: 5 công việc</Text>
          <View style={styles.row}>
            <Icon
              onPress={onFilter}
              name="filter"
              type="antdesign"
              color="#517fa4"
            />
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
            {entries.map((item, idx) => (
              <JobItem item={item} isSaved />
            ))}
          </View>
        </View>
        <Modal
          isVisible={isModalVisible}
          onSwipeComplete={toggleModal}
          onBackdropPress={toggleModal}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.modalWrapper}>
          <View style={styles.view}>
            <Text>Hello!</Text>
            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </Modal>
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
    // margin: 30,
  },
  view: {
    // justifyContent: 'flex-end',
    // margin: 0,
    backgroundColor: 'white',
  },
});

export default ListSavedJobs;
