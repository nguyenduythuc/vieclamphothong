/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';

const Sortable = ({isModalVisible, toggleModal, sortList, title}) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={isModalVisible}
      swipeDirection={['up', 'left', 'right', 'down']}
      onBackdropPress={toggleModal}
      style={styles.modalView}>
      <View style={styles.modalContent}>
        <View>
          <Text style={styles.textTitle}>{title}</Text>
        </View>
        {sortList.map((item, idx) => (
          <CheckBox
            containerStyle={styles.checkboxAll}
            title={item.text}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            // checked={checkBoxPlace}
            // onPress={() => onCheckAllPlace()}
          />
        ))}
        <Button title="Lọc" onPress={toggleModal} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
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
