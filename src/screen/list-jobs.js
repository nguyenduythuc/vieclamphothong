/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useCallback, useEffect, memo} from 'react';
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
];
const ListJobs = ({navigation}) => {
  const [sortList, setSortList] = useState(ENTRIES2);
  const [sortId, setSortId] = useState('ALL');
  const [paramSend, setParamSend] = useState('');
  const [paramFilter, setParamFilter] = useState('');
  const [listJobs, setListJobs] = useState([]);
  const [metaResponse, setMetaResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const userLocation = useSelector((state) => state.user.userLocation);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    getListData();
  }, [isLoading]);

  const onFilter = useCallback(() => {
    navigation.navigate('Filter', {onFilterResult: onFilterResult});
  }, [navigation]);

  const onFilterResult = (param) => {
    console.log(param);
    setParamFilter(param);
    getListData(paramSend, param);
  };

  const callBackFromItem = (paramSendLocal, param, id, action) => {
    const newListJobs = listJobs.map((item) => {
      if (item.id === id && action === 'SAVE') {
        const newItem = {...item, has_save: true};
        return newItem;
      }
      if (item.id === id && action === 'APPLY') {
        const newItem = {...item, has_apply: true};
        return newItem;
      }
      return item;
    });
    setListJobs(newListJobs);
  };

  const getListData = useCallback(
    (paramSortLocal, paramFilterLocal) => {
      const distanceDefault = paramFilterLocal || paramFilter ? '' : '100';
      const pageDefault = metaResponse.current_page + 1 || 1;
      console.log(
        `page=${pageDefault}&include=educational_background,occupation,workplace,company&filter[location]=${
          userLocation.latitude
        },${userLocation.longitude},${distanceDefault}${
          paramFilterLocal || paramFilter
        }${paramSortLocal || paramSend}`,
      );
      RecruitmentApi.getList(
        `page=${pageDefault}&include=educational_background,occupation,workplace,company&filter[location]=${
          userLocation.latitude
        },${userLocation.longitude},${distanceDefault}${
          paramFilterLocal || paramFilter
        }${paramSortLocal || paramSend}`,
      )
        .then((response) => {
          console.log(response);
          const newListJob = [...listJobs, ...response.data];
          setListJobs(newListJob);
          setMetaResponse(response.meta);
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    },
    [userLocation, paramSend, paramFilter, metaResponse, listJobs],
  );

  const onPressTag = (value) => {
    setSortId(value);
    let param = value === 'ALL' ? '' : `&sort=${value}`;
    setListJobs([]);
    setMetaResponse({});
    setIsLoading(true);
    setParamSend(param);
  };

  const loadMore = () => {
    setIsLoading(true);
  };

  const renderRow = ({item}) => {
    return (
      <JobItem
        item={item}
        navigation={navigation}
        callBackFromItem={callBackFromItem}
        param={paramSend}
        paramFilter={paramFilter}
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
          Tổng số: {metaResponse.total} công việc
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

export default memo(ListJobs);
