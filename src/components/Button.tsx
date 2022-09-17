import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Colors from '@res/colors';

const Button = (props: any) => {
  const {label, style, onPress, buttonLabelStyle} = props;

  return (
    <TouchableOpacity style={[styles.button, style ?? {}]} onPress={onPress}>
      <Text style={[styles.buttonLabel, buttonLabelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    borderRadius: 20,
    minHeight: 40,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.BG_DARK,
  },
  buttonLabel: {
    color: Colors.WHITE,
  },
});
