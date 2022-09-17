/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import * as Colors from '@res/colors';

const IndexList: React.FunctionComponent<{
  status: 'pending' | 'resolved';
}> = props => {
  return (
    <ScrollView style={styles.root}>
      <Text style={styles.text}>{props.status}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  text: {
      color: Colors.BLACK,
  }
});

export default IndexList;
