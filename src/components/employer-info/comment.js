/**
 * Product Management: Up product, Buy premium, modify
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';

const Comment = ({item, isList, isSeen, isSaved, isApplied}) => {
  return (
    <View>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.title} numberOfLines={2}>
          Đây là nhận xét
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

export default Comment;
