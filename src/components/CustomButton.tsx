import React from 'react';
import {Text, TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../utils/defaultStyles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isPrimary: boolean;
  propStyle?: ViewStyle;
}

const CustomButton: React.FunctionComponent<CustomButtonProps> = ({
  title,
  onPress,
  isPrimary,
  propStyle,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.button,
      isPrimary ? styles.primaryButton : styles.secondaryButton,
      ,
      propStyle,
    ]}>
    <Text
      style={[
        styles.buttonText,
        {color: isPrimary ? colors.white : colors.black},
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.yellow,
    color: colors.white,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    color: colors.black,
    borderWidth:0.5
  },
  buttonText: {
    fontSize: 16,
  },
});

export default CustomButton;
