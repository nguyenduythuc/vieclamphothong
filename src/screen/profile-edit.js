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
import {formatCurrency} from '../utils/common';
import {actions} from '../app-redux';
import {UserApi} from '../api';
import moment from 'moment';

const ProfileEdit = ({navigation}) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  const educationBackground = useSelector(
    (state) => state.recruitment?.listFilters?.educationBackground,
  );

  const educationBackgroundResult = () => {
    return educationBackground.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  };

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

  const [minSalary, setMinSalary] = useState(
    userProfile?.resume?.expect_price_min.toString(),
  );
  const onTypingMinSalary = useCallback((text) => {
    console.log(text);
    setMinSalary(parseFloat(text));
  }, []);

  const [maxSalary, setMaxSalary] = useState(
    userProfile?.resume?.expect_price_max.toString(),
  );
  const onTypingMaxSalary = useCallback((text) => setMaxSalary(text), []);

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
    // return userProfile?.resume?.[primary_occupation].map((item) => {
    return [
      {
        label: userProfile?.resume?.primary_occupation.name,
        value: userProfile?.resume?.primary_occupation.id,
      },
    ];
    // });
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
        expect_price_max: minSalary,
        expect_price_min: maxSalary,
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
      maxSalary,
      minSalary,
      occupationResultSendPrimary,
      occupationResultSendSecond,
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
            <Input
              placeholder="Họ và tên"
              inputStyle={styles.inputStyle}
              onChangeText={onTypingFullname}
              label="Họ và tên"
              value={fullname}
            />
          </View>
          <View>
            <Input
              placeholder="Email"
              inputStyle={styles.inputStyle}
              onChangeText={onTypingEmail}
              label="Email"
              value={email}
            />
          </View>
          <View style={styles.datePickerWrapper}>
            <Text style={styles.titleSelect}>Ngày sinh</Text>
            <DatePicker
              style={styles.datepicker}
              date={birthDay}
              mode="date"
              placeholder="Chọn ngày sinh"
              format="DD-MM-YYYY"
              minDate="01-01-1900"
              maxDate={new Date()}
              confirmBtnText="Xác nhận"
              cancelBtnText="Hủy"
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  marginLeft: 10,
                },
                dateText: {
                  fontSize: 17,
                  fontWeight: '500',
                },
              }}
              onDateChange={(date) => onTypingBirthDay(date)}
            />
            <View style={styles.hairLine} />
          </View>
          <View>
            <Text style={styles.titleSelect}>Chọn giới tính</Text>
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
          <View>
            <Input
              placeholder="Địa chỉ đang cư trú"
              label="Địa chỉ đang cư trú"
              inputStyle={styles.inputStyle}
              onChangeText={onTypingAddress}
              value={address}
            />
          </View>
          <View>
            <View>
              <Text style={styles.titleSelect}>Trình độ</Text>
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
          </View>
          <View>
            <Input
              placeholder="Trường"
              label="Trường"
              inputStyle={styles.inputStyle}
              onChangeText={onTypingSchool}
              value={school}
            />
          </View>
          <View>
            <Input
              placeholder="Kinh nghiệm"
              label="Kinh nghiệm"
              inputStyle={styles.inputStyle}
              onChangeText={onTypingExperience}
              value={experience}
            />
          </View>
          <View>
            <Input
              placeholder="Công việc"
              label="Công việc"
              multiline={true}
              inputStyle={styles.inputStyle}
              onChangeText={onTypingexpErienceDescription}
              value={experienceDescription}
            />
          </View>
          <View>
            <Input
              placeholder="Giới thiệu bản thân"
              label="Giới thiệu bản thân"
              multiline={true}
              inputStyle={styles.inputStyle}
              onChangeText={onTypingexpIntroduce}
              value={introduce}
            />
          </View>
          <View>
            <Input
              placeholder="Mức lương mong muốn (Thấp nhất)"
              label="Mức lương mong muốn (Thấp nhất)"
              inputStyle={styles.inputStyle}
              onChangeText={onTypingMinSalary}
              value={minSalary}
            />
          </View>
          <View>
            <Input
              placeholder="Mức lương mong muốn (Cao nhất)"
              label="Mức lương mong muốn (Cao nhất)"
              inputStyle={styles.inputStyle}
              onChangeText={onTypingMaxSalary}
              value={maxSalary}
            />
          </View>
          <View>
            <Text style={styles.titleSelect}>Công việc chính (Lựa chọn 1)</Text>
            <TouchableWithoutFeedback onPress={onPressSelectOccupationPrimary}>
              <View style={styles.buttonOccupation}>
                {!occupationsWishPrimary && (
                  <Text style={styles.buttonOccupationText}>
                    Công việc chính (Lựa chọn 1)
                  </Text>
                )}
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
          <View>
            <Text style={styles.titleSelect}>Công việc phụ (Lựa chọn 2)</Text>
            <TouchableWithoutFeedback onPress={onPressSelectOccupationSecond}>
              <View style={styles.buttonOccupation}>
                {!occupationsWishSecond && (
                  <Text style={styles.buttonOccupationText}>
                    Công việc phụ (Lựa chọn 2)
                  </Text>
                )}
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
  textLabel: {
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
  inputStyle: {
    height: 'auto',
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
    fontSize: 16,
    color: '#718096',
    fontWeight: '700',
  },
  hairLine: {
    borderBottomColor: '#a0aec0',
    borderBottomWidth: 1,
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
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderRadius: 4,
    color: 'black',
    paddingLeft: 10,
    marginBottom: 20,
  },
});

export default ProfileEdit;
