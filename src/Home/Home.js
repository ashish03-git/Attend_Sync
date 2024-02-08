import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
// import Geolocation, {
//   getCurrentPosition,
// } from 'react-native-geolocation-service';
import geolib, {getDistance} from 'geolib';
import {parse, compareAsc} from 'date-fns';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import font from 'react-native-vector-icons/FontAwesome';
// import firebase from "@react-native-firebase/database"
import {add_data} from '../Redux/userDataReducer';
import {UseDispatch, useDispatch, useSelector} from 'react-redux';

const Home = () => {
  const [toggle, setToggle] = useState(true);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );
  const [checkInTime, setCheckInTime] = useState('- - / - -');
  const [checkExitTime, setCheckExitTime] = useState('- - / - -');
  const [workHours, setWorkHours] = useState('- - / - -');
  const [date, setDate] = useState(new Date().toDateString());
  const [checkDate, setCheckDate] = useState('');
  const [showThanks, setShowThanks] = useState(false);
  const [officeTime, setOfficeTime] = useState('10:30:00 am');
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [officeCordinates, setOfficeCordinates] = useState({
    latitude: 22.71540662,
    longitude: 75.87396876,
  });
  const navigation = useNavigation();
  const [usersCordinates, setUsersCordinates] = useState({});
  const route = useRoute();
  const uid = route.params.uid;
  const storedReduxUserData = useSelector(state => state.user_data.data);
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // console.log(latitude, longitude);
        setUsersCordinates({latitude, longitude});
      },
      error => {
        // See error code charts below.
        // console.log(error.code, error.message);
        Alert.alert('Location is required', error.message, [
          {
            text: 'retry',
            onPress: getCurrentLocation,
          },
        ]);
      },
      {enableHighAccuracy: true},
    );

    // Remember to clear the watch when it's no longer needed, for example, when the component unmounts
    // You can clear the watch using Geolocation.clearWatch(watchId)
  };

  useEffect(() => {
    getCurrentLocation();
    getUserDetailsFromFirebase();
  }, []);

  useEffect(() => {
    // AsyncStorage.clear();
    setDate(new Date().toDateString());
    getStoredDate();
  }, [checkDate]);

  const getUserDetailsFromFirebase = async () => {
    if (uid) {
      const data = await firestore().collection('employees').doc(uid).get();
      if (data.exists) {
        let uniqueUser = data.data();
        dispatch(add_data(uniqueUser));
        setUserDetails(uniqueUser);
      } else {
        Alert.alert('Something went wrong', 'No Data Available For This UID ', [
          {
            text: 'Ok',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
      }
    }
  };

  const getStoredDate = async () => {
    try {
      const storedDate = await AsyncStorage.getItem('stored_date');
      if (date === storedDate) {
        await AsyncStorage.getItem('check_in').then(data => {
          if (data) {
            setToggle(false);
            return setCheckInTime(data);
          }
        });

        await AsyncStorage.getItem('check_out').then(data => {
          if (data) {
            setShowThanks(true);
            return setCheckExitTime(data);
          }
        });

        await AsyncStorage.getItem('work_hours').then(data => {
          if (data) {
            setWorkHours(data);
          }
        });
      }

      setActivityIndicator(false);
    } catch (err) {
      console.log('Error retrieving stored date:', err);
    }
  };

  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, 1000);

  const CheckIn = async () => {
    AsyncStorage.clear();

    const distanceToOffice = getDistance(
      officeCordinates,
      usersCordinates,
      (accuracy = 4),
    );
    // console.log(distanceToOffice);

    const maximumDistanceAllowed = 100;

    const currentTimeString = new Date().toLocaleTimeString([], {hour12: true});
    const currentTimeObject = parse(currentTimeString, 'h:mm:ss a', new Date());
    const officeTimeObject = parse(officeTime, 'h:mm:ss a', new Date());
    const comparisonResult = compareAsc(currentTimeObject, officeTimeObject);
    // const comparisonResult = 0;
    // console.log(comparisonResult)

    if (comparisonResult === 1 && distanceToOffice <= maximumDistanceAllowed) {
      AsyncStorage.setItem('check_in', currentTime);
      AsyncStorage.setItem('stored_date', date);
      setCheckInTime(currentTime);
      setToggle(!toggle);
    } else if (comparisonResult === -1) {
      Alert.alert(
        'something went wrong',
        `please check in after ${officeTime}`,
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
      );
    } else if (distanceToOffice > maximumDistanceAllowed) {
      Alert.alert(
        'something went wrong',
        `You are ${distanceToOffice} meters away from the office`,
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
      );
    } else {
      Alert.alert('something went wrong', 'please check in again', [
        {
          text: 'retry',
          onPress: CheckIn,
        },
      ]);
    }
  };

  const CheckOut = async () => {
    AsyncStorage.setItem('check_out', currentTime);
    setCheckExitTime(currentTime);
    calculateHours(currentTime);
  };

  const calculateHours = async exitTime => {
    try {
      const morningTime = checkInTime;
      const eveningTime = exitTime;

      const arr1 = morningTime.split(':');
      const arr2 = eveningTime.split(':');

      arr1[2] = arr1[2].slice(0, 2);
      arr2[2] = arr2[2].slice(0, 2);

      const inTime = arr1.map(Number);
      const outTime = arr2.map(Number);

      const inSeconds = inTime[0] * 3600 + inTime[1] * 60 + inTime[2];
      const outSeconds = outTime[0] * 3600 + outTime[1] * 60 + outTime[2];

      const timeDifference = outSeconds - inSeconds;

      const hours = Math.floor(timeDifference / 3600);
      const minutes = Math.floor((timeDifference % 3600) / 60);
      const seconds = timeDifference % 60;

      setWorkHours(`${hours} : ${minutes}: ${seconds}`);
      await AsyncStorage.setItem(
        'work_hours',
        `${hours} : ${minutes} : ${seconds}`,
      );

      setShowThanks(true);
      await AddValueInFireStore(
        date,
        checkInTime,
        exitTime,
        `${hours} : ${minutes}: ${seconds}`,
      );
    } catch (err) {
      Alert.alert(err, 'please contact your administrator', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
  };

  const AddValueInFireStore = async (
    date,
    checkInTime,
    checkExitTime,
    workHours,
  ) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate
      .toLocaleString('default', {month: 'long'})
      .toLowerCase();

    let payload = {
      date: date,
      check_in: checkInTime,
      check_out: checkExitTime,
      work_hours: workHours,
    };
    await // Update the attendance record
    firestore()
      .collection('employees')
      .doc(uid)
      .update({
        [`attendance_records.${currentYear}.${currentMonth}`]:
          firebase.firestore.FieldValue.arrayUnion(payload),
      })
      .then(() => console.log('Data added to firestore'))
      .catch(error =>
        console.error('Error updating attendance record:', error),
      );
  };

  return (
    <>
      {activityIndicator ? (
        <>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        </>
      ) : (
        <View style={styles.container}>
          {/* welcome container  */}
          <View style={styles.welcomeContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>Hiii {userDetails.name}</Text>
              <Text style={styles.nameSubTxt}>
                Good Morning Mark Your Attendance{' '}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('profile')}
              style={styles.profileImgContainer}>
              <View style={styles.profileImg}>
                <Image
                  source={{
                    uri: 'https://sialifehospital.com/wp-content/uploads/2021/04/testimonial-1.png',
                  }}
                  style={{flex: 1}}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* time and btn container */}
          <View style={styles.checkInContainer}>
            <View style={styles.todayTime}>
              <Text style={{fontSize: 65, color: 'black', fontWeight: '500'}}>
                {currentTime.toUpperCase()}
              </Text>
              <Text style={{fontSize: 22}}>{date}</Text>
            </View>

            {showThanks ? (
              <View style={styles.thanksContainer}>
                <View style={styles.thanksIcone}>
                  <Image
                    source={require('../../assets/pray.png')}
                    style={{width: 100, height: 100}}
                  />
                  <Text style={styles.thanksTxt}>
                    Thank You, {userDetails.name}!
                  </Text>
                  <Text style={styles.complementTxt}>
                    Your hard work and dedication are truly appreciable.
                  </Text>
                </View>
                <View style={styles.thanksCompanyName}>
                  <Text style={styles.companyNameTxt}>
                    Best regards, SRN Infotech
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.checkInBtnContainer}>
                {toggle ? (
                  <>
                    <TouchableOpacity
                      onPress={CheckIn}
                      style={styles.checkInBtn}>
                      <Image
                        source={require('../../assets/log-out.png')}
                        style={{width: 90, height: 90}}
                      />
                    </TouchableOpacity>
                    <Text style={{fontSize: 28, margin: 10, color: 'green'}}>
                      Check-In
                    </Text>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={CheckOut}
                      style={styles.checkInBtn}>
                      <Image
                        source={require('../../assets/exit.png')}
                        style={{width: 80, height: 80}}
                      />
                    </TouchableOpacity>
                    <Text style={{fontSize: 28, margin: 10, color: 'red'}}>
                      Check-Out
                    </Text>
                  </>
                )}
              </View>
            )}
          </View>

          {/* check in and check out time out */}
          <View style={styles.todayDetails}>
            <View style={styles.CheckTiming}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/log-out.png')}
                  style={{
                    width: 48,
                    height: 48,
                  }}
                />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.checkEntryTime}>{checkInTime}</Text>
                <Text style={styles.txt}>(hr/mm/ss)</Text>
                <Text style={styles.txt}>Check - In</Text>
              </View>
            </View>

            <View style={styles.CheckTiming}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/exit.png')}
                  style={{
                    width: 48,
                    height: 48,
                  }}
                />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.checkLeaveTime}>{checkExitTime}</Text>
                <Text style={styles.txt}>(hr/mm/ss)</Text>
                <Text style={styles.txt}>Check - Out</Text>
              </View>
            </View>

            <View style={styles.CheckTiming}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/nonstop.png')}
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.checkEntryTime}>{workHours}</Text>
                <Text style={styles.txt}>(hr/mm/ss)</Text>
                <Text style={styles.txt}>Work - Hours</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Home;
