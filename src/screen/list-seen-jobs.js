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
import {JobItem, Sortable} from '../components';

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
const ENTRIES2 = [
  {
    id: 1,
    text: 'Luơng tăng dần',
  },
  {
    id: 2,
    text: 'Lương giảm dần',
  },
  {
    id: 3,
    text: 'Khoảng cách xa dần',
  },
  {
    id: 4,
    text: 'Sao đánh giá',
  },
  {
    id: 5,
    text: 'Công việc đã xem',
  },
];

const ListSeenJobs = ({navigation}) => {
  const [entries, setEntries] = useState([]);
  const [sortList, setSortList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('didmount');
    setEntries(ENTRIES1);
    setSortList(ENTRIES2);
  }, []);
  const toggleModal = (string) => {
    // setModalVisible(!isModalVisible);
    console.log(string);
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
              <JobItem item={item} isSeen />
            ))}
          </View>
        </View>
        <Sortable
          toggleModal={toggleModal}
          isModalVisible={isModalVisible}
          sortList={sortList}
          title="LỌC KẾT QUẢ"
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
});

export default ListSeenJobs;
