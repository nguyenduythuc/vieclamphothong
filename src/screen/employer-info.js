/* eslint-disable react-native/no-inline-styles */
/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {Card, Divider, Button} from 'react-native-elements';
import {TabView, SceneMap} from 'react-native-tab-view';

const bg = require('../assets/cc.jpg');
const JobRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#ff4081'}]} />
);

const CommentRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);

const AboutRoute = () => (
  <View style={[styles.scene, {backgroundColor: 'back'}]} />
);

const initialLayout = {width: Dimensions.get('window').width};

const EmployerInfo = ({navigation}) => {
  useEffect(() => {
    console.log('didmount');
  }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'job', title: 'CÔNG VIỆC'},
    {key: 'comment', title: 'NHẬN XÉT'},
    {key: 'about', title: 'GIỚI THIỆU'},
  ]);

  const renderScene = SceneMap({
    job: JobRoute,
    comment: CommentRoute,
    about: AboutRoute,
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Image source={bg} style={styles.imageProfile} />
        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          activeColor={'black'}
          labelStyle={'black'}
          style={{height: 300}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'blue',
    fontWeight: '500',
  },
  imageProfile: {
    height: 180,
    borderRadius: 12,
  },
  scene: {
    flex: 1,
  },
});

export default EmployerInfo;
