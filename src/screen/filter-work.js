import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';

const isNotch = DeviceInfo.hasNotch();
const FilterWork = ({navigation, route}) => {
  const occupation = useSelector(
    (state) => state.recruitment.listFilters?.occupation,
  );
  useEffect(() => {
    console.log('didmount');
  }, []);

  const {callbackFilterWork, listIdsWordOld} = route.params;
  const [checkBoxWorkList, setCheckBoxWorkList] = useState(listIdsWordOld);
  const onCheckOneWork = useCallback(
    (work) => {
      let tempWork = [...checkBoxWorkList];
      const index = tempWork.indexOf(work);
      index > -1
        ? tempWork.splice(index, 1)
        : tempWork.length === 4
        ? null
        : tempWork.push(work);
      console.log(tempWork);
      setCheckBoxWorkList(tempWork);
    },
    [checkBoxWorkList],
  );
  const submitWork = useCallback(
    (work) => {
      callbackFilterWork(checkBoxWorkList);
      navigation.goBack();
    },
    [callbackFilterWork, checkBoxWorkList, navigation],
  );

  return (
    <SafeAreaView>
      <Button
        title="Đồng ý"
        buttonStyle={styles.btnViewResult}
        type="clear"
        titleStyle={{color: 'white'}}
        containerStyle={styles.acceptButtonStyle}
        onPress={submitWork}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.blockTitle}>
          <Text style={styles.blockTitleText}>Chọn tối đa 4 công việc</Text>
        </View>
        <View style={[styles.row, styles.workList]}>
          {occupation &&
            occupation.map((item, idx) => (
              <View style={styles.col}>
                <Button
                  title={item.name}
                  buttonStyle={
                    checkBoxWorkList.includes(item.id)
                      ? styles.btnActive
                      : styles.btnNoneActive
                  }
                  // eslint-disable-next-line react-native/no-inline-styles
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
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 70,
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
  btnViewResult: {
    backgroundColor: '#48bb78',
    borderRadius: 20,
    width: '80%',
    paddingHorizontal: '20%',
  },
  acceptButtonStyle: {
    position: 'absolute',
    zIndex: 10,
    bottom: 50,
    right: '10%',
  },
});

export default FilterWork;
