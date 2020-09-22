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
    // <Modal testID={'modal'} isVisible={isModalVisible} onBackdropPress={toggleModal}>
    //   <View>
    //     <Text style={styles.textTitle}>{title}</Text>
    //   </View>
    // </Modal>
    <Modal
      testID={'modal'}
      isVisible={isModalVisible}
      // swipeDirection={['up', 'left', 'right', 'down']}
      onBackdropPress={toggleModal}
      style={styles.modalView}>
      <View style={[styles.modalContent]}>
        <View>
          <Text style={styles.textTitle}>{title}</Text>
        </View>
        {sortList.map((item, idx) => (
          <CheckBox
            containerStyle={styles.checkboxAll}
            title={item.label}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            // checked={checkBoxPlace}
            // onPress={() => onCheckAllPlace()}
          />
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    // justifyContent: 'flex-end',
    // position: 'absolute',
    // top: 150,
    paddingHorizontal: 30,
    flex: 1,
    width: '100%',
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
