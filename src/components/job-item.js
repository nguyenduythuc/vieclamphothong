/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Divider, Button, Icon} from 'react-native-elements';

const JobItem = ({item, isList, isSeen, isSaved, isApplied}) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text
          style={isSeen ? styles.titleSeen : styles.title}
          numberOfLines={2}>
          {item.title}
        </Text>
        {(isApplied || isSaved) && (
          <Icon
            name="delete-forever-outline"
            type="material-community"
            color="red"
            style={styles.iconDelete}
          />
        )}
      </View>
      <View style={styles.row}>
        <Text>{`Lương: ${item.salary}`}</Text>
        <Text>{`Số lượng: ${item.quantity}`}</Text>
      </View>
      <View style={styles.row}>
        <Text>{`Hạn nộp: ${item.expiry}`}</Text>
        <Text>{`Còn ${item.timeLeft} ngày`}</Text>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.title2} numberOfLines={2}>
        {item.company}
      </Text>
      <Text style={styles.marginBottom}>{item.address}</Text>
      <Text>{`Cách bạn: ${item.range}km`}</Text>
      {isApplied && (
        <View>
          <Divider style={styles.divider} />
          <Text style={styles.status} numberOfLines={2}>
            {`Tình trạng: ${item.status}`}
          </Text>
          <Text style={styles.time}>{`Đã nộp: ${item.time} ngày trước`}</Text>
        </View>
      )}
      <View style={styles.btnFooter}>
        {(isSaved || isList || isSeen) && (
          <View style={styles.col}>
            <Button
              title="Ứng tuyển"
              buttonStyle={styles.btnDeleteOptions}
              type="outline"
              titleStyle={{color: '#4a5568'}}
              onPress={() => {}}
            />
          </View>
        )}
        {(isSeen || isList) && (
          <View style={styles.col}>
            <Button
              title="Lưu"
              buttonStyle={styles.btnViewResult}
              type="outline"
              titleStyle={{color: 'white'}}
              onPress={() => {}}
            />
          </View>
        )}
      </View>
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
    color: '#3182ce',
    fontSize: 20,
    // width: '90%',
  },
  titleSeen: {
    marginBottom: 10,
    color: 'grey',
    fontSize: 20,
    // width: '90%',
  },
  title2: {
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
  btnFooter: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  btnDeleteOptions: {
    backgroundColor: '#fed7d7',
  },
  btnViewResult: {
    backgroundColor: '#48bb78',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconDelete: {
    color: 'red',
  },
  status: {
    color: 'purple',
  },
  time: {
    fontStyle: 'italic',
  },
});

export default JobItem;
