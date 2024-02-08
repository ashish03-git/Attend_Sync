import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import useCollectionLength from '../Hook/useCollectionLength';

const SignUp = () => {
  //   const [value, setValue] = useState('');
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [collectionLength, setCollectionLength] = useState();
  const navigation = useNavigation();
  const length = useCollectionLength();


  const handleSignUp = async () => {
    try {
      const signUpStatus = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await signUpStatus.user.sendEmailVerification()
      await createUserInFireStore(signUpStatus.user.uid);
       Alert.alert('Verification Email Sent', 'Please check your email to verify your account.');
    } catch (error) {
      Alert.alert(
        'Registration failed',
        error,
        'please try again after some time or contact administrator',
        [{text: 'Ok', onPress: () => {}}],
      );
    }
  };

  const createUserInFireStore = async uid => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.toLocaleString("default",{month:"long"}).toLowerCase()
    try {
      const details = {
        name: name,
        email: email,
        id: uid,

      };
      await firestore()
        .collection('employees')
        .doc(`${uid}`)
        .set(details)
        .then(() => {
          Alert.alert('Success', 'user is registered successfully', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('login'),
            }
          ]);
        });
    } catch (error) {
      Alert.alert('Firestore error', 'failed to store data into database', [
        {text: 'OK', onPress: () => {}},
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={{alignItems: 'flex-end'}}>
            <Text
              onPress={() => navigation.navigate('login')}
              style={styles.loginTxt}>
              Login
            </Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.formName}>Register</Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.formFieldContainer}>
            <View style={styles.formFieldContainer}>
              {/* name */}
              <TextInput
                placeholder="Enter Name"
                style={styles.inputField}
                onChangeText={text => setName(text)}
                value={name}
              />

              {/* Mobile Number */}
              <TextInput
                placeholder="Enter Mobile Number"
                style={styles.inputField}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={text => setNumber(text)}
                value={number}
              />

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
                onChangeText={text => setPassword(text)}
                value={password}
              />
            </View>
            <View style={styles.formButtonContainer}>
              <TouchableOpacity
                onPress={handleSignUp}
                style={styles.formButton}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
