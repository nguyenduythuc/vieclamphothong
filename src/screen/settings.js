/**
 * DHomes: Thuc Nguyen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Dimensions} from 'react-native';

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.textNothing}>
          <Text>...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 20},
  textNothing: {
    position: 'absolute',
    zIndex: 10,
    top: (height * 1) / 2 - 30,
    // right: 25,
    // left: 25,
    alignSelf: 'center',
  },
});

export default Settings;
