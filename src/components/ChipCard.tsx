import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {scaleFonts} from '@utils/helper';
import * as Colors from '@res/colors';

const ChipCard = (props: any) => {
  const {item, isSelected, hideImage, onPress} = props;

  const showImage = !(hideImage === true) && isSelected;
  return (
    <TouchableOpacity
      style={[
        styles.chipCard,
        isSelected && styles.selectedChipCard,
        showImage && styles.imageShown,
      ]}
      onPress={() => onPress && onPress(item)}>
      {isSelected && showImage && (
        <Image
          source={require('@assets/images/check.png')}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.chipCardText,
          isSelected && styles.selectedChipCardText,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default ChipCard;

const styles = StyleSheet.create({
  chipCard: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    marginEnd: 8,
    marginVertical: 6,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.PRIMARY,
  },
  chipCardText: {
    fontSize: scaleFonts(16),
    color: Colors.PRIMARY,
  },
  imageShown: {
    paddingStart: 0,
  },
  selectedChipCard: {
    backgroundColor: Colors.BG_DARK,
    color: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  selectedChipCardText: {
    color: Colors.PRIMARY,
  },
  icon: {
    width: 18,
    height: 18,
    marginHorizontal: 8,
    tintColor: Colors.PRIMARY,
  },
});
