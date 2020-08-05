/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';
import {Slider, Button} from 'react-native-elements';

function getKm(distance) {
  return Math.floor(distance * 100);
}
const Filter = () => {
  const [distance, setDistance] = useState(0);

  const getDistance = useCallback(() => {
    return `${getKm(distance)} Km`;
  }, [distance]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <Slider
            style={{width: '86%'}}
            thumbStyle={{backgroundColor: 'blue'}}
            value={distance}
            onValueChange={(value) => setDistance(value)}
          />
          <Text>{getDistance()}</Text>
        </View>
        <View style={styles.row}>
          <Button
            title="Xí nghiệp"
            type="outline"
            buttonStyle={{borderWidth: 2, paddingHorizontal: 20}}
            titleStyle={{color: 'black'}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Filter;
