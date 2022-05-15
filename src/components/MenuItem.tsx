import React from 'react';
import {StyleSheet, Pressable, Text, Platform} from 'react-native';

export interface MenuItemProps {
  onPress(): void;
  name: string;
}

function MenuItem({name, onPress}: MenuItemProps) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.block,
        pressed && Platform.OS === 'ios' && styles.pressed,
      ]}
      onPress={onPress}
      android_ripple={{color: '#eeeeee'}}>
      <Text>{name}</Text>
    </Pressable>
  );
}

export default MenuItem;

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  pressed: {
    backgroundColor: '#eeeeee',
  },
});
