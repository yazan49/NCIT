import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SharedValue} from 'react-native-reanimated';

const Header = ({active}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Pressable
        style={styles.ham}
        onPress={() => {
          active.value = true;
        }}>
        <Image source={require('../assets/Hamburger.png')} style={styles.ham} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252d3a',
    padding: 20,
  },
  ham: {
    width: 34,
    height: 30,
  },
});
