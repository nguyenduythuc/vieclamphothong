/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useCallback, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Dimensions} from 'react-native';
import {Card, SearchBar, Icon, Button} from 'react-native-elements';
import {JobItem} from '../components';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import DeviceInfo from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
import {RecruitmentApi} from '../api';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../app-redux';
import {formatCurrencyToSring} from '../utils/common';

const defaultPosition = {
  latitude: 21.312542,
  longitude: 105.704714,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};
const isNotch = DeviceInfo.hasNotch();
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const listJobs = useSelector((state) => state.recruitment.listJobs);
  const userLocation = useSelector((state) => state.user.userLocation);
  const [search, setSearch] = useState('');
  const [paramFilter, setParamFilter] = useState('');
  // const [currentPosition, setCurentPosition] = useState(defaultPosition);
  const [currentPosition, setCurentPosition] = useState(userLocation);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isShowButtonPositionChange, setIsShowButtonPositionChange] = useState(
    false,
  );

  const carouselRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef([]);
  useEffect(() => {
    getListData();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      getListData(paramFilter, search);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search, paramFilter]);

  const getListData = useCallback((paramFilterLocal, keyword) => {
    console.log('keyword', keyword);
    const distanceDefault = paramFilterLocal || paramFilter ? '' : '30';
    RecruitmentApi.getList(
      `include=educational_background,occupation,workplace,company&filter[location]=${
        currentPosition.latitude
      },${currentPosition.longitude},${distanceDefault}${
        paramFilterLocal || paramFilter
      }&keyword=${keyword}`,
    ).then((response) => {
      dispatch(actions.recruitment.saveListJobs(response.data));
    });
  }, []);

  const onSearch = useCallback((text) => {
    console.log(text);
    setSearch(text);
  }, []);

  const onFilter = useCallback(() => {
    navigation.navigate('Filter', {onFilterResult: onFilterResult});
  }, [navigation]);

  const onFilterResult = (param) => {
    console.log(param);
    setParamFilter(param);
    getListData(param);
  };
  const onPressToList = useCallback(() => {
    navigation.navigate('ListJobs');
  }, [navigation]);

  const onRegionChange = useCallback((region) => {
    setIsShowButtonPositionChange(true);
    setCurentPosition(region);
  }, []);

  const onChangePostionButton = useCallback(() => {
    RecruitmentApi.getList(
      `filter[location]=${currentPosition.latitude},${currentPosition.longitude},10&include=educational_background,occupation,workplace,company`,
    ).then((response) => {
      dispatch(actions.recruitment.saveListJobs(response.data));
    });
    setIsShowButtonPositionChange(false);
  }, [currentPosition]);

  const renderItem = useCallback(({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <JobItem item={item} navigation={navigation} isHome />
      </View>
    );
  }, []);

  const onSwipeToItem = (index) => {
    const newPosition = {...currentPosition};
    newPosition.latitude = parseFloat(listJobs[index]?.company.latitude);
    newPosition.longitude = parseFloat(listJobs[index]?.company.longitude);
    setCurentPosition(newPosition);
    setSelectedMarker(listJobs[index]?.id);
    mapRef.current?.animateCamera({center: newPosition, pitch: 45});
    markerRef.current[index].showCallout();
  };

  function onItemSelected(itemId) {
    setSelectedMarker(itemId);
    const index = listJobs.findIndex((item) => item.id === itemId);
    carouselRef.current.snapToItem(index !== -1 ? index : 0);
  }

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={styles.header}>
        <SearchBar
          onChangeText={onSearch}
          containerStyle={styles.searchBar}
          inputStyle={styles.searchBarInput}
          returnKeyType="search"
          leftIconContainerStyle={styles.leftIconContainerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          placeholder="Nhập công việc mong muốn."
          value={search}
          lightTheme
        />
        <Button
          icon={
            <Icon
              onPress={onFilter}
              name="filter"
              type="antdesign"
              color="#517fa4"
              style={{paddingRight: 5, paddingTop: 2}}
            />
          }
          buttonStyle={styles.listButtonBackgroundStyle}
          onPress={onPressToList}
          type="clear"
        />
      </View>
      {isShowButtonPositionChange && selectedMarker && (
        <Button
          icon={
            <Icon
              name="my-location"
              color="#517fa4"
              size={17}
              style={{paddingRight: 5, paddingTop: 2}}
            />
          }
          title="Tìm kiếm khu vực này"
          containerStyle={styles.changePositionButtonStyle}
          buttonStyle={styles.changePositionButtonBackgroundStyle}
          titleStyle={{fontSize: 15}}
          onPress={onChangePostionButton}
          type="clear"
        />
      )}
      <Button
        icon={
          <Icon
            name="list"
            type="fsather"
            color="#517fa4"
            size={19}
            style={{paddingRight: 5, paddingTop: 2}}
          />
        }
        title="Danh sách"
        containerStyle={styles.listButtonStyle}
        buttonStyle={styles.listButtonBackgroundStyle}
        onPress={onPressToList}
        titleStyle={{fontSize: 15}}
        type="clear"
      />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={currentPosition}
        onRegionChangeComplete={onRegionChange}>
        {listJobs?.map(
          (
            {company, id, title, description, distance, min_salary, max_salary},
            index,
          ) => (
            <Marker
              key={id}
              pinColor={selectedMarker === id ? 'red' : '#3182ce'}
              ref={(el) => (markerRef.current[index] = el)}
              onPress={() => onItemSelected(id)}
              coordinate={{
                latitude: parseFloat(company.latitude),
                longitude: parseFloat(company.longitude),
              }}
              title={`Lương: ${formatCurrencyToSring(
                min_salary,
              )} - ${formatCurrencyToSring(max_salary)}tr`}
              description={`Cách bạn: ${distance}km`}
              anchor={{x: 0.84, y: 1}}
              centerOffset={{x: -18, y: -60}}
            />
          ),
        )}
      </MapView>
      <Carousel
        ref={carouselRef}
        sliderWidth={width}
        sliderHeight={height * 0.09}
        itemWidth={width - 80}
        data={listJobs}
        onSnapToItem={onSwipeToItem}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#3182ce',
    borderRadius: 5,
    padding: 1,
  },
  map: {
    height: isNotch ? height * 0.43 : height * 0.41,
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  item: {
    width: width - 80,
    height: '50%',
  },
  changePositionButtonStyle: {
    position: 'absolute',
    zIndex: 10,
    top: isNotch ? height / 2 - 10 : height / 2 - 80,
    left: 10,
  },
  changePositionButtonBackgroundStyle: {backgroundColor: 'white'},
  listButtonStyle: {
    position: 'absolute',
    zIndex: 10,
    top: isNotch ? height / 2 - 10 : height / 2 - 50,
    right: 0,
    paddingRight: 10,
  },
  filterButtonStyle: {
    position: 'absolute',
    zIndex: 10,
    top: isNotch ? height / 3 - 10 : height / 3 - 50,
    right: 0,
    paddingRight: 10,
  },
  listButtonBackgroundStyle: {
    backgroundColor: 'white',
  },
  searchBarInput: {
    backgroundColor: 'white',
  },
  inputContainerStyle: {
    backgroundColor: 'white',
  },
});

export default HomeScreen;
