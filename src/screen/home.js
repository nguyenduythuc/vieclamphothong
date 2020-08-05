/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useCallback, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Dimensions} from 'react-native';
import {Card, SearchBar, Icon, Divider} from 'react-native-elements';
import {JobItem} from '../components';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';

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

const HomeScreen = ({navigation}) => {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPosition, setCurentPosition] = useState({
    latitude: 21.036419,
    longitude: 105.80353,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const carouselRef = useRef(null);
  useEffect(() => {
    setEntries(ENTRIES1);

    // Geolocation.getCurrentPosition((info) => {
    //   const newPosition = {...currentPosition};
    //   newPosition.latitude = info.coords.latitude;
    //   newPosition.longitude = info.coords.longitude;
    //   setCurentPosition(newPosition);
    // });
  }, []);

  const onSearch = useCallback((text) => {
    setSearch(text);
  }, []);

  const onFilter = useCallback(() => {
    navigation.navigate('Filter');
  }, [navigation]);

  const renderItem = useCallback(({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <JobItem item={item} />
      </View>
    );
  }, []);

  return (
    <>
      <SafeAreaView>
        <View style={styles.header}>
          <SearchBar
            onChangeText={onSearch}
            containerStyle={styles.searchBar}
            placeholder="Bạn đang tìm kiếm công việc gì?"
            value={search}
            lightTheme
          />
          <Icon
            onPress={onFilter}
            name="filter"
            type="antdesign"
            color="#517fa4"
          />
        </View>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={currentPosition}
        />
        <Carousel
          ref={carouselRef}
          sliderWidth={width}
          sliderHeight={height * 0.09}
          itemWidth={width - 80}
          data={entries}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </>
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
    position: 'absolute',
    top: 45,
    zIndex: 10,
  },
  searchBar: {
    flex: 1,
    marginRight: 10,
  },
  map: {
    height: height * 0.6,
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  item: {
    width: width - 80,
    height: '50%',
  },
});

export default HomeScreen;
