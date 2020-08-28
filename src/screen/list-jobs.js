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
import {RecruitmentApi} from '../api';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../app-redux';

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

const ListJobs = ({navigation}) => {
  const dispatch = useDispatch();
  const [sortList, setSortList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const listJobs = useSelector((state) => state.recruitment.listJobs);

  useEffect(() => {
    console.log('didmount');
    setSortList(ENTRIES2);
  }, []);
  useEffect(() => {
    if (listJobs.length > 0) {
      return;
    }
    RecruitmentApi.getList(
      'filter[location]=21.312542,105.704714,10&include=educational_background,occupation,workplace,company',
    ).then((response) => {
      dispatch(actions.recruitment.saveListJobs(response.data));
    });
  }, [dispatch, listJobs]);

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
          <Text style={styles.blockTitleText}>
            Tổng số: {listJobs?.length} công việc
          </Text>
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
        {listJobs.length > 0 && (
          <View style={styles.row}>
            <View style={styles.item}>
              {listJobs.map((item, idx) => (
                <JobItem item={item} isList />
              ))}
            </View>
          </View>
        )}
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

export default ListJobs;
