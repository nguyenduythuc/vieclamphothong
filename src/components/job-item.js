/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Divider} from 'react-native-elements';

const JobItem = ({item}) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={styles.row}>
        <Text>{`Lương: ${item.salary}`}</Text>
        <Text>{`Số lượng: ${item.quantity}`}</Text>
      </View>
      <View style={styles.row}>
        <Text>{`Hạn nộp: ${item.expiry}`}</Text>
        <Text>{`Còn ${item.timeLeft} ngày`}</Text>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.title} numberOfLines={2}>
        {item.company}
      </Text>
      <Text style={styles.marginBottom}>{item.address}</Text>
      <Text>{`Cách bạn: ${item.range}km`}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  title: {
    marginBottom: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  divider: {backgroundColor: 'grey', marginBottom: 10},
  marginBottom: {marginBottom: 10},
});

export default JobItem;
