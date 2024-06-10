import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import SignIn from '../screens/auth/SignIn';
import Home from '../screens/apps/Home';
import SingleOrder from '../screens/apps/SingleOrder';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Routes() {
  const userData = useSelector(state => state.auth.userData);

  console.log('userData', userData);

  const AuthStacke = () => {
    return (      
        <Stack.Navigator
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: {backgroundColor: 'black'},
          }}>
          <Stack.Screen
            options={{headerShown: false}}
            name="SignIn"
            component={SignIn}
          />
        </Stack.Navigator>
    );
  };
  const AppStacke = () => {
    return (      
        <Stack.Navigator
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: {backgroundColor: 'black'},
          }}>
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="singleorder"
            component={SingleOrder}
          />
        </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      {Object.keys(userData).length === 0 ? <AuthStacke />: <AppStacke/>}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
