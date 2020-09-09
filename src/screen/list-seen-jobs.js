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
import {JobItem, TagSort} from '../components';
import {RecruitmentApi} from '../api';
import {useSelector} from 'react-redux';

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

const ListSeenJobs = ({navigation}) => {
  const [listJobs, setListJobs] = useState([]);
  const [sortId, setSortId] = useState('ALL');
  const [sortList, setSortList] = useState([]);
  const [paramSend, setParamSend] = useState('');
  const [totalQuantity, setTotalQuantity] = useState(0);
  const userLocation = useSelector((state) => state.user.userLocation);

  useEffect(() => {
    setSortList(ENTRIES2);
    getListData(paramSend);
  }, [getListData, paramSend]);

  const onPressTag = (value) => {
    console.log(value);
    setSortId(value);
    let param = value === 'ALL' ? '' : `&sort=${value}`;
    setParamSend(param);
    getListData(param);
  };

  const getListData = useCallback(
    (param) => {
      RecruitmentApi.getList(
        `filter[location]=${userLocation.latitude},${userLocation.longitude},100&include=educational_background,occupation,workplace,company&filter[seen]=true${param}`,
      ).then((response) => {
        setTotalQuantity(response.meta.total);
        setListJobs(response.data);
      });
    },
    [userLocation.latitude, userLocation.longitude],
  );

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>
            Tổng số: {totalQuantity} công việc
          </Text>
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
                <JobItem
                  item={item}
                  navigation={navigation}
                  getListData={getListData}
                  param={paramSend}
                />
              ))}
            </View>
          </View>
        )}
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
    paddingTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});

export default ListSeenJobs;
