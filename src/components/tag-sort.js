import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

const TagsSort = ({data, activeId, onClick}) =>
  data.map((item) => {
    return (
      <Button
        key={Math.random()}
        title={item.label}
        onPress={() => onClick(item.value)}
        titleStyle={[
          {color: activeId === item.value ? 'white' : '#003580'},
          styles.btnTitle,
        ]}
        buttonStyle={[
          styles.tagItem,
          {backgroundColor: activeId === item.value ? '#2a86cb' : ''},
          {borderColor: activeId === item.value ? '#2a86cb' : ''},
        ]}
        type="outline"
      />
    );
  });

const styles = StyleSheet.create({
  tagItem: {
    borderRadius: 4,
    marginRight: 7,
    paddingVertical: 5,
    borderColor: '#003580',
    paddingHorizontal: 20,
  },
  btnTitle: {
    fontSize: 17,
    fontWeight: '300',
  },
});
export default TagsSort;
