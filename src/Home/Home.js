// import {
//   View,
//   Text,
//   Dimensions,
//   SafeAreaView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import styles from './style';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
// import database from '@react-native-firebase/database';
// import Geolocation from '@react-native-community/geolocation';
// import geolib, {getDistance} from 'geolib';
// import {parse, compareAsc} from 'date-fns';

// const Home = () => {
//   const [toggle, setToggle] = useState(true);
//   const [currentTime, setCurrentTime] = useState(
//     new Date().toLocaleTimeString(),
//   );
//   const [checkInTime, setCheckInTime] = useState('- - / - -');
//   const [checkExitTime, setCheckExitTime] = useState('- - / - -');
//   const [workHours, setWorkHours] = useState('- - / - -');
//   const [date, setDate] = useState(new Date().toDateString());
//   const [checkDate, setCheckDate] = useState('');
//   const [showThanks, setShowThanks] = useState(false);
//   const [officeTime, setOfficeTime] = useState('10:30:00 am');
//   const [activityIndicator, setActivityIndicator] = useState(false);
//   const [officeCordinates, setOfficeCordinates] = useState({
//     latitude: 22.7153547,
//     longitude: 75.87424,
//   });
//   const [usersCordinates, setUsersCordinates] = useState();

//   useEffect(() => {
//     Geolocation.getCurrentPosition(info => setUsersCordinates(info.coords));
//   }, []);

//   useEffect(() => {
//     setActivityIndicator(true);
//     setDate(new Date().toDateString());
//     getStoredDate();
//     AsyncStorage.clear();
//   }, [checkDate]);

//   const getStoredDate = async () => {
//     try {
//       const storedDate = await AsyncStorage.getItem('stored_date').then(
//         data => {
//           setActivityIndicator(false);
//           return data;
//         },
//       );
//       if (date === storedDate) {
//         // setShowThanks(true);

//         await AsyncStorage.getItem('check_in').then(data => {
//           if (data) {
//             setToggle(false);
//             return setCheckInTime(data);
//           }
//         });

//         await AsyncStorage.getItem('check_out').then(data => {
//           if (data) {
//             setShowThanks(true);
//             return setCheckExitTime(data);
//           }
//         });

//         await AsyncStorage.getItem('work_hours').then(data => {
//           if (data) {
//             // console.log(data);
//             return setWorkHours(data);
//           }
//         });
//         setActivityIndicator(false);
//       }

//       setActivityIndicator(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   setInterval(() => {
//     setCurrentTime(new Date().toLocaleTimeString());
//   }, 1000);

//   const showAlert = message => {
//     Alert.alert(`Something went wrong`, message, [
//       {
//         text: 'OK',
//         onPress: () => {
//           return;
//         },
//       },
//     ]);
//   };

//   const CheckIn = () => {
//     AsyncStorage.clear();

//     // here i'm obtaining the distance between user and office
//     const distanceToOffice = getDistance(
//       officeCordinates,
//       usersCordinates,
//       (accurancy = 4),
//     );
//     const maximum_distance_allowed = 100;

//     // here i'm converting the time and date of current time and office time in a format which return that the distance is less
//     // or more than the officeTime
//     const currentTimeString = new Date().toLocaleTimeString([], {hour12: true});
//     const currentTimeObject = parse(currentTimeString, 'h:mm:ss a', new Date());
//     const officeTimeObject = parse(officeTime, 'h:mm:ss a', new Date());
//     const comparisonResult = compareAsc(currentTimeObject, officeTimeObject);

//     // Here is my conditional comparison which check if the distance and time is same then user will check in
//     // and if -1 then office time is not started yet.
//     if (
//       comparisonResult === 1 &&
//       distanceToOffice <= maximum_distance_allowed
//     ) {
//       // console.log('check In ');
//       AsyncStorage.setItem('check_in', currentTime);
//       AsyncStorage.setItem('stored_date', date);
//       setCheckInTime(currentTime);
//       setToggle(!toggle);
//     } else if (comparisonResult === -1) {
//       showAlert(`Please check in after ${officeTime}`);
//     } else {
//       showAlert(`Your are ${distanceToOffice} meters away from office`);
//     }
//   };

//   const CheckOut = async () => {
//     AsyncStorage.setItem('check_out', currentTime);
//     setCheckExitTime(currentTime);
//     calculateHours(currentTime);
//     // setToggle(!toggle);
//   };

