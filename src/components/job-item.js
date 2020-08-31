/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Divider, Button, Icon, Rating} from 'react-native-elements';
import {formatCurrencyToSring} from '../utils/common';
import moment from 'moment';

const JobItem = ({item, isList, isSeen, isSaved, isApplied, navigation}) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text
          onPress={() => {
            navigation.navigate('EmployerInfo', {id: item.id});
          }}
          style={isSeen ? styles.titleSeen : styles.title}
          numberOfLines={2}>
          {item.position}
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
        <View style={styles.colText}>
          <Text style={styles.greyText}>Lương: </Text>
          <Text style={styles.redText}>{`${formatCurrencyToSring(
            item.min_salary,
          )}tr-${formatCurrencyToSring(item.max_salary)}tr`}</Text>
        </View>
        <Text>{`Số lượng: ${item.quantity}`}</Text>
      </View>
      <View style={styles.row}>
        <Text>{`Hạn nộp: ${moment(item.expired_at).format(
          'DD/MM/YYYY',
        )}`}</Text>
        <Text
          style={styles.redText}>{`Còn ${item.expired_in_number} ngày`}</Text>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.title2} numberOfLines={1}>
        {item.company.name}
      </Text>
      <View style={styles.row}>
        <Rating imageSize={14} startingValue={item.company.rating_point} />
        <View style={styles.comments}>
          <Icon name="comments" type="fontisto" color="red" size={15} />
          <Text style={styles.commentsText}>Xem nhận xét</Text>
        </View>
      </View>
      <Text style={styles.marginBottom} numberOfLines={2}>
        {item.company.address}
      </Text>
      <View style={styles.colText}>
        <Text>Cách bạn: </Text>
        <Text style={styles.redText}>{item.distance} km</Text>
      </View>
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
    borderColor: 'white',
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
  comments: {
    flexDirection: 'row',
  },
  commentsText: {
    fontStyle: 'italic',
    color: 'gray',
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
    paddingHorizontal: 30,
  },
  btnViewResult: {
    backgroundColor: '#48bb78',
    paddingHorizontal: 30,
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
  colText: {
    display: 'flex',
    flexDirection: 'row',
  },
  redText: {
    color: 'red',
  },
  greyText: {
    color: 'grey',
  },
});

export default JobItem;
