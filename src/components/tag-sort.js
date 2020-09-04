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
        titleStyle={[{color: activeId === item.value ? 'white' : 'black'}]}
        buttonStyle={[
          styles.tagItem,
          {backgroundColor: activeId === item.value ? '#4299e1' : ''},
        ]}
        type="outline"
      />
    );
  });

const styles = StyleSheet.create({
  tagItem: {
    borderRadius: 4,
    marginRight: 7,
  },
});
export default TagsSort;
