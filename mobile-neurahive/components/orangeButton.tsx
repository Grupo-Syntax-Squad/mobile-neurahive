import React, { type ComponentProps } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  title: string;
} & Pick<ComponentProps<typeof TouchableOpacity>, 'onPress'>;

const OrangeButton = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.orangeButton} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orangeButton: {
    backgroundColor: '#FC801F',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FC801F',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default OrangeButton;
