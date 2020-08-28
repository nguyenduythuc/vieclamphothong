/* eslint-disable react-native/no-inline-styles */
/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';
import {Slider, Button, CheckBox} from 'react-native-elements';
import {RecruitmentApi} from '../api';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../app-redux';

function getKm(distance) {
  return Math.floor(distance * 100);
}
const Filter = () => {
  const [distance, setDistance] = useState(0);
  const dispatch = useDispatch();
  const listFilters = useSelector((state) => state.recruitment.listFilters);
  useEffect(() => {
    console.log('didmount');
    RecruitmentApi.getAllFilters().then((response) => {
      dispatch(actions.recruitment.saveListFilters(response));
    });
  }, [dispatch]);

  //checkbox group
  const [checkBoxPlace, setCheckBoxPlace] = useState(false);
  const [checkBoxPlaceList, setCheckBoxPlaceList] = useState([]);
  const listIdsPlace = listFilters?.workplace.map((item) => item.id);
  const onCheckAllPlace = useCallback(() => {
    !checkBoxPlace
      ? setCheckBoxPlaceList(listIdsPlace)
      : setCheckBoxPlaceList([]);
    setCheckBoxPlace(!checkBoxPlace);
  }, [checkBoxPlace, listIdsPlace]);
  const onCheckOnePlace = useCallback(
    (place) => {
      let tempPlace = [...checkBoxPlaceList];
      const index = tempPlace.indexOf(place);
      index > -1 ? tempPlace.splice(index, 1) : tempPlace.push(place);
      tempPlace.length === listIdsPlace.length
        ? setCheckBoxPlace(true)
        : setCheckBoxPlace(false);
      setCheckBoxPlaceList(tempPlace);
    },
    [checkBoxPlaceList, listIdsPlace.length],
  );

  //checkbox group
  const [checkBoxWork, setCheckBoxWork] = useState(false);
  const [checkBoxWorkList, setCheckBoxWorkList] = useState([]);
  const listIdsWork = listFilters?.occupation.map((item) => item.id);
  const onCheckAllWork = useCallback(() => {
    !checkBoxWork ? setCheckBoxWorkList(listIdsWork) : setCheckBoxWorkList([]);
    setCheckBoxWork(!checkBoxWork);
  }, [checkBoxWork, listIdsWork]);
  const onCheckOneWork = useCallback(
    (work) => {
      let tempWork = [...checkBoxWorkList];
      const index = tempWork.indexOf(work);
      index > -1 ? tempWork.splice(index, 1) : tempWork.push(work);
      tempWork.length === listIdsWork.length
        ? setCheckBoxWork(true)
        : setCheckBoxWork(false);
      setCheckBoxWorkList(tempWork);
    },
    [checkBoxWorkList, listIdsWork.length],
  );

  //checkbox one
  const [
    checkBoxEducationBackground,
    setCheckBoxEducationBackground,
  ] = useState('');
  const onCheckOneEducationBackground = useCallback(
    (educationBackground) => {
      let tempEducationBackground = checkBoxEducationBackground;
      tempEducationBackground === educationBackground
        ? setCheckBoxEducationBackground('')
        : setCheckBoxEducationBackground(educationBackground);
    },
    [checkBoxEducationBackground],
  );

  //checkbox one
  const [checkBoxGender, setCheckBoxGender] = useState('');
  const onCheckOneGender = useCallback(
    (gender) => {
      let tempGender = checkBoxGender;
      tempGender === gender ? setCheckBoxGender('') : setCheckBoxGender(gender);
    },
    [checkBoxGender],
  );

  //checkbox one
  const [checkBoxAge, setCheckBoxAge] = useState('');
  const onCheckOneAge = useCallback(
    (age) => {
      let tempAge = checkBoxAge;
      tempAge === age ? setCheckBoxAge('') : setCheckBoxAge(age);
    },
    [checkBoxAge],
  );

  //checkbox one
  const [checkBoxExperience, setCheckBoxExperience] = useState('');
  const onCheckOneExperience = useCallback(
    (experience) => {
      let tempExperience = checkBoxExperience;
      tempExperience === experience
        ? setCheckBoxExperience('')
        : setCheckBoxExperience(experience);
    },
    [checkBoxExperience],
  );

  //checkbox group
  const [checkBoxSalary, setCheckBoxSalary] = useState(false);
  const [checkBoxSalaryList, setCheckBoxSalaryList] = useState([]);
  const listIdsSalary = listFilters?.salaryRange.map((item) => item.id);
  const onCheckAllSalary = useCallback(() => {
    !checkBoxSalary
      ? setCheckBoxSalaryList(listIdsSalary)
      : setCheckBoxSalaryList([]);
    setCheckBoxSalary(!checkBoxSalary);
  }, [checkBoxSalary, listIdsSalary]);
  const onCheckOneSalary = useCallback(
    (salary) => {
      let tempSalary = [...checkBoxSalaryList];
      const index = tempSalary.indexOf(salary);
      index > -1 ? tempSalary.splice(index, 1) : tempSalary.push(salary);
      tempSalary.length === listIdsSalary.length
        ? setCheckBoxSalary(true)
        : setCheckBoxSalary(false);
      setCheckBoxSalaryList(tempSalary);
    },
    [checkBoxSalaryList, listIdsSalary.length],
  );

  const getDistance = useCallback(() => {
    return `${getKm(distance)} Km`;
  }, [distance]);

  const onPressViewResult = useCallback(() => {
    const queryResult =
      'include=educational_background,occupation,workplace,company' +
      generateQueryString('workplace_id', checkBoxPlaceList) +
      generateQueryString('occupation_id', checkBoxWorkList) +
      generateQueryString('gender', [checkBoxGender]) +
      generateQueryString('salaryRange', checkBoxSalaryList) +
      generateQueryString('ageRange', [checkBoxAge]) +
      generateQueryString('experienceRange', [checkBoxExperience]) +
      generateQueryString('educationBackground_id', [
        checkBoxEducationBackground,
      ]);
    RecruitmentApi.getList(queryResult).then((response) => {
      dispatch(actions.recruitment.saveListJobs(response.data));
      console.log(response.data);
    });
  }, [
    checkBoxPlaceList,
    checkBoxWorkList,
    checkBoxGender,
    checkBoxSalaryList,
    checkBoxAge,
    checkBoxExperience,
    checkBoxEducationBackground,
    dispatch,
  ]);

  const generateQueryString = (key, arrayValue) => {
    let query = `&filter[${key}]=`;
    arrayValue.forEach((element, idx) => {
      query += element;
      query += idx === arrayValue.length - 1 ? '' : ',';
    });
    if (arrayValue.length === 0) {
      query = '';
    }
    return query;
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Khoảng cách</Text>
        </View>
        <View style={styles.hairLine} />
        <View style={styles.row}>
          <Slider
            style={{width: '86%'}}
            thumbStyle={{backgroundColor: 'blue'}}
            value={distance}
            onValueChange={(value) => setDistance(value)}
          />
          <Text>{getDistance()}</Text>
        </View>
        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Nơi làm việc</Text>
        </View>
        <View style={styles.hairLine} />

        <CheckBox
          containerStyle={styles.checkboxAll}
          title="Chọn tất cả"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checkBoxPlace}
          onPress={() => onCheckAllPlace()}
        />

        <View style={styles.row}>
          {listFilters?.workplace &&
            listFilters?.workplace.map((item, idx) => (
              <View style={styles.col}>
                <Button
                  title={item.name}
                  buttonStyle={
                    checkBoxPlaceList.includes(item.id)
                      ? styles.btnActive
                      : styles.btnNoneActive
                  }
                  titleStyle={{
                    color: checkBoxPlaceList.includes(item.id)
                      ? 'white'
                      : 'black',
                  }}
                  onPress={() => {
                    onCheckOnePlace(item.id);
                  }}
                />
              </View>
            ))}
        </View>

        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Công việc</Text>
        </View>
        <View style={styles.hairLine} />

        <CheckBox
          containerStyle={styles.checkboxAll}
          title="Chọn tất cả"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checkBoxWork}
          onPress={() => onCheckAllWork()}
        />

        <View style={styles.row}>
          {listFilters?.occupation &&
            listFilters?.occupation.map((item, idx) => (
              <View style={styles.col}>
                <Button
                  title={item.name}
                  buttonStyle={
                    checkBoxWorkList.includes(item.id)
                      ? styles.btnActive
                      : styles.btnNoneActive
                  }
                  titleStyle={{
                    color: checkBoxWorkList.includes(item.id)
                      ? 'white'
                      : 'black',
                  }}
                  onPress={() => {
                    onCheckOneWork(item.id);
                  }}
                />
              </View>
            ))}
        </View>

        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Trình độ</Text>
        </View>
        <View style={styles.hairLine} />
        <View style={styles.row}>
          {listFilters?.educationBackground.map((item, idx) => (
            <View style={styles.col}>
              <Button
                title={item.name}
                type="outline"
                buttonStyle={
                  checkBoxEducationBackground === item.id
                    ? styles.btnActive
                    : styles.btnNoneActive
                }
                titleStyle={{
                  color:
                    checkBoxEducationBackground === item.id ? 'white' : 'black',
                }}
                onPress={() => {
                  onCheckOneEducationBackground(item.id);
                }}
              />
            </View>
          ))}
        </View>

        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Giới tính</Text>
        </View>
        <View style={styles.hairLine} />
        <View style={styles.row}>
          {listFilters?.gender.map((item, idx) => (
            <View style={styles.col}>
              <Button
                title={item.value}
                type="outline"
                buttonStyle={
                  checkBoxGender === item.key
                    ? styles.btnActive
                    : styles.btnNoneActive
                }
                titleStyle={{
                  color: checkBoxGender === item.key ? 'white' : 'black',
                }}
                onPress={() => {
                  onCheckOneGender(item.key);
                }}
              />
            </View>
          ))}
        </View>

        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Độ tuổi</Text>
        </View>
        <View style={styles.hairLine} />
        <View style={styles.row}>
          {listFilters?.ageRange.map((item, idx) => (
            <View style={styles.col}>
              <Button
                title={item.min + '-' + item.max + ' tuổi'}
                type="outline"
                buttonStyle={
                  checkBoxAge === item.id
                    ? styles.btnActive
                    : styles.btnNoneActive
                }
                titleStyle={{
                  color: checkBoxAge === item.id ? 'white' : 'black',
                }}
                onPress={() => {
                  onCheckOneAge(item.id);
                }}
              />
            </View>
          ))}
        </View>

        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Lương</Text>
        </View>
        <View style={styles.hairLine} />

        <CheckBox
          containerStyle={styles.checkboxAll}
          title="Chọn tất cả"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checkBoxSalary}
          onPress={() => onCheckAllSalary()}
        />

        <View style={styles.row}>
          {listFilters?.salaryRange &&
            listFilters?.salaryRange.map((item, idx) => (
              <View style={styles.col}>
                <Button
                  title={item.label}
                  buttonStyle={
                    checkBoxSalaryList.includes(item.id)
                      ? styles.btnActive
                      : styles.btnNoneActive
                  }
                  titleStyle={{
                    color: checkBoxSalaryList.includes(item.id)
                      ? 'white'
                      : 'black',
                  }}
                  onPress={() => {
                    onCheckOneSalary(item.id);
                  }}
                />
              </View>
            ))}
        </View>

        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Kinh nghiệm</Text>
        </View>
        <View style={styles.hairLine} />
        <View style={styles.row}>
          {listFilters?.experienceRange &&
            listFilters?.experienceRange.map((item, idx) => (
              <View style={styles.col}>
                <Button
                  title={item.label}
                  type="outline"
                  buttonStyle={
                    checkBoxExperience === item.id
                      ? styles.btnActive
                      : styles.btnNoneActive
                  }
                  titleStyle={{
                    color: checkBoxExperience === item.id ? 'white' : 'black',
                  }}
                  onPress={() => {
                    onCheckOneExperience(item.id);
                  }}
                />
              </View>
            ))}
        </View>
        <View style={styles.btnFooter}>
          <View style={styles.col}>
            <Button
              title="Xóa tùy chọn"
              buttonStyle={styles.btnDeleteOptions}
              type="clear"
              titleStyle={{color: '#4a5568'}}
              onPress={() => {}}
            />
          </View>
          <View style={styles.col}>
            <Button
              title="Xem kết quả"
              buttonStyle={styles.btnViewResult}
              type="clear"
              titleStyle={{color: 'white'}}
              onPress={() => onPressViewResult()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnFooter: {
    marginTop: 25,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  btnDeleteOptions: {
    borderRadius: 20,
    marginHorizontal: 17,
    backgroundColor: '#fed7d7',
  },
  btnViewResult: {
    backgroundColor: '#48bb78',
    borderRadius: 20,
    marginHorizontal: 17,
  },
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  col: {
    width: '50%',
  },
  blockTitleText: {
    fontSize: 20,
  },
  blockTitle: {
    marginVertical: 4,
    marginTop: 40,
  },
  hairLine: {
    borderBottomColor: '#a0aec0',
    borderBottomWidth: 1,
    marginVertical: 4,
  },
  checkboxAll: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  btnActive: {
    borderWidth: 1,
    margin: 3,
    marginHorizontal: 25,
    backgroundColor: '#2588dc',
  },
  btnNoneActive: {
    borderWidth: 1,
    margin: 3,
    marginHorizontal: 25,
    backgroundColor: 'white',
  },
});

export default Filter;
