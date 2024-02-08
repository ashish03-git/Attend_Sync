import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import styles from '../SignUp/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const loginStatus = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      if (loginStatus) {
        const id = loginStatus.user.uid;
        navigation.navigate('home', {uid: id});
      } else {
        Alert.alert(
          'Error',
          'Email is already sended to your gmail while registration',
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert('Login Failed', error, [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{alignItems: 'flex-end'}}>
          <Text
            onPress={() => {
              navigation.navigate('signup');
            }}
            style={styles.loginTxt}>
            Register
          </Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.formName}>Login</Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.formFieldContainer}>
          <View style={styles.formFieldContainer}>
            {/* Email */}
            <TextInput
              placeholder="Enter Email Address"
              style={styles.inputField}
              onChangeText={text => setEmail(text)}
              value={email}
            />

            {/* password*/}
            <TextInput
              placeholder="Enter Password"
              style={styles.inputField}
              maxLength={8}
              keyboardType="numeric"
              onChangeText={text => setPassword(text)}
              value={password}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.formButton}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            onPress={() => {
              console.log('forget password');
            }}
            style={{
              margin: 20,
              fontSize: 18,
              color: '#CB01CF',
              fontWeight: '700',
              alignSelf: 'flex-start',
            }}>
            Forget Password
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
