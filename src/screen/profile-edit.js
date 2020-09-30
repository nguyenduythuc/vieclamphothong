import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Input, Button, Icon, Badge} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import Toast from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';
import {formatCurrency} from '../utils/common';
import {actions} from '../app-redux';
import {UserApi} from '../api';
import moment from 'moment';

const isNotch = DeviceInfo.hasNotch();
const ProfileEdit = ({navigation}) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  const educationBackground = useSelector(
    (state) => state.recruitment?.listFilters?.educationBackground,
  );
  const salaryRange = useSelector(
    (state) => state.recruitment?.listFilters?.salaryRange,
  );

  const educationBackgroundResult = () => {
    return educationBackground.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  };
  const salaryRangeResult = () => {
    return salaryRange.map((item) => {
      return {
        label: item.label,
        value: [item.min, item.max],
        max: item.max,
        min: item.min,
        id: item.id,
      };
    });
  };
  const [inputSalaryRange, setInputSalaryRange] = useState([
    parseInt(userProfile?.resume?.expect_price_min),
    parseInt(userProfile?.resume?.expect_price_max),
  ]);
  const onTypingSalaryRange = useCallback(
    (text) => {
      console.log(inputSalaryRange);
      setInputSalaryRange(text);
    },
    [inputSalaryRange],
  );

  const [fullname, setFullname] = useState(userProfile?.full_name);
  const onTypingFullname = useCallback((text) => setFullname(text), []);

  const [email, setEmail] = useState(userProfile?.email);
  const onTypingEmail = useCallback((text) => setEmail(text), []);

  const [birthDay, setBirthDay] = useState(
    moment(userProfile?.dob).format('DD-MM-YYYY'),
  );
  const onTypingBirthDay = useCallback((text) => setBirthDay(text), []);

  const [gender, setGender] = useState(userProfile?.gender);
  const onTypingGender = useCallback((text) => setGender(text), []);

  const [address, setAddress] = useState(userProfile?.address);
  const onTypingAddress = useCallback((text) => setAddress(text), []);

  const [educational, setEducational] = useState(
    userProfile?.resume?.educational_background_id,
  );
  const onTypingEducational = useCallback((text) => setEducational(text), []);

  const [school, setSchool] = useState(
    userProfile?.resume?.education_description,
  );
  const onTypingSchool = useCallback((text) => setSchool(text), []);

  const [experience, setExperience] = useState(
    userProfile?.resume?.experience.toString(),
  );
  const onTypingExperience = useCallback((text) => setExperience(text), []);

  const [experienceDescription, setExperienceDescription] = useState(
    userProfile?.resume?.experience_description,
  );
  const onTypingexpErienceDescription = useCallback(
    (text) => setExperienceDescription(text),
    [],
  );

  const [introduce, setIntroduce] = useState(userProfile?.introduce);
  const onTypingexpIntroduce = useCallback((text) => setIntroduce(text), []);

  //primary
  const onPressSelectOccupationPrimary = () => {
    navigation.navigate('SelectMultiple', {
      onPress: callBackOccupation,
      occupationsWishOld: occupationsWishPrimary,
      limit: 1,
    });
  };
  const callBackOccupation = (multi) => {
    onTypingexpsetOccupationsWishPrimary(multi);
  };
  const occupationsOldPrimary = () => {
    return [
      {
        label: userProfile?.resume?.primary_occupation.name,
        value: userProfile?.resume?.primary_occupation.id,
      },
    ];
  };

  const [occupationsWishPrimary, setOccupationsWishPrimary] = useState(
    occupationsOldPrimary,
  );
  const onTypingexpsetOccupationsWishPrimary = useCallback(
    (text) => setOccupationsWishPrimary(text),
    [],
  );

  const occupationResultSendPrimary = useCallback(
    (text) => {
      return occupationsWishPrimary[0].value;
    },
    [occupationsWishPrimary],
  );

  // second
  const onPressSelectOccupationSecond = () => {
    navigation.navigate('SelectMultiple', {
      onPress: callBackOccupationSecond,
      occupationsWishOld: occupationsWishSecond,
      limit: 2,
    });
  };
  const callBackOccupationSecond = (multi) => {
    onTypingexpsetOccupationsWishSecond(multi);
  };
  const occupationsOldSecond = () => {
    return userProfile?.resume?.secondary_occupations.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  };

  const [occupationsWishSecond, setOccupationsWishSecond] = useState(
    occupationsOldSecond,
  );
  const onTypingexpsetOccupationsWishSecond = useCallback(
    (text) => setOccupationsWishSecond(text),
    [],
  );

  const occupationResultSendSecond = useCallback(
    (text) => {
      return occupationsWishSecond.map((item) => {
        return item.value;
      });
    },
    [occupationsWishSecond],
  );
  const onSubmitChange = useCallback(
    (text) => {
      const payload = {
        full_name: fullname,
        email: email,
        gender: gender,
        address: address,
        introduce: introduce,
        dob: birthDay,
        educational_background_id: educational,
        education_description: school,
        experience: experience,
        experience_description: experienceDescription,
        primary_occupation_id: occupationResultSendPrimary(),
        secondary_occupation_ids: occupationResultSendSecond(),
        expect_price_min: inputSalaryRange[0],
        expect_price_max: inputSalaryRange[1],
      };
      console.log('payload', payload);
      UserApi.updateProfile(payload).then((response) => {
        console.log('response', response);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Thành công!',
          text2: 'Cập nhật thông tin thành công.',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 70,
        });
        dispatch(actions.user.saveProfile(response.data));
        navigation.goBack();
      });
    },
    [
      navigation,
      fullname,
      email,
      gender,
      address,
      introduce,
      birthDay,
      educational,
      school,
      experience,
      experienceDescription,
      occupationResultSendPrimary,
      occupationResultSendSecond,
      inputSalaryRange,
      dispatch,
    ],
  );

  const placeholder = {
    label: 'Chọn giới tính',
    value: null,
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.titleSelectWrapper}>Thông tin cá nhân</Text>
            <View style={styles.selectInner}>
              <View style={styles.titleInner}>
                <Text style={styles.titleSelect}>Họ và tên</Text>
                <Text style={styles.dotRequirer}>(*)</Text>
              </View>
              <Input
                inputStyle={styles.inputStyle}
                onChangeText={onTypingFullname}
                inputContainerStyle={styles.inputContainerStyle}
                value={fullname}
              />
            </View>
            <View style={styles.selectInner}>
              <Text style={styles.titleSelect}>Email</Text>
              <Input
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                onChangeText={onTypingEmail}
                value={email}
              />
            </View>
            <View style={[styles.datePickerWrapper, styles.selectInner]}>
              <View style={styles.titleInner}>
                <Text style={styles.titleSelect}>Ngày sinh</Text>
                <Text style={styles.dotRequirer}>(*)</Text>
              </View>
              <View style={styles.dobWrapper}>
                <Input
                  placeholder="Ngày"
                  inputStyle={styles.inputStyleDob}
                  inputContainerStyle={styles.inputContainerStyleDob}
                  containerStyle={styles.containerStyle}
                  keyboardType="numeric"
                />
                <Text style={styles.dobText}>/</Text>
                <Input
                  placeholder="Tháng"
                  inputStyle={styles.inputStyleDob}
                  inputContainerStyle={styles.inputContainerStyleDob}
                  containerStyle={styles.containerStyle}
                  keyboardType="numeric"
                />
                <Text style={styles.dobText}>/</Text>
                <Input
                  placeholder="Năm"
                  inputStyle={styles.inputStyleDob}
                  inputContainerStyle={styles.inputContainerStyleDob}
                  containerStyle={styles.containerStyle}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.selectInner}>
              <View style={styles.titleInner}>
                <Text style={styles.titleSelect}>Chọn giới tính</Text>
                <Text style={styles.dotRequirer}>(*)</Text>
              </View>
              <RNPickerSelect
                onValueChange={(value) => onTypingGender(value)}
                value={gender}
                placeholder={placeholder}
                itemKey={Math.random()}
                style={{...pickerSelectStyles}}
                hideIcon={true}
                items={[
                  {label: 'Nam', value: 'male'},
                  {label: 'Nữ', value: 'female'},
                ]}
              />
            </View>
            <View style={styles.selectInner}>
              <Text style={styles.titleSelect}>Địa chỉ đang cư trú</Text>
              <View style={styles.addressWrapper}>
                <Input
                  placeholder="Số nhà/Đường"
                  inputStyle={styles.inputStyleAddress}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyleAddress}
                  // onChangeText={onTypingAddress}
                  // value={address}
                />
                <Input
                  placeholder="Phường/Xã"
                  inputStyle={styles.inputStyleAddress}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyleAddress}
                  // onChangeText={onTypingAddress}
                  // value={address}
                />
              </View>
              <View style={styles.addressWrapper}>
                <Input
                  placeholder="Quận/Huyện"
                  inputStyle={styles.inputStyleAddress}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyleAddress}
                  // onChangeText={onTypingAddress}
                  // value={address}
                />
                <Input
                  placeholder="Tỉnh/Thành phố"
                  inputStyle={styles.inputStyleAddress}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyleAddress}
                  // onChangeText={onTypingAddress}
                  // value={address}
                />
              </View>
              {/* <Input
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                onChangeText={onTypingAddress}
                value={address}
              /> */}
            </View>
          </View>
          <View>
            <Text style={styles.titleSelectWrapper}>Trình độ học vấn</Text>
            <View style={styles.selectInner}>
              <View style={styles.titleInner}>
                <Text style={styles.titleSelect}>Trình độ</Text>
                <Text style={styles.dotRequirer}>(*)</Text>
              </View>
              <RNPickerSelect
                onValueChange={(value) => onTypingEducational(value)}
                value={educational}
                placeholder={{
                  label: 'Chọn trình độ',
                  value: null,
                }}
                itemKey={Math.random()}
                style={{...pickerSelectStyles}}
                hideIcon={true}
                items={educationBackgroundResult()}
              />
            </View>
            <View style={styles.selectInner}>
              <Text style={styles.titleSelect}>Trường</Text>
              <Input
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                onChangeText={onTypingSchool}
                value={school}
              />
            </View>
          </View>
          <View>
            <Text style={styles.titleSelectWrapper}>Kinh nghiệm</Text>
            <View style={styles.selectInner}>
              <View style={styles.titleInner}>
                <Text style={styles.titleSelect}>Số năm làm việc</Text>
                <Text style={styles.dotRequirer}>(*)</Text>
              </View>
              <Input
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                onChangeText={onTypingExperience}
                value={experience}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.selectInner}>
              <Text style={styles.titleSelect}>Công việc</Text>
              <Input
                multiline={true}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                onChangeText={onTypingexpErienceDescription}
                value={experienceDescription}
              />
            </View>
          </View>
          <View>
            <Text style={styles.titleSelectWrapper}>Công việc mong muốn</Text>
            <View style={styles.selectInner}>
              <View style={styles.titleInner}>
                <Text style={styles.titleSelect}>Công việc chính (Chọn 1)</Text>
                <Text style={styles.dotRequirer}>(*)</Text>
              </View>
              <TouchableWithoutFeedback
                onPress={onPressSelectOccupationPrimary}>
                <View style={styles.buttonOccupation}>
                  {occupationsWishPrimary &&
                    occupationsWishPrimary?.map((item, idx) => (
                      <View key={Math.random()}>
                        <Badge
                          value={item.label}
                          status="success"
                          textStyle={{fontSize: 17}}
                          badgeStyle={{height: 30, paddingHorizontal: 15}}
                        />
                      </View>
                    ))}
                  <Icon name="right" type="antdesign" color="#a0aec0" />
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.hairLine} />
            </View>
            {/* second */}
            <View style={styles.selectInner}>
              <Text style={styles.titleSelect2}>Công việc phụ (Chọn 2)</Text>
              <TouchableWithoutFeedback onPress={onPressSelectOccupationSecond}>
                <View style={styles.buttonOccupation}>
                  {occupationsWishSecond &&
                    occupationsWishSecond?.map((item, idx) => (
                      <View key={Math.random()}>
                        <Badge
                          value={item.label}
                          status="success"
                          textStyle={{fontSize: 17}}
                          badgeStyle={{height: 30, paddingHorizontal: 15}}
                        />
                      </View>
                    ))}
                  <Icon name="right" type="antdesign" color="#a0aec0" />
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.hairLine} />
            </View>
          </View>
          <View>
            <Text style={[styles.titleSelectWrapper, styles.salaryWrapper]}>
              Mức lương mong muốn
            </Text>
            <View style={styles.selectInner}>
              <View style={styles.titleInner}>
                <Text style={styles.titleSelect}>Mức lương</Text>
                <Text style={styles.dotRequirer}>(*)</Text>
              </View>
              <RNPickerSelect
                onValueChange={(value) => onTypingSalaryRange(value)}
                value={inputSalaryRange}
                placeholder={{
                  label: 'Chọn mức lương',
                  value: null,
                }}
                itemKey={Math.random()}
                style={{...pickerSelectStyles}}
                hideIcon={true}
                items={salaryRangeResult()}
              />
            </View>
          </View>
          <View>
            <Text style={styles.titleSelectWrapper}>Giới thiệu bản thân</Text>
            <View style={styles.selectInner}>
              <Text style={styles.titleSelect}>Tính cách/Sở thích</Text>
              <Input
                multiline={true}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                onChangeText={onTypingexpIntroduce}
                value={introduce}
              />
            </View>
          </View>
          <View style={styles.btnFooter}>
            <View style={styles.btnItem}>
              <Button
                title="Lưu thay đổi"
                titleStyle={{color: 'white'}}
                onPress={() => onSubmitChange()}
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
    backgroundColor: 'white',
  },
  dotRequirer: {
    color: 'red',
    marginTop: 10,
  },
  titleInner: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textLabel: {
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
  inputStyle: {
    height: 'auto',
    minHeight: 30,
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
  titleSelect: {
    paddingLeft: 10,
    marginVertical: 10,
    fontSize: 16,
    color: '#718096',
    fontWeight: '400',
  },
  titleSelect2: {
    marginTop: 20,
    paddingLeft: 10,
    fontSize: 16,
    color: '#718096',
    fontWeight: '400',
  },
  titleSelectWrapper: {
    paddingLeft: 10,
    paddingVertical: 15,
    marginBottom: 10,
    fontSize: 17,
    color: '#3182ce',
    fontWeight: '600',
  },
  salaryWrapper: {
    marginTop: 15,
  },
  selectInner: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  hairLine: {
    borderBottomColor: '#a0aec0',
    borderBottomWidth: 0.5,
    paddingHorizontal: 4,
    alignSelf: 'center',
    width: '96%',
  },
  buttonOccupation: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonOccupationText: {
    fontSize: 17,
    color: '#a0aec0',
  },
  datepicker: {
    borderTopColor: 'red',
    marginLeft: 0,
    width: 200,
  },
  datePickerWrapper: {
    marginBottom: 14,
  },
  inputContainerStyle: {
    borderColor: '#a0aec0',
    borderBottomWidth: 0.5,
  },
  inputContainerStyleDob: {
    borderColor: '#a0aec0',
    borderBottomWidth: 0.5,
    maxWidth: 60,
    // borderRadius: 1,
    marginTop: 10,
    paddingRight: 0,
    marginRight: 0,
    marginBottom: -10,
  },
  dobText: {
    marginTop: isNotch ? 36 : 44,
  },
  containerStyle: {
    maxWidth: 80,
    paddingRight: 4,
    paddingLeft: 10,
  },
  inputStyleDob: {
    height: 'auto',
    maxWidth: 60,
  },
  dobWrapper: {
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  containerStyleAddress: {
    maxWidth: '50%',
    paddingRight: 4,
    paddingLeft: 10,
  },
  addressWrapper: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 8,
    borderColor: '#a0aec0',
    borderBottomWidth: 0.5,
    borderRadius: 4,
    color: 'black',
    paddingLeft: 10,
    marginBottom: 20,
  },
});

export default ProfileEdit;
