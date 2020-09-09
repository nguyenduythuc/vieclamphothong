/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Divider, Button} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../app-redux';
import {RecruitmentApi} from '../../api';
import {formatCurrencyToSring} from '../../utils/common';
import moment from 'moment';

const JobDetail = () => {
  const dispatch = useDispatch();
  const detailRecruitment = useSelector(
    (state) => state.recruitment.detailRecruitment,
  );
  const onPressApply = useCallback(() => {
    RecruitmentApi.makeRecuitmentApplied(detailRecruitment?.id).then(
      (response) => {
        getDetail();
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Thành công!',
          text2:
            'Đã ứng tuyển thành công, bạn có thể kiểm tra ở danh sách công việc đã ứng tuyển.',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 70,
        });
      },
    );
  }, [detailRecruitment, getDetail]);
  const getDetail = useCallback(() => {
    RecruitmentApi.getDetailRecruitment(detailRecruitment.id).then(
      (response) => {
        dispatch(actions.recruitment.saveDetailRecruitment(response.data));
        RecruitmentApi.makeRecuitmentSeen(detailRecruitment.id);
      },
    );
  }, [detailRecruitment.id, dispatch]);
  const onPressSave = useCallback(() => {
    RecruitmentApi.makeRecuitmentSaved(detailRecruitment?.id).then(
      (response) => {
        getDetail();
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Thành công!',
          text2:
            'Đã lưu thành công, bạn có thể kiểm tra ở danh sách công việc đã lưu.',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 70,
        });
      },
    );
  }, [detailRecruitment, getDetail]);
  return (
    <View>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {detailRecruitment?.title}
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.row}>
          <View style={styles.col50}>
            <Text>Lương: </Text>
            <Text style={styles.salary}>{`${formatCurrencyToSring(
              detailRecruitment?.min_salary,
            )}tr-${formatCurrencyToSring(
              detailRecruitment?.max_salary,
            )}tr`}</Text>
          </View>
          <View style={styles.col50}>
            <Text>Trình độ: </Text>
            <Text>{detailRecruitment?.educational_background?.name}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col50}>
            <Text>Hạn nộp: </Text>
            <Text style={styles.salary}>
              {moment(detailRecruitment?.expired_at).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={styles.col50}>
            <Text>Giới tính: </Text>
            <Text>{detailRecruitment?.gender === 'male' ? 'Nam' : 'Nữ'}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col50}>
            <Text>Ghi chú: </Text>
            <Text
              style={
                styles.salary
              }>{`Còn ${detailRecruitment?.expired_in_number} ngày`}</Text>
          </View>
          <View style={styles.col50}>
            <Text>Tuổi: </Text>
            <Text>
              {detailRecruitment?.min_age}-{detailRecruitment?.max_age}{' '}
            </Text>
          </View>
        </View>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.title} numberOfLines={2}>
          Quyền lợi
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.row}>
          <Text>{detailRecruitment?.benefit}</Text>
        </View>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.title} numberOfLines={2}>
          Yêu cầu
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.row}>
          <Text>{detailRecruitment?.expect}</Text>
        </View>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.title} numberOfLines={2}>
          Liên hệ
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.contact}>
          <Text>
            Ông/Bà: {detailRecruitment?.company?.contact_person_name} -{' '}
            {detailRecruitment?.company?.contact_person_phone}
          </Text>
          <Text>Email: {detailRecruitment?.company?.contact_person_email}</Text>
          <Text>Địa chỉ: {detailRecruitment?.company?.address}</Text>
        </View>
      </Card>
      <View style={styles.btnFooter}>
        {!detailRecruitment?.has_apply && (
          <View style={styles.btnItem}>
            <Button
              title="Ứng tuyển công việc này"
              titleStyle={{color: 'white'}}
              onPress={() => onPressApply()}
            />
          </View>
        )}
        {!detailRecruitment?.has_save && (
          <View style={styles.btnItem}>
            <Button
              title="Lưu công việc này"
              titleStyle={{color: 'white'}}
              onPress={() => onPressSave()}
            />
          </View>
        )}
      </View>
    </View>
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
  divider: {backgroundColor: 'grey', marginBottom: 10},
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  col50: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  salary: {
    paddingRight: 10,
    color: 'red',
  },
  btnFooter: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  btnItem: {
    width: 300,
    marginBottom: 20,
  },
  contact: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default JobDetail;
