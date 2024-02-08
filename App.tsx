import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import Home from './src/Home/Home';
import Firebase from './src/Firebase/Firebase';
import SignUp from './src/SignUp/SignUp';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/Login/Login';
import Auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import FireStore from './src/Firebase/FireStore';
import Profile from './src/Profile/Profile';
import AllMonths from './src/AllMonths/AllMonths';
import store from './src/Redux/createStore';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="signup"
            options={{headerShown: false}}
            component={SignUp}
          />
          <Stack.Screen
            name="login"
            options={{headerShown: false}}
            component={Login}
          />
          <Stack.Screen
            name="todo"
            options={{headerShown: false}}
            component={Firebase}
          />
          <Stack.Screen
            name="firestore"
            options={{headerShown: false}}
            component={FireStore}
          />
          <Stack.Screen
            name="home"
            options={{headerShown: false}}
            component={Home}
          />
          <Stack.Screen
            name="profile"
            options={{headerShown: false}}
            component={Profile}
          />
          <Stack.Screen
            name="showAllMonthsData"
            options={{headerShown: false}}
            component={AllMonths}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
