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
  FlatList,
  ActivityIndicator,
} from 'react-native';
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
  const [paramSend, setParamSend] = useState('');
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const listJobs = useSelector((state) => state.recruitment.listJobs);
  const userLocation = useSelector((state) => state.user.userLocation);

  useEffect(() => {
    setSortList(ENTRIES2);
    getListData(paramSend);
  }, [getListData, paramSend]);
  useEffect(() => {
    getListData(paramSend);
  }, [page]);

  const onFilter = useCallback(() => {
    navigation.navigate('Filter');
  }, [navigation]);

  const onPressTag = (value) => {
    setSortId(value);
    let param = value === 'ALL' ? '' : `&sort=${value}`;
    setParamSend(param);
    getListData(param);
  };

  const getListData = useCallback(
    (param) => {
      console.log(page);
      RecruitmentApi.getList(
        `filter[location]=${userLocation.latitude},${userLocation.longitude},100&include=educational_background,occupation,workplace,company${param}`,
      ).then((response) => {
        setTotalQuantity(response.meta.total);
        dispatch(actions.recruitment.saveListJobs(response.data));
      });
    },
    [dispatch, page, userLocation.latitude, userLocation.longitude],
  );
  const loadMore = () => {
    let pageF = page + 1;
    setPage(pageF);
  };

  const renderRow = ({item}) => {
    return (
      <JobItem
        item={item}
        navigation={navigation}
        getListData={getListData}
        param={paramSend}
      />
    );
  };
  const renderFooter = () => {
    return (
      <View style={styles.footerLoading}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.blockTitle}>
        <Text style={styles.blockTitleText}>
          Tổng số: {totalQuantity} công việc
        </Text>
        <View style={styles.row}>
          <Button
            icon={
              <Icon name="filter" type="antdesign" color="#517fa4" size={18} />
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
      <FlatList
        style={styles.flatList}
        data={listJobs}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginBottom: 100,
  },
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
  filterBtn: {
    backgroundColor: 'white',
    paddingVertical: 6,
  },
  titleStyleBtn: {
    fontSize: 14,
  },
  footerLoading: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default ListJobs;
