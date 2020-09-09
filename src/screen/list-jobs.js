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
  const [listJobs, setListJobs] = useState([]);
  const [metaResponse, setMetaResponse] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const userLocation = useSelector((state) => state.user.userLocation);

  // useEffect(() => {
  //   setSortList(ENTRIES2);
  //   getListData(paramSend);
  //   setIsLoading(true);
  // }, [getListData, paramSend]);
  useEffect(() => {
    if (metaResponse.current_page === page) return;
    console.log('page', page)
    console.log('page', metaResponse);
    // if (isLoading) return;
    getListData(paramSend);
  }, [page, isLoading, metaResponse.current_page, getListData, paramSend, metaResponse]);

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
      // console.log('page', page);
      RecruitmentApi.getList(
        `filter[location]=${userLocation.latitude},${userLocation.longitude},100&include=educational_background,occupation,workplace,company${param}`,
      )
        .then((response) => {
          setListJobs(response.data);
          setMetaResponse(response.meta);
          let pageF = page + 1;
          setPage(pageF);
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    },
    [page, userLocation.latitude, userLocation.longitude],
  );
  const loadMore = () => {
    setIsLoading(true);
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
    return isLoading ? (
      <View style={styles.footerLoading}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  return (
    <SafeAreaView>
      <View style={styles.blockTitle}>
        <Text style={styles.blockTitleText}>
          Tổng số: {metaResponse.total_quantity} công việc
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
