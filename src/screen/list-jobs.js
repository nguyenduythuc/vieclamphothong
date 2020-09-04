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
import {Icon, Button} from 'react-native-elements';
import {JobItem, TagSort} from '../components';
import {RecruitmentApi} from '../api';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../app-redux';

const ENTRIES2 = [
  {
    value: 'ALL',
    label: 'Tất cả',
  },
  {
    value: 'salary',
    label: 'Lương tăng dần',
  },
  {
    value: '-salary',
    label: 'Lương giảm dần',
  },
  {
    value: 'distance',
    label: 'Khoảng cách lớn dần',
  },
  {
    value: '-distance',
    label: 'Khoảng cách nhỏ dần',
  },
];

const ListJobs = ({navigation}) => {
  const dispatch = useDispatch();
  const [sortList, setSortList] = useState([]);
  const [sortId, setSortId] = useState('ALL');
  const listJobs = useSelector((state) => state.recruitment.listJobs);
  const userLocation = useSelector((state) => state.user.userLocation);

  useEffect(() => {
    console.log('didmount');
    setSortList(ENTRIES2);
  }, []);

  const onFilter = useCallback(() => {
    navigation.navigate('Filter');
  }, [navigation]);

  const onPressTag = (value) => {
    console.log(value);
    setSortId(value);
    let param = value === 'ALL' ? '' : `&sort=${value}`;
    getListJob(param);
  };

  const getListJob = useCallback(
    (param) => {
      RecruitmentApi.getList(
        `filter[location]=${userLocation.latitude},${userLocation.longitude},100&include=educational_background,occupation,workplace,company${param}`,
      ).then((response) => {
        dispatch(actions.recruitment.saveListJobs(response.data));
        console.log(response);
      });
    },
    [dispatch, userLocation.latitude, userLocation.longitude],
  );

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>
            Tổng số: {listJobs?.length} công việc
          </Text>
          <View style={styles.row}>
            <Button
              icon={
                <Icon
                  name="filter"
                  type="antdesign"
                  color="#517fa4"
                  size={18}
                />
              }
              buttonStyle={styles.filterBtn}
              title="Lọc"
              titleStyle={styles.titleStyleBtn}
              type="outline"
              onPress={onFilter}
            />
          </View>
        </View>
        <View style={styles.sidebarCustom}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TagSort data={sortList} activeId={sortId} onClick={onPressTag} />
          </ScrollView>
        </View>
        {listJobs?.length > 0 && (
          <View style={styles.row}>
            <View style={styles.item}>
              {listJobs?.map((item, idx) => (
                <JobItem item={item} isList />
              ))}
            </View>
          </View>
        )}
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
  sidebarCustom: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  filterBtn: {
    backgroundColor: 'white',
    paddingVertical: 3,
  },
  titleStyleBtn: {
    fontSize: 14,
  },
});

export default ListJobs;
