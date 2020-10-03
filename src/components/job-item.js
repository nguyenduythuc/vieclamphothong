/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Divider, Button, Icon, Rating} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import {formatCurrencyToSring} from '../utils/common';
import {RecruitmentApi} from '../api';
import moment from 'moment';

const JobItem = ({
  item,
  navigation,
  callBackFromItem,
  param,
  paramFilter,
  isHome,
}) => {
  const onPressApply = (id) => {
    RecruitmentApi.makeRecuitmentApplied(id).then((response) => {
      callBackFromItem(param, paramFilter, id, 'APPLY');
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Thành công!',
        text2: 'Đã nộp hồ sơ thành công.',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 70,
      });
    });
  };
  const onPressSave = (id) => {
    RecruitmentApi.makeRecuitmentSaved(id).then((response) => {
      callBackFromItem(param, paramFilter, id, 'SAVE');
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Thành công!',
        text2: 'Đã lưu thành công.',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 70,
      });
    });
  };
  const onPressTitle = (id) => {
    callBackFromItem(param, paramFilter, id, 'SEEN');
    navigation.navigate('EmployerInfo', {
      id: item?.id,
      indexSend: 0,
    });
  };
  const onPressComment = (id) => {
    callBackFromItem(id, 'SEEN');
    navigation.navigate('EmployerInfo', {
      id: item?.id,
      indexSend: 1,
    });
  };
  return (
    <Card
      containerStyle={[
        styles.cardContainer,
        {marginHorizontal: isHome ? 0 : 15},
      ]}>
      <View style={styles.cardHeader}>
        <Text
          onPress={() => onPressTitle(item?.id)}
          style={item?.has_seen ? styles.titleSeen : styles.title}
          numberOfLines={2}>
          {item?.title}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={styles.colText}>
          <Text style={styles.greyText}>Lương: </Text>
          <Text style={styles.redText}>{`${formatCurrencyToSring(
            item?.min_salary,
          )}-${formatCurrencyToSring(item?.max_salary)}tr`}</Text>
        </View>
        <Text style={styles.greyText}>
          Số lượng: <Text style={styles.quantityText}>{item?.quantity}</Text>
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.greyText}>
          Hạn nộp:{' '}
          <Text style={styles.quantityText}>
            {moment(item?.expired_at).format('DD-MM-YYYY')}
          </Text>
        </Text>
        <Text
          style={styles.redText}>{`Còn ${item?.expired_in_number} ngày`}</Text>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.title2} numberOfLines={1}>
        {item?.company?.name}
      </Text>
      <View style={styles.row}>
        <Rating imageSize={12} startingValue={item?.company?.rating_point} />
        <TouchableOpacity
          style={styles.comments}
          onPress={() => onPressComment(item?.id)}>
          <Icon name="comments" type="fontisto" color="red" size={10} />
          <Text style={styles.commentsText}> Xem nhận xét</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.marginBottom, styles.greyText]} numberOfLines={2}>
        {item?.company?.address}
      </Text>
      <View style={styles.colText}>
        <Text>Cách bạn: </Text>
        <Text style={styles.redText}>{item?.distance} km</Text>
      </View>
      <View style={styles.btnFooter}>
        {!item?.has_apply && !isHome && (
          <View style={styles.col}>
            <Button
              title="Nộp hồ sơ"
              buttonStyle={styles.btnDeleteOptions}
              type="outline"
              titleStyle={{color: 'white', fontSize: 13}}
              onPress={() => onPressApply(item?.id)}
            />
          </View>
        )}
        {!item?.has_save && !isHome && (
          <View style={styles.col}>
            <Button
              title="Lưu"
              buttonStyle={styles.btnViewResult}
              type="outline"
              titleStyle={{color: '#4a5568', fontSize: 13}}
              onPress={() => onPressSave(item?.id)}
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
    margin: 0,
    marginTop: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    marginBottom: 10,
    color: '#3182ce',
    fontSize: 17,
    height: 50,
  },
  titleSeen: {
    marginBottom: 10,
    color: 'grey',
    fontSize: 17,
    height: 50,
  },
  title2: {
    marginBottom: 10,
    fontSize: 13,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsText: {
    fontStyle: 'italic',
    color: 'black',
    fontSize: 12,
  },
  divider: {backgroundColor: 'grey', marginBottom: 10},
  marginBottom: {marginBottom: 3, fontSize: 12},
  btnFooter: {
    marginTop: 10,
    marginBottom: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  btnDeleteOptions: {
    backgroundColor: '#3182ce',
    paddingHorizontal: 30,
  },
  btnViewResult: {
    backgroundColor: '#fed7d7',
    paddingHorizontal: 30,
    borderColor: '#fed7d7',
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
    alignItems: 'center',
    flexDirection: 'row',
  },
  redText: {
    color: 'red',
    fontSize: 12,
  },
  greyText: {
    color: 'grey',
    fontSize: 12,
  },
  quantityText: {
    fontSize: 12,
    color: 'black',
  },
});

export default JobItem;
