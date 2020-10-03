/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Divider, Icon, Rating, Button} from 'react-native-elements';
import {formatCurrencyToSring} from '../utils/common';
import Toast from 'react-native-toast-message';
import {RecruitmentApi} from '../api';
import moment from 'moment';

const JobAppliedItem = ({
  item,
  navigation,
  isApplied,
  isSaved,
  deleteItem,
  callBackFromItem,
}) => {
  const calculatorDate = useCallback(() => {
    const start = moment(item.recruitment.created_at, 'YYYY-MM-DD');
    const end = moment(new Date(), 'YYYY-MM-DD');
    return end.diff(start, 'days');
  }, [item.recruitment.created_at]);
  const onPressDeleteItem = () => {
    deleteItem(item.id);
  };
  const onPressApply = (id) => {
    RecruitmentApi.makeRecuitmentApplied(id).then((response) => {
      // callBackFromItem(id, 'SEEN');
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Thành công!',
        text2: 'Đã nộp hồ sơ thành công.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 70,
      });
    });
  };
  const onPressTitle = (id) => {
    // callBackFromItem(id, 'SEEN');
    navigation.navigate('EmployerInfo', {
      id: item?.id,
      indexSend: 0,
    });
  };
  const onPressComment = (id) => {
    // callBackFromItem(id, 'SEEN');
    navigation.navigate('EmployerInfo', {
      id: item?.id,
      indexSend: 1,
    });
  };
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.col90}>
          <Text
            onPress={() => onPressTitle(item?.recruitment?.id)}
            style={item?.has_seen ? styles.titleSeen : styles.title}
            numberOfLines={2}>
            {item.recruitment.title}
          </Text>
        </View>
        <View style={styles.col10}>
          <Icon
            onPress={onPressDeleteItem}
            name="delete-forever-outline"
            type="material-community"
            color="red"
            style={styles.iconDelete}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.colText}>
          <Text style={styles.greyText}>Lương: </Text>
          <Text style={styles.redText}>{`${formatCurrencyToSring(
            item.recruitment.min_salary,
          )}tr-${formatCurrencyToSring(item.recruitment.max_salary)}tr`}</Text>
        </View>
        <Text style={styles.greyText}>
          Số lượng:{' '}
          <Text style={styles.quantityText}>{item?.recruitment?.quantity}</Text>
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.greyText}>
          Hạn nộp:{' '}
          <Text style={styles.quantityText}>
            {moment(item?.recruitment.expired_at).format('DD-MM-YYYY')}
          </Text>
        </Text>
        <Text
          style={
            styles.redText
          }>{`Còn ${item.recruitment.expired_in_number} ngày`}</Text>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.title2} numberOfLines={1}>
        {item.recruitment.company.name}
      </Text>
      <View style={styles.row}>
        <Rating
          imageSize={12}
          startingValue={item.recruitment.company.rating_point}
        />
        <TouchableOpacity
          style={styles.comments}
          onPress={() => onPressComment(item?.id)}>
          <Icon name="comments" type="fontisto" color="red" size={10} />
          <Text style={styles.commentsText}> Xem nhận xét</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.marginBottom} numberOfLines={2}>
        {item.recruitment.company.address}
      </Text>
      <View style={styles.colText}>
        <Text>Cách bạn: </Text>
        <Text style={styles.redText}>{item.distance} km</Text>
      </View>
      {isApplied && (
        <View>
          <Divider style={styles.divider} />
          <Text style={styles.status} numberOfLines={2}>
            {`Tình trạng: ${item?.status_readable.label}`}
          </Text>
          <Text
            style={
              styles.time
            }>{`Đã nộp: ${calculatorDate()} ngày trước`}</Text>
        </View>
      )}
      <View style={styles.btnFooter}>
        {isSaved && (
          <View style={styles.col}>
            <Button
              title="Nộp hồ sơ"
              buttonStyle={styles.btnDeleteOptions}
              type="outline"
              titleStyle={{color: 'white'}}
              onPress={() => onPressApply(item.recruitment_id)}
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
  },
  iconDelete: {
    color: 'red',
  },
  cardHeader: {
    flexDirection: 'row',
    width: '100%',
  },
  col90: {
    width: '90%',
  },
  col10: {
    width: '10%',
  },
  titleSeen: {
    marginBottom: 10,
    color: 'grey',
    fontSize: 20,
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
    color: 'black',
    fontSize: 12,
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
    backgroundColor: '#3182ce',
    paddingHorizontal: 30,
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
    fontSize: 12,
  },
  quantityText: {
    fontSize: 12,
    color: 'black',
  },
});

export default JobAppliedItem;
