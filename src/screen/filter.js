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

function getKm(distance) {
  return Math.floor(distance * 100);
}
const placeList = [
  {id: 1, name: 'Xí nghiệp'},
  {id: 2, name: 'Nhà hàng'},
  {id: 3, name: 'Cửa hàng'},
  {id: 4, name: 'Khách sạn'},
  {id: 5, name: 'Quán ăn'},
  {id: 6, name: 'Quán coffe'},
  {id: 7, name: 'Loại Khác'},
];
const workList = [
  {id: 1, name: 'Sản xuất'},
  {id: 2, name: 'Vệ sinh'},
  {id: 3, name: 'Bảo vệ'},
  {id: 4, name: 'Bán hàng'},
  {id: 5, name: 'Nấu ăn'},
  {id: 6, name: 'Phục vụ'},
];
const standardList = [
  {id: 1, name: 'THCS'},
  {id: 2, name: 'THPT'},
  {id: 3, name: 'TTGDTX'},
  {id: 4, name: 'Trung Cấp'},
  {id: 5, name: 'Cao Đẳng'},
  {id: 6, name: 'Đại Học'},
  {id: 7, name: 'Sinh Viên'},
  {id: 8, name: 'Loại Khác'},
];
const genderList = [
  {id: 1, name: 'Nam'},
  {id: 2, name: 'Nữ'},
];
const ageList = [
  {id: 1, name: '15-18 tuổi'},
  {id: 2, name: '19-22 tuổi'},
  {id: 3, name: '23-26 tuổi'},
  {id: 4, name: '27-30 tuổi'},
  {id: 5, name: 'Trên 30 tuổi'},
];
const salaryList = [
  {id: 1, name: 'Theo giờ'},
  {id: 2, name: '1tr-3tr'},
  {id: 3, name: '4tr-6tr'},
  {id: 4, name: '7tr-9tr'},
  {id: 5, name: '10tr-12tr'},
  {id: 6, name: '13tr-15tr'},
  {id: 7, name: 'Trên 15tr'},
];
const experienceList = [
  {id: 1, name: 'Không'},
  {id: 2, name: '1-2 năm'},
  {id: 3, name: '3-5 năm'},
  {id: 4, name: 'Trên 5 năm'},
];
const Filter = () => {
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    console.log('didmount');
  }, []);

  //checkbox group
  const [checkBoxPlace, setCheckBoxPlace] = useState(false);
  const [checkBoxPlaceList, setCheckBoxPlaceList] = useState([]);
  const listIdsPlace = placeList.map((item) => item.id);
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
  const listIdsWork = workList.map((item) => item.id);
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
  const [checkBoxStandard, setCheckBoxStandard] = useState('');
  const onCheckOneStandard = useCallback(
    (standard) => {
      let tempStandard = checkBoxStandard;
      tempStandard === standard
        ? setCheckBoxStandard('')
        : setCheckBoxStandard(standard);
    },
    [checkBoxStandard],
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

  //checkbox grou
  const [checkBoxSalary, setCheckBoxSalary] = useState(false);
  const [checkBoxSalaryList, setCheckBoxSalaryList] = useState([]);
  const listIdsSalary = salaryList.map((item) => item.id);
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
          {placeList.map((item, idx) => (
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
          {workList.map((item, idx) => (
            <View style={styles.col}>
              <Button
                title={item.name}
                buttonStyle={
                  checkBoxWorkList.includes(item.id)
                    ? styles.btnActive
                    : styles.btnNoneActive
                }
                titleStyle={{
                  color: checkBoxWorkList.includes(item.id) ? 'white' : 'black',
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
          {standardList.map((item, idx) => (
            <View style={styles.col}>
              <Button
                title={item.name}
                type="outline"
                buttonStyle={
                  checkBoxStandard === item.id
                    ? styles.btnActive
                    : styles.btnNoneActive
                }
                titleStyle={{
                  color: checkBoxStandard === item.id ? 'white' : 'black',
                }}
                onPress={() => {
                  onCheckOneStandard(item.id);
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
          {genderList.map((item, idx) => (
            <View style={styles.col}>
              <Button
                title={item.name}
                type="outline"
                buttonStyle={
                  checkBoxGender === item.id
                    ? styles.btnActive
                    : styles.btnNoneActive
                }
                titleStyle={{
                  color: checkBoxGender === item.id ? 'white' : 'black',
                }}
                onPress={() => {
                  onCheckOneGender(item.id);
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
          {ageList.map((item, idx) => (
            <View style={styles.col}>
              <Button
                title={item.name}
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
          {salaryList.map((item, idx) => (
            <View style={styles.col}>
              <Button
                title={item.name}
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
          {experienceList.map((item, idx) => (
            <View style={styles.col}>
              <Button
                title={item.name}
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
              onPress={() => {}}
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
