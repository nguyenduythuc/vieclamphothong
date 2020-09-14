/* eslint-disable react-native/no-inline-styles */
/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import {useSelector} from 'react-redux';

const SelectMultiplePage = ({navigation, route}) => {
  useEffect(() => {
    console.log(route.params.occupationsWishOld);
  }, []);
  const {onPress, occupationsWishOld} = route.params;
  const [selectedFruits, setSelectedFruits] = useState(occupationsWishOld);
  const occupation = useSelector(
    (state) => state.recruitment?.listFilters?.occupation,
  );
  const occupationResult = () => {
    return occupation.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  };

  const onSelectionsChange = (selectedFruit) => {
    onPress(selectedFruit);
    setSelectedFruits(selectedFruit);
  };

  return (
    <View>
      <SelectMultiple
        key={Math.random()}
        items={occupationResult()}
        selectedItems={selectedFruits}
        maxSelect={3}
        onSelectionsChange={onSelectionsChange}
      />
    </View>
  );
};

export default SelectMultiplePage;
