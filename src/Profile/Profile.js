import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import firestore, {firebase} from '@react-native-firebase/firestore';
import LogOut from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import useGetAttenanceRecord from '../Hook/useGetAttenanceRecord';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcone from 'react-native-vector-icons/MaterialCommunityIcons';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {add_available_dates} from '../Redux/userDataReducer';
import {BottomSheet} from 'react-native-elements';

const Profile = () => {
  const navigation = useNavigation();
  const handleLogOut = async () => {
    await firebase.auth().signOut();
    navigation.navigate('login');
  };
  const [users_attendance_record, setUsers_attendance_record] = useState([]);
  const storedReduxUserData = useSelector(state => state.user_data.data);
  const [yearValue, setYearValue] = useState('');
  const [monthValue, setMonthValue] = useState('');
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const data = useGetAttenanceRecord(
    storedReduxUserData.id,
    yearValue,
    monthValue,
  );
  const available_dates = useSelector(state => state.user_data.available_dates);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    setTimeout(() => {
      if (typeof data === 'object') {
        setUsers_attendance_record(data);
      } else {
        setUsers_attendance_record([]);
      }
    }, 100);
  }, [data]); // Add data as a dependency here

  useEffect(() => {
    ExtractAllDates(); // Call ExtractAllDates whenever users_attendance_record changes
  }, [users_attendance_record]);

  const handleMonthChange = date => {
    const selectedDate = new Date(date.year, date.month - 1, 1); // Months are zero-indexed, so subtract 1
    let year = selectedDate.getFullYear().toString();
    const month = selectedDate
      .toLocaleString('default', {month: 'long'})
      .toLowerCase();
    setYearValue(year);
    setMonthValue(month);
  };

  const showSelectedDateData = () => {
   
  };

  const ExtractAllDates = () => {
    if (!users_attendance_record) return;

    let marked = {};
    let formattedDates = users_attendance_record.map(dateString => {
      // Convert the dateString to a Date object
      const dateObject = new Date(dateString.date);

      // Extract year, month, and day
      const year = dateObject.getFullYear();
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObject.getDate().toString().padStart(2, '0');

      // Form the desired format "YYYY-MM-DD"
      return `${year}-${month}-${day}`;
    });

    formattedDates.forEach(info => {
      marked[info] = {
        selected: true,
        selectedColor: 'green',
      };
    });
    dispatch(add_available_dates(marked));
    setMarkedDates(marked);
  };

  return (
    <Animated.View enter style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Font5
            name="arrow-left"
            onPress={() => navigation.goBack()}
            size={24}
            color="black"
          />
          <Text style={styles.headerTxt}>Profile</Text>
        </View>
        {/* <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={handleLogOut} style={styles.logOutBtn}>
            <Text style={styles.viewListTxt}>Log Out</Text>
            <LogOut name="logout" size={22} color={'white'} />
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={styles.containerTop}>
        <View style={styles.profileImage}>
          <Image
            source={{
              uri: 'https://sialifehospital.com/wp-content/uploads/2021/04/testimonial-1.png',
            }}
            style={{flex: 1}}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 26, fontWeight: '500', margin: 5}}>
            {storedReduxUserData.name}
          </Text>
          <Text style={{fontSize: 22, fontWeight: '500', margin: 5}}>
            {storedReduxUserData.email}
          </Text>
        </View>
      </View>

      <View style={styles.containerBottom}>
        {/* <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginBottom: 10,
          }}>
          <View
            style={{
              flex: 2,
              marginVertical: 5,
            }}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
              Current Month Records:
            </Text>
          </View>
        </View>

        <View style={styles.listContainer}>
          {users_attendance_record !== null &&
          users_attendance_record.length > 0 ? (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={users_attendance_record}
                renderItem={({item}) => {
                  return (
                    <View style={styles.listItemContainer}>
                      <View style={styles.dateEmptyContainer}>
                        <View style={styles.itemDateContainer}>
                          <Text style={styles.itemDatetxt}>
                            Date : {item.date}
                          </Text>
                        </View>
                        <View style={{flex: 1}}></View>
                      </View>
                      <View style={styles.attendanceDetails}>
                        <Text style={{fontSize: 16, color: 'black'}}>
                          In:{' '}
                          <Text style={styles.entyTxt}>{item.check_in}</Text>{' '}
                        </Text>
                        <Text style={styles.seperator}>|</Text>
                        <Text style={{fontSize: 16, color: 'black'}}>
                          Out:
                          <Text style={styles.exitTxt}> {item.check_out}</Text>
                        </Text>
                        <Text style={styles.seperator}>|</Text>
                        <Text style={{fontSize: 16, color: 'black'}}>
                          Time:{' '}
                          <Text style={styles.workTxt}>
                            {item.work_hours} hr
                          </Text>
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </>
          ) : (
            <>
              <MaterialCommunityIcone name="note-off" size={50} color={'red'} />
              <Text style={styles.noDataTxt}>
                No Record Found For Current Month
              </Text>
            </>
          )}
        </View> */}

        <Calendar
          style={{borderWidth: 1, borderColor: 'green', borderRadius: 10}}
          onMonthChange={handleMonthChange}
          markedDates={available_dates ? available_dates : markedDates}
          onDayPress={showSelectedDateData}
          // onLongPress={showSelectedDateData}
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleLogOut} style={styles.viewList}>
          {/* <Text style={styles.backBtnTxt}>Logout</Text> */}
          <LogOut name="logout" size={30} color={'white'} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Profile;
