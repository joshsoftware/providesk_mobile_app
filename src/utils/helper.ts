//@ts-nocheck
import {Alert, AlertButton, Dimensions, Text} from 'react-native';
//@ts-nocheck
import React from 'react';
import moment, {Moment} from 'moment';
const {width} = Dimensions.get('window');

export const BASE_WIDTH = 423;

export const TIME_FORMAT = 'MMM-DD YYYY HH:mm A';

export const scaleFonts = (fontSize: number) => (fontSize * width) / BASE_WIDTH;

export const ISTMoment = (dateString: string | number): Moment => {
  return moment(dateString).add(330, 'minutes');
};

export const padZeros = (n: Number) => (n < 10 ? `0${n}` : `${n}`);

export const dateTimeString = (d: Moment) => d.format(TIME_FORMAT);

export const alertError = (errorText: string, buttons?: AlertButton[]) =>
  Alert.alert(
    'Error',
    errorText,
    buttons ?? [
      {
        text: 'ok',
      },
    ],
  );

export const fixTextRender = () => {
  const oldRender = Text.render;
  Text.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [{fontFamily: 'Montserrat'}, origin.props.style],
    });
  };
};
