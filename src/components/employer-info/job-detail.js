/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Divider, Button} from 'react-native-elements';

const JobDetail = ({item, isList, isSeen, isSaved, isApplied}) => {
  return (
    <View>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.title} numberOfLines={2}>
          Vị trí: Nhân viên sản xuất
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.row}>
          <View style={styles.col50}>
            <Text>Lương: </Text>
            <Text style={styles.salary}>8-10tr</Text>
          </View>
          <View style={styles.col50}>
            <Text>Trình độ: </Text>
            <Text>THPT</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col50}>
            <Text>Hạn nộp: </Text>
            <Text style={styles.salary}>10-01-2020</Text>
          </View>
          <View style={styles.col50}>
            <Text>Giới tính: </Text>
            <Text>Nam</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col50}>
            <Text>Ghi chú: </Text>
            <Text style={styles.salary}>Còn 20 ngày</Text>
          </View>
          <View style={styles.col50}>
            <Text>Tuổi: </Text>
            <Text>18-30</Text>
          </View>
        </View>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.title} numberOfLines={2}>
          Quyền lợi
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.row}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.title} numberOfLines={2}>
          Yêu cầu
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.row}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.title} numberOfLines={2}>
          Liên hệ
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.row}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </Card>
      <View style={styles.btnFooter}>
        <View style={styles.btnItem}>
          <Button
            title="Ứng tuyển công việc này"
            titleStyle={{color: 'white'}}
            onPress={() => {}}
          />
        </View>
        <View style={styles.btnItem}>
          <Button
            title="Lưu công việc này"
            titleStyle={{color: 'white'}}
            onPress={() => {}}
          />
        </View>
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
});

export default JobDetail;
