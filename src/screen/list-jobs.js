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
  TouchableOpacity,
} from 'react-native';
import {Icon, Button, ButtonGroup} from 'react-native-elements';
import Popover from 'react-native-popover-view';
import RadioButtonRN from 'radio-buttons-react-native';
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
  const [sortValue, setSortValue] = useState({});
  const [paramSend, setParamSend] = useState('');
  const [paramFilter, setParamFilter] = useState('');
  const [listJobs, setListJobs] = useState([]);
  const [metaResponse, setMetaResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showPopover, setShowPopover] = useState(false);
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

  const onPressTag = (radio) => {
    console.log(radio.value);
    setSortId(radio.value);
    setSortValue(radio);
    setShowPopover(false);
    let param = radio.value === 'ALL' ? '' : `&sort=${radio.value}`;
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
  const onPressBtnGroup = (selectedIndexBtn) => {
    if (selectedIndexBtn === 1) {
      onFilter();
    } else {
      setShowPopover(true);
    }
  };

  const sort = () => (
    <Popover
      isVisible={showPopover}
      // onRequestClose={() => setShowPopover(false)}
      from={
        <View style={styles.buttonInGrBtn}>
          <Icon name="sort" type="font-awesome" color="#4f7ac7" size={18} />
          <Text style={styles.textStyle}>Sắp xếp</Text>
        </View>
      }>
      <View style={styles.radioGroups}>
        <RadioButtonRN
          key={Math.random()}
          // initial={sortId}
          box={false}
          data={sortList}
          selectedBtn={(e) => onPressTag(e)}
        />
      </View>
    </Popover>
  );
  const filter = () => (
    <View style={styles.buttonInGrBtn}>
      <Icon name="filter" type="antdesign" color="#4f7ac7" size={18} />
      <Text style={styles.textStyle}>Bộ lọc</Text>
    </View>
  );

  const buttons = [{element: sort}, {element: filter}];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnGrWrapper}>
        <ButtonGroup
          onPress={onPressBtnGroup}
          buttons={buttons}
          buttonContainerStyle={styles.buttonContainerStyle}
          innerBorderStyle={styles.innerBorderStyle}
          containerStyle={styles.containerStyle}
        />
      </View>
      <View style={styles.blockTitle}>
        <Text style={styles.blockTitleText}>
          Tổng số: {metaResponse.total} công việc
        </Text>
      </View>
      {/* <View style={styles.sidebarCustom}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TagSort data={sortList} activeId={sortId} onClick={onPressTag} />
          <Text style={styles.threeDots}>...</Text>
        </ScrollView>
      </View> */}
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
  radioGroups: {width: 200, padding: 10},
  flatList: {
    marginBottom: 100,
  },
  container: {
    backgroundColor: 'white',
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
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  threeDots: {
    fontSize: 20,
    paddingTop: 16,
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
  btnGrWrapper: {
    alignSelf: 'center',
  },
  buttonContainerStyle: {
    backgroundColor: '#2a86cb',
  },
  innerBorderStyle: {
    color: '#2a86cb',
  },
  containerStyle: {
    height: 40,
    width: '50%',
    borderColor: '#2a86cb',
    borderRadius: 30,
  },
  buttonInGrBtn: {
    flexDirection: 'row',
  },
  textStyle: {
    paddingLeft: 5,
    color: '#4f7ac7',
    fontWeight: '800',
  },
});

export default memo(ListJobs);
