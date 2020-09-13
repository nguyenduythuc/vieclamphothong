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

  const [introduce, setIntroduce] = useState(userProfile?.introduce);
  const onTypingexpIntroduce = useCallback((text) => setIntroduce(text), []);

  const onPressSelectOccupation = () => {
    navigation.navigate('SelectMultiple', {
      onPress: callBackOccupation,
      occupationsWishOld: occupationsWish,
    });
  };
  const callBackOccupation = (multi) => {
    onTypingexpsetOccupationsWish(multi);
  };
  const occupationsOld = () => {
    return userProfile?.resume?.occupations.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  };

  const [occupationsWish, setOccupationsWish] = useState(occupationsOld);
  const onTypingexpsetOccupationsWish = useCallback(
    (text) => setOccupationsWish(text),
    [],
  );

  const occupationResultSend = useCallback(
    (text) => {
      return occupationsWish.map((item) => {
        return item.value;
      });
    },
    [occupationsWish],
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
        occupation_ids: occupationResultSend(),
      };
      UserApi.updateProfile(payload).then((response) => {
        dispatch(actions.user.saveProfile(response.data));
      });
      console.log(payload);
    },
    [
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
      occupationResultSend,
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
              minDate="2016-05-01"
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
              inputStyle={styles.inputStyle}
              onChangeText={onTypingexpErienceDescription}
              value={experienceDescription}
            />
          </View>
          <View>
            <Input
              placeholder="Giới thiệu bản thân"
              label="Giới thiệu bản thân"
              inputStyle={styles.inputStyle}
              onChangeText={onTypingexpIntroduce}
              value={introduce}
            />
          </View>
          <View>
            <Text style={styles.titleSelect}>
              Công việc mong muốn (Lựa chọn 2)
            </Text>
            <TouchableWithoutFeedback onPress={onPressSelectOccupation}>
              <View style={styles.buttonOccupation}>
                {!occupationsWish && (
                  <Text style={styles.buttonOccupationText}>
                    Công việc mong muốn (Lựa chọn 2)
                  </Text>
                )}
                {occupationsWish &&
                  occupationsWish?.map((item, idx) => (
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
