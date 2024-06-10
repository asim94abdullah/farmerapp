//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  Platform
} from 'react-native';
import colors from '../styles/colors';

// create a component
const WrapperContainer = ({style = {}, children}) => {
  

  return (
    <View
      style={{
        ...styles.container,
        ...style,
        backgroundColor: colors.white,
      }}>
      <StatusBar
        barStyle={Platform.OS==='android' ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default WrapperContainer;
