/* eslint-disable react-native/no-inline-styles */
/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../app-redux';
import {UserApi} from '../api';
import moment from 'moment';

const bg = require('../assets/bg1.png');
const ProfileEdit = ({navigation}) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  console.log(userProfile.fullName);
  const [fullname, setFullname] = useState(userProfile?.full_name);
  const onTypingFullname = useCallback((text) => setFullname(text), []);
  const [birthDay, setBirthDay] = useState(
    moment(userProfile?.dob).format('DD/MM/YYYY'),
  );
  const onTypingBirthDay = useCallback((text) => setBirthDay(text), []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Input
              placeholder="Họ và tên"
              inputStyle={styles.inputStyle}
              onChangeText={onTypingFullname}
              label="Họ và tên"
              // errorMessage="Mật khẩu không khớp"
              // secureTextEntry
            />
          </View>
          <View>
            <Input
              placeholder="Ngày sinh"
              label="Ngày sinh"
              inputStyle={styles.inputStyle}
              rightIcon={{type: 'font-awesome', name: 'chevron-right'}}
              // errorMessage="Mật khẩu không khớp"
              // secureTextEntry
            />
          </View>
          <View>
            <Input
              placeholder="Giới tính"
              label="Giới tính"
              inputStyle={styles.inputStyle}
              rightIcon={{type: 'font-awesome', name: 'chevron-right'}}
              // errorMessage="Mật khẩu không khớp"
              // secureTextEntry
            />
          </View>
          <View>
            <Input
              placeholder="Địa chỉ đang cư trú"
              label="Địa chỉ đang cư trú"
              inputStyle={styles.inputStyle}
              // errorMessage="Mật khẩu không khớp"
              // secureTextEntry
            />
          </View>
          <View>
            <Input
              placeholder="Trình độ"
              label="Trình độ"
              inputStyle={styles.inputStyle}
              rightIcon={{type: 'font-awesome', name: 'chevron-right'}}
              // errorMessage="Mật khẩu không khớp"
              // secureTextEntry
            />
          </View>
          <View>
            <Input
              placeholder="Trường"
              label="Trường"
              inputStyle={styles.inputStyle}
              // errorMessage="Mật khẩu không khớp"
              // secureTextEntry
            />
          </View>
          <View>
            <Input
              placeholder="Kinh nghiệm"
              label="Kinh nghiệm"
              inputStyle={styles.inputStyle}
              // errorMessage="Mật khẩu không khớp"
              // secureTextEntry
            />
          </View>
          <View>
            <Input
              placeholder="Công việc"
              label="Công việc"
              inputStyle={styles.inputStyle}
              // errorMessage="Mật khẩu không khớp"
              // secureTextEntry
            />
          </View>
          <View>
            <Input
              placeholder="Giới thiệu bản thân"
              label="Giới thiệu bản thân"
              inputStyle={styles.inputStyle}
              // errorMessage="Mật khẩu không khớp"
              // secureTextEntry
            />
          </View>
          <View>
            <Input
              placeholder="Công việc mong muốn"
              label="Công việc mong muốn"
              inputStyle={styles.inputStyle}
              rightIcon={{type: 'font-awesome', name: 'chevron-right'}}
              // errorMessage="Mật khẩu không khớp"
              // secureTextEntry
            />
          </View>
          <View style={styles.btnFooter}>
            <View style={styles.btnItem}>
              <Button
                title="Lưu thay đổi"
                titleStyle={{color: 'white'}}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  textLabel: {
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
  inputStyle: {
    height: 10,
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

export default ProfileEdit;
