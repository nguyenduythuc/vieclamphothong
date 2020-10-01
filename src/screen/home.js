/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useCallback, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import {Card, SearchBar, Icon, Button} from 'react-native-elements';
import {JobItem} from '../components';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import DeviceInfo from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
import {RecruitmentApi} from '../api';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../app-redux';
import {formatCurrencyToSring} from '../utils/common';
import Modal from 'react-native-modal';

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
  const [currentPosition, setCurentPosition] = useState(defaultPosition);
  // const [currentPosition, setCurentPosition] = useState(userLocation);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerPressed, setMarkerPressed] = useState(null);
  const [isShowButtonPositionChange, setIsShowButtonPositionChange] = useState(
    false,
  );
  const occupation = useSelector(
    (state) => state.recruitment?.listFilters?.occupation,
  );
  const [isModalVisibleAlert, setModalVisibleAlert] = useState(false);

  const carouselRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef([]);
  useEffect(() => {
    getListData();
  }, []);

  // useEffect(() => {
  //   getListData();
  // }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      getListData(paramFilter, search);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search, paramFilter]);

  const getListData = useCallback(
    (paramFilterLocal, keyword) => {
      const distanceDefault = paramFilterLocal || paramFilter ? '' : '30';
      RecruitmentApi.getList(
        `include=educational_background,occupation,workplace,company&filter[location]=${
          currentPosition.latitude
        },${currentPosition.longitude},${distanceDefault}${
          paramFilterLocal || paramFilter
        }&filter[title]=${keyword}`,
      ).then((response) => {
        dispatch(actions.recruitment.saveListJobs(response.data));
        setIsShowButtonPositionChange(false);
      });
    },
    [currentPosition],
  );

  const onSearch = useCallback((text) => {
    setSearch(text);
  }, []);

  const onFilter = useCallback(() => {
    navigation.navigate('Filter', {onFilterResult: onFilterResult});
  }, [navigation]);

  const onFilterResult = (param) => {
    setParamFilter(param);
    getListData(param);
  };
  const onPressToList = useCallback(() => {
    navigation.navigate('ListJobs');
  }, [navigation]);

  const onRegionChange = useCallback(
    (region) => {
      if (markerPressed) return;
      if (Math.abs(currentPosition.latitude - region.latitude) < 0.005) {
        return;
      }
      setIsShowButtonPositionChange(true);
      setCurentPosition(region);
    },
    [currentPosition, markerPressed],
  );

  const onChangePostionButton = useCallback(() => {
    getListData(paramFilter, search);
  }, [currentPosition]);

  const renderItem = useCallback(({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <JobItem item={item} navigation={navigation} isHome />
      </View>
    );
  }, []);
  const renderRow = ({item}) => {
    return (
      <TouchableOpacity
        onPress={toggleModalAlert}
        style={styles.occupationItem}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const onSwipeToItem = useCallback(
    (index) => {
      const newPosition = {...currentPosition};
      newPosition.latitude = parseFloat(listJobs[index]?.company.latitude);
      newPosition.longitude = parseFloat(listJobs[index]?.company.longitude);
      if (Platform.OS === 'android') {
        setCurentPosition(newPosition);
      }
      setSelectedMarker(listJobs[index]?.id);
      // mapRef.current?.animateCamera({center: newPosition, pitch: 45});
      markerRef.current[index].showCallout();
    },
    [currentPosition, listJobs, mapRef, markerRef],
  );

  function onItemSelected(itemId) {
    setMarkerPressed(true);
    setTimeout(() => setMarkerPressed(false), 2000);
    const index = listJobs.findIndex((item) => item.id === itemId);
    carouselRef.current.snapToItem(index !== -1 ? index : 0);
  }
  const toggleModalAlert = () => {
    setModalVisibleAlert(!isModalVisibleAlert);
  };

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
      {isShowButtonPositionChange && (
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
          titleStyle={{fontSize: 13}}
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
        titleStyle={{fontSize: 13}}
        type="clear"
      />
      <Button
        icon={<Icon name="search1" type="antdesign" color="white" size={23} />}
        containerStyle={styles.listButtonStyleSearch}
        buttonStyle={styles.listButtonBackgroundStyleSearch}
        onPress={toggleModalAlert}
        type="clear"
      />
      <Icon
        name="list"
        type="fsather"
        color="#517fa4"
        size={19}
        style={styles.relocateButton}
      />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={currentPosition}
        showsUserLocation
        followsUserLocation
        moveOnMarkerPress={false}
        mapPadding={{bottom: 300}}
        paddingAdjustmentBehavior="automatic"
        onRegionChangeComplete={onRegionChange}>
        {listJobs?.map(
          (
            {company, id, title, description, distance, min_salary, max_salary},
            index,
          ) => (
            <Marker
              key={id}
              ref={(el) => (markerRef.current[index] = el)}
              onPress={() => onItemSelected(id)}
              coordinate={{
                latitude: parseFloat(company.latitude),
                longitude: parseFloat(company.longitude),
              }}
              title={`Lương: ${formatCurrencyToSring(
                min_salary,
              )} - ${formatCurrencyToSring(max_salary)}tr`}
              description={`Cách bạn: ${distance}km`}>
              <Icon
                name="map-marker-alt"
                type="font-awesome-5"
                color={selectedMarker === id ? 'red' : '#3182ce'}
                size={30}
                style={{paddingRight: 5, paddingTop: 2}}
              />
            </Marker>
          ),
        )}
      </MapView>
      <View style={{position: 'absolute', bottom: isNotch ? 80 : 50}}>
        <Carousel
          ref={carouselRef}
          sliderWidth={width}
          sliderHeight={height * 0.09}
          itemWidth={width - 80}
          data={listJobs}
          onSnapToItem={onSwipeToItem}
          renderItem={renderItem}
        />
      </View>
      <Modal
        isVisible={isModalVisibleAlert}
        style={styles.modalView}
        onBackdropPress={toggleModalAlert}
        animationIn="slideInRight"
        backdropColor="transparent">
        <View style={[styles.modalContent]}>
          <View style={styles.groupBtnDialog}>
            <FlatList
              style={styles.flatList}
              data={occupation}
              renderItem={renderRow}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  occupationItem: {
    // backgroundColor: '#f1f5f8',
    padding: 5,
    marginBottom: 4,
  },
  flatList: {
    height: 300,
  },
  textAlert: {
    paddingBottom: 20,
    fontSize: 18,
  },
  textBtnCancel: {
    paddingTop: 20,
    fontSize: 20,
  },
  textAlertOk: {
    paddingTop: 20,
    fontSize: 20,
    color: 'blue',
  },
  groupBtnDialog: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalView: {
    paddingHorizontal: 10,
    flex: 1,
    width: '60%',
    margin: 0,
    position: 'absolute',
    zIndex: 10,
    top: isNotch ? height / 3 + 5 : height / 3 - 35,
    right: 0,
    paddingRight: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  listButtonStyleSearch: {
    position: 'absolute',
    zIndex: 10,
    top: isNotch ? height / 3 - 40 : height / 3 - 80,
    right: 0,
    paddingRight: 10,
  },
  listButtonBackgroundStyleSearch: {
    backgroundColor: 'red',
    // paddingVertical: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
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
    height: isNotch ? height * 0.88 : height * 0.9,
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
    top: isNotch ? height / 2 : height / 2 - 30,
    left: 10,
  },
  changePositionButtonBackgroundStyle: {
    backgroundColor: 'white',
    fontSize: 15,
    paddingVertical: 5,
  },
  listButtonStyle: {
    position: 'absolute',
    zIndex: 10,
    top: isNotch ? height / 2 : height / 2 - 30,
    right: 0,
    paddingRight: 10,
  },
  relocateButton: {
    position: 'absolute',
    zIndex: 10,
    top: isNotch ? height / 2 - 15 : height / 2 - 50,
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
    paddingVertical: 5,
  },
  searchBarInput: {
    backgroundColor: 'white',
  },
  inputContainerStyle: {
    backgroundColor: 'white',
  },
});

export default HomeScreen;
