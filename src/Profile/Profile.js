import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Font from 'react-native-vector-icons/FontAwesome';
import LogOut from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';
import useGetAttenanceRecord from '../Hook/useGetAttenanceRecord';
import Font5 from 'react-native-vector-icons/FontAwesome5';
const Profile = () => {
  const navigation = useNavigation();
  const handleLogOut = async () => {
    await firebase.auth().signOut();
    navigation.navigate('login');
  };
  const [msg, setMsg] = useState('');

  const uid = 'KROwXP2g9peVWDIoqRucTQnI60A3';
  const [users_attendance_record, setUsers_attendance_record] = useState([]);
  const storedReduxUserDataID = useSelector(state => state.user_data.data.id);

  const data = useGetAttenanceRecord(storedReduxUserDataID);
  setTimeout(() => {
    if (typeof data === 'object') {
      setUsers_attendance_record(data);
    } else {
      setMsg(data);
    }
  }, 100);

  return (
    <Animated.View enter style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Font5
            name="arrow-left"
            onPress={() => navigation.goBack()}
            size={22}
            color="black"
          />
          <Text style={styles.headerTxt}>Profile</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={handleLogOut} style={styles.logOutBtn}>
            {/* <Text style={styles.viewListTxt}>Log Out</Text> */}
            <LogOut name="logout" size={30} color={"white"}/>
          </TouchableOpacity>
        </View>
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
            Ashish
          </Text>
          <Text style={{fontSize: 22, fontWeight: '500', margin: 5}}>
            ashish@gmail.com
          </Text>
        </View>
      </View>

      <View style={styles.containerBottom}>
        <View
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
              <Text style={styles.noDataTxt}>{msg}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('showAllMonthsData')}
          style={styles.viewList}>
          <Text style={styles.backBtnTxt}>View All {'>>'}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Profile;