//   const calculateHours = async exitTime => {
//     try {
//       const morningTime = checkInTime;
//       const eveningTime = exitTime;

//       const arr1 = morningTime.split(':');
//       const arr2 = eveningTime.split(':');

//       arr1[2] = arr1[2].slice(0, 2);
//       arr2[2] = arr2[2].slice(0, 2);

//       let inTime = arr1.map(Number);
//       let outTime = arr2.map(Number);

//       let inSeconds = inTime[0] * 3600 + inTime[1] * 60 + inTime[2];
//       let outSeconds = outTime[0] * 3600 + outTime[1] * 60 + outTime[2];

//       let timeDifference = outSeconds - inSeconds;

//       let hours = Math.floor(timeDifference / 3600);
//       let minutes = Math.floor((timeDifference % 3600) / 60);
//       let seconds = timeDifference % 60;
//       setWorkHours(`${hours} : ${minutes}: ${seconds}`);
//       await AsyncStorage.setItem(
//         'work_hours',
//         `${hours} : ${minutes} : ${seconds}`,
//       );
//       setShowThanks(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // const getFirebaseData = async () => {
//   //   try {
//   //     const userData = await firestore()
//   //       .collection('AttendSync')
//   //       .doc('vTw6SEw3EWe6ApfpeQH0')
//   //       .get();
//   //     // console.log(userData)
//   //     setAttendanceDetails(userData._data);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   // const getFirebaseApiData = async () => {
//   //   try {
//   //     const databaseRef = await database()
//   //       .ref('/employees/sunil')
//   //       .once('value');
//   //     // console.log(databaseRef.val());
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   return (
//     <View style={styles.container}>
//       {activityIndicator ? (
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <ActivityIndicator size={'large'} />
//         </View>
//       ) : (
//         <>
//           {/* welcome container  */}
//           <View style={styles.welcomeContainer}>
//             <View style={styles.nameContainer}>
//               <Text style={styles.nameTxt}>Hiii Ashish</Text>
//               <Text style={styles.nameSubTxt}>
//                 Good Morning Mark Your Attendance{' '}
//               </Text>
//             </View>
//             <View style={styles.profileImgContainer}>
//               <View style={styles.profileImg}>
//                 <Image
//                   source={{
//                     uri: 'https://sialifehospital.com/wp-content/uploads/2021/04/testimonial-1.png',
//                   }}
//                   style={{flex: 1}}
//                 />
//               </View>
//             </View>
//           </View>

//           {/* time and btn container */}
//           <View style={styles.checkInContainer}>
//             <View style={styles.todayTime}>
//               <Text style={{fontSize: 65, color: 'black', fontWeight: '500'}}>
//                 {currentTime.toUpperCase()}
//               </Text>
//               <Text style={{fontSize: 22}}>{date}</Text>
//             </View>

//             {showThanks ? (
//               <View style={styles.thanksContainer}>
//                 <View style={styles.thanksIcone}>
//                   <Image
//                     source={require('../../assets/pray.png')}
//                     style={{width: 100, height: 100}}
//                   />
//                   <Text style={styles.thanksTxt}>Thank You, Ashish!</Text>
//                   <Text style={styles.complementTxt}>
//                     Your hard work and dedication are truly appreciable.
//                   </Text>
//                 </View>
//                 <View style={styles.thanksCompanyName}>
//                   <Text style={styles.companyNameTxt}>
//                     Best regards, SRN Infotech
//                   </Text>
//                 </View>
//               </View>
//             ) : (
//               <View style={styles.checkInBtnContainer}>
//                 {toggle ? (
//                   <>
//                     <TouchableOpacity
//                       onPress={CheckIn}
//                       style={styles.checkInBtn}>
//                       <Image
//                         source={require('../../assets/log-out.png')}
//                         style={{width: 90, height: 90}}
//                       />
//                     </TouchableOpacity>
//                     <Text style={{fontSize: 28, margin: 10, color: 'green'}}>
//                       Check-In
//                     </Text>
//                   </>
//                 ) : (
//                   <>
//                     <TouchableOpacity
//                       onPress={CheckOut}
//                       style={styles.checkInBtn}>
//                       <Image
//                         source={require('../../assets/exit.png')}
//                         style={{width: 80, height: 80}}
//                       />
//                     </TouchableOpacity>
//                     <Text style={{fontSize: 28, margin: 10, color: 'red'}}>
//                       Check-Out
//                     </Text>
//                   </>
//                 )}
//               </View>
//             )}
//           </View>

//           {/* check in and check out time out */}
//           <View style={styles.todayDetails}>
//             <View style={styles.CheckTiming}>
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <Image
//                   source={require('../../assets/log-out.png')}
//                   style={{
//                     width: 48,
//                     height: 48,
//                   }}
//                 />
//               </View>
//               <View style={{justifyContent: 'center', alignItems: 'center'}}>
//                 <Text style={styles.checkEntryTime}>{checkInTime}</Text>
//                 <Text style={styles.txt}>(hr/mm/ss)</Text>
//                 <Text style={styles.txt}>Check - In</Text>
//               </View>
//             </View>

//             <View style={styles.CheckTiming}>
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <Image
//                   source={require('../../assets/exit.png')}
//                   style={{
//                     width: 48,
//                     height: 48,
//                   }}
//                 />
//               </View>
//               <View style={{justifyContent: 'center', alignItems: 'center'}}>
//                 <Text style={styles.checkLeaveTime}>{checkExitTime}</Text>
//                 <Text style={styles.txt}>(hr/mm/ss)</Text>
//                 <Text style={styles.txt}>Check - Out</Text>
//               </View>
//             </View>

//             <View style={styles.CheckTiming}>
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <Image
//                   source={require('../../assets/nonstop.png')}
//                   style={{
//                     width: 60,
//                     height: 60,
//                   }}
//                 />
//               </View>
//               <View style={{justifyContent: 'center', alignItems: 'center'}}>
//                 <Text style={styles.checkEntryTime}>{workHours}</Text>
//                 <Text style={styles.txt}>(hr/mm/ss)</Text>
//                 <Text style={styles.txt}>Work - Hours</Text>
//               </View>
//             </View>
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// export default Home;

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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import geolib, {getDistance} from 'geolib';
import {parse, compareAsc,} from 'date-fns';

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
    latitude: 22.7153547,
    longitude: 75.87424,
  });
  const [usersCordinates, setUsersCordinates] = useState();

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(info =>
            setUsersCordinates(info.coords),
          );
        } else {
          Alert.alert(
            'Location permission denied. The app may not work correctly.',
          );
        }
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    AsyncStorage.clear();
    setActivityIndicator(true);
    setDate(new Date().toDateString());
    getStoredDate();
  }, [checkDate]);

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

  const showAlert = message => {
    Alert.alert('Something went wrong', message, [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };

  const CheckIn = () => {
    AsyncStorage.clear();

    const distanceToOffice = getDistance(
      officeCordinates,
      usersCordinates,
      (accuracy = 4),
    );
    const maximumDistanceAllowed = 100;

    const currentTimeString = new Date().toLocaleTimeString([], {hour12: true});
    const currentTimeObject = parse(currentTimeString, 'h:mm:ss a', new Date());
    const officeTimeObject = parse(officeTime, 'h:mm:ss a', new Date());
    const comparisonResult = compareAsc(currentTimeObject, officeTimeObject);

    if (comparisonResult === 1 && distanceToOffice <= maximumDistanceAllowed) {
      AsyncStorage.setItem('check_in', currentTime);
      AsyncStorage.setItem('stored_date', date);
      setCheckInTime(currentTime);
      setToggle(!toggle);
    } else if (comparisonResult === -1) {
      showAlert(`Please check in after ${officeTime}`);
    } else {
      showAlert(`You are ${distanceToOffice} meters away from the office`);
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
    } catch (err) {
      console.log('Error calculating hours:', err);
    }
  };

  return (
    <View style={styles.container}>
      {activityIndicator ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          {/* welcome container  */}
          <View style={styles.welcomeContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>Hiii Ashish</Text>
              <Text style={styles.nameSubTxt}>
                Good Morning Mark Your Attendance{' '}
              </Text>
            </View>
            <View style={styles.profileImgContainer}>
              <View style={styles.profileImg}>
                <Image
                  source={{
                    uri: 'https://sialifehospital.com/wp-content/uploads/2021/04/testimonial-1.png',
                  }}
                  style={{flex: 1}}
                />
              </View>
            </View>
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
                  <Text style={styles.thanksTxt}>Thank You, Ashish!</Text>
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
        </>
      )}
    </View>
  );
};

export default Home;
