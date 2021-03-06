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
import {useSelector} from 'react-redux';

function getKm(distance) {
  return Math.floor(distance * 30);
}
const Filter = ({navigation, route}) => {
  const [distance, setDistance] = useState(0.1);
  const listFilters = useSelector((state) => state.recruitment.listFilters);
  const {onFilterResult} = route.params;
  useEffect(() => {
    console.log('didmount');
    // setToken('response.token');
  }, []);

  //checkbox group
  const [checkBoxPlace, setCheckBoxPlace] = useState(false);
  const [checkBoxPlaceList, setCheckBoxPlaceList] = useState([]);
  const listIdsPlace = listFilters?.workplace?.map((item) => item.id);
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
  const [checkBoxWorkList, setCheckBoxWorkList] = useState([]);
  const occupation = listFilters?.occupation.map((item) => {
    return {id: item.id, name: item.name};
  });
  const [listWork, setListWork] = useState(occupation);
  const goFilterWork = () => {
    navigation.navigate('FilterWork', {
      callbackFilterWork: callbackFilterWork,
      listIdsWordOld: checkBoxWorkList,
    });
  };
  const onCheckOneWork = useCallback(
    (work) => {
      let tempWork = [...checkBoxWorkList];
      const index = tempWork.indexOf(work);
      index > -1
        ? tempWork.splice(index, 1)
        : tempWork.length === 4
        ? null
        : tempWork.push(work);
      setCheckBoxWorkList(tempWork);
    },
    [checkBoxWorkList],
  );
  const callbackFilterWork = useCallback(
    (tempIdsWork) => {
      setListWork(occupation);
      let tempListWork = [];
      tempIdsWork.forEach((item, idx) => {
        const index = occupation.map((x) => x.id).indexOf(item);
        index > -1 ? tempListWork.push(occupation[index]) : null;
      });
      occupation.forEach((item, idx) => {
        const index = tempIdsWork.map((id) => id).indexOf(item.id);
        if (index < 0) {
          if (tempListWork.length < 10) {
            tempListWork.push(occupation[idx]);
          } else {
            return;
          }
        }
      });
      setListWork(tempListWork);
      setCheckBoxWorkList(tempIdsWork);
    },
    [occupation],
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
    return getKm(distance);
  }, [distance]);

  const onPressViewResult = useCallback(() => {
    const queryResultFilter =
      getDistance() +
      generateQueryString('workplace_id', checkBoxPlaceList) +
      generateQueryString('occupation_id', checkBoxWorkList) +
      generateQueryString('gender', checkBoxGender ? [checkBoxGender] : []) +
      generateQueryString('salary_id_in', checkBoxSalaryList) +
      generateQueryString('age_id_in', checkBoxAge ? [checkBoxAge] : []) +
      generateQueryString(
        'experience_id_in',
        checkBoxExperience ? [checkBoxExperience] : [],
      ) +
      generateQueryString(
        'educational_background_id',
        checkBoxEducationBackground ? [checkBoxEducationBackground] : [],
      );
    onFilterResult(queryResultFilter);
    navigation.goBack();
  }, [
    onFilterResult,
    getDistance,
    checkBoxPlaceList,
    checkBoxWorkList,
    checkBoxGender,
    checkBoxSalaryList,
    checkBoxAge,
    checkBoxExperience,
    checkBoxEducationBackground,
    navigation,
  ]);
  const onDeleteOptions = () => {
    setCheckBoxPlaceList([]);
    setCheckBoxWorkList([]);
    setCheckBoxGender([]);
    setCheckBoxSalaryList([]);
    setCheckBoxAge([]);
    setCheckBoxExperience([]);
    setCheckBoxEducationBackground([]);
  };

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
        <View style={styles.row}>
          <Slider
            style={{width: '86%'}}
            thumbStyle={{backgroundColor: 'blue'}}
            trackStyle={{backgroundColor: 'red', color: 'red'}}
            thumbTintColor="red"
            value={distance}
            onValueChange={(value) => setDistance(value)}
          />
          <Text>{`${getKm(distance)} Km`}</Text>
        </View>
        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Nơi làm việc</Text>
        </View>

        <CheckBox
          containerStyle={styles.checkboxAll}
          title="Chọn tất cả"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checkBoxPlace}
          textStyle={styles.textStyleCheckBox}
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
                      : '#0070C0',
                    fontSize: 13,
                  }}
                  onPress={() => {
                    onCheckOnePlace(item.id);
                  }}
                />
              </View>
            ))}
        </View>
        <View style={styles.hairLine} />

        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Công việc</Text>
        </View>

        <Button
          title="Chọn công việc khác"
          buttonStyle={styles.btnNoneActive}
          titleStyle={{
            color: '#0070C0',
            fontSize: 13,
          }}
          onPress={() => {
            goFilterWork();
          }}
        />

        <View style={[styles.row, styles.workList]}>
          {listWork &&
            listWork.map((item, idx) =>
              idx > 8 ? null : (
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
                        : '#0070C0',
                      fontSize: 13,
                    }}
                    onPress={() => {
                      onCheckOneWork(item.id);
                    }}
                  />
                </View>
              ),
            )}
        </View>
        <View style={styles.hairLine} />

        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Trình độ</Text>
        </View>
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
                    checkBoxEducationBackground === item.id
                      ? 'white'
                      : '#0070C0',
                  fontSize: 13,
                }}
                onPress={() => {
                  onCheckOneEducationBackground(item.id);
                }}
              />
            </View>
          ))}
        </View>
        <View style={styles.hairLine} />

        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Giới tính</Text>
        </View>
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
                  color: checkBoxGender === item.key ? 'white' : '#0070C0',
                  fontSize: 13,
                }}
                onPress={() => {
                  onCheckOneGender(item.key);
                }}
              />
            </View>
          ))}
        </View>
        <View style={styles.hairLine} />

        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Độ tuổi</Text>
        </View>
        <View style={styles.row}>
          {listFilters?.ageRange.map((item, idx) => (
            <View style={styles.col}>
              <Button
                title={item.label}
                type="outline"
                buttonStyle={
                  checkBoxAge === item.id
                    ? styles.btnActive
                    : styles.btnNoneActive
                }
                titleStyle={{
                  color: checkBoxAge === item.id ? 'white' : '#0070C0',
                  fontSize: 13,
                }}
                onPress={() => {
                  onCheckOneAge(item.id);
                }}
              />
            </View>
          ))}
        </View>
        <View style={styles.hairLine} />

        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Lương</Text>
        </View>

        <CheckBox
          containerStyle={styles.checkboxAll}
          title="Chọn tất cả"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          textStyle={styles.textStyleCheckBox}
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
                      : '#0070C0',
                    fontSize: 13,
                  }}
                  onPress={() => {
                    onCheckOneSalary(item.id);
                  }}
                />
              </View>
            ))}
        </View>
        <View style={styles.hairLine} />

        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Kinh nghiệm</Text>
        </View>
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
                    color: checkBoxExperience === item.id ? 'white' : '#0070C0',
                    fontSize: 13,
                  }}
                  onPress={() => {
                    onCheckOneExperience(item.id);
                  }}
                />
              </View>
            ))}
        </View>
        <View style={styles.hairLine} />
        <View style={styles.btnFooter}>
          <View style={styles.col50}>
            <Button
              title="Xóa tùy chọn"
              buttonStyle={styles.btnDeleteOptions}
              type="clear"
              titleStyle={{color: '#4a5568'}}
              onPress={() => onDeleteOptions()}
            />
          </View>
          <View style={styles.col50}>
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
  workList: {
    // height: 10,
  },
  textStyleCheckBox: {
    fontWeight: '500',
  },
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
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  col: {
    width: '33%',
  },
  col50: {
    width: '50%',
  },
  blockTitleText: {
    fontSize: 17,
    fontWeight: '500',
    paddingBottom: 15,
  },
  blockTitle: {
    marginVertical: 4,
    marginTop: 40,
  },
  hairLine: {
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
    // marginVertical: 4,
    marginTop: 15,
  },
  checkboxAll: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    paddingBottom: 5,
  },
  btnActive: {
    borderWidth: 1,
    margin: 3,
    marginHorizontal: 5,
    backgroundColor: '#2588dc',
  },
  btnNoneActive: {
    borderWidth: 1,
    margin: 3,
    marginHorizontal: 5,
    backgroundColor: 'white',
  },
});

export default Filter;
