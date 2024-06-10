import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/reduxstore/store';
import Routes from './src/navigation/Routes';
import FlashMessage from 'react-native-flash-message';
import {S_Medium} from './src/assets/fonts/FontNames';
import {getData} from './src/utils/helperFunctions';
import {saveUserData} from './src/reduxstore/reducers/auth';

export default function App() {
  const {dispatch} = store;

  useEffect(() => {
    initUser();
  }, []);

  const initUser = async () => {
    try {
      let data = await getData('userData');
      console.log('data asy', data);

      if (!!data) {
        dispatch(saveUserData(JSON.parse(data)));
      }
    } catch (error) {
      console.log('no data found');
    }
  };
  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage
        position={'top'}
        titleStyle={{
          fontFamily: S_Medium,
          fontSize: 14,
        }}
      />
    </Provider>
  );
}

const styles = StyleSheet.create({});
