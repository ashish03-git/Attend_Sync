/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import firebaseConfig from './firebaseConfig';
// import { initializeApp } from '@react-native-firebase/app';

// initializeApp(firebaseConfig);
AppRegistry.registerComponent(appName, () => App);
