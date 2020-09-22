import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import RadioButtonRN from 'radio-buttons-react-native';
import Modal from 'react-native-modal';

const Sortable = ({
  isModalVisible,
  toggleModal,
  sortList,
  title,
  sortValue,
  onPressTag,
}) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      style={styles.modalView}>
      <View style={[styles.modalContent]}>
        <View>
          <Text style={styles.textTitle}>{title}</Text>
        </View>
        <View style={styles.radioGroups}>
          <RadioButtonRN
            key={Math.random()}
            textStyle={styles.textStyleSort}
            initial={sortValue?.index}
            box={false}
            data={sortList}
            animationTypes={['pulse']}
            selectedBtn={(e) => {
              if(e.index === sortValue.index) return;
              onPressTag(e);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textStyleSort: {
    paddingLeft: 10,
  },
  radioGroups: {
    width: 200,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  modalView: {
    paddingHorizontal: 30,
    flex: 1,
    width: '100%',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 4,
  },
  checkboxAll: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  textTitle: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default Sortable;
