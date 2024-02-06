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
import DropDownPicker from 'react-native-dropdown-picker';
const Profile = () => {
  const navigation = useNavigation();
  const handleLogOut = async () => {
    await firebase.auth().signOut();
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const uid = 'KROwXP2g9peVWDIoqRucTQnI60A3';
  const [attendance_record, setAttendance_Record] = useState([]);
  const [items, setItems] = useState([
    {label: 'January', value: 'Jan'},
    {label: 'February', value: 'Feb'},
    {label: 'March', value: 'Mar'},
    {label: 'April', value: 'Apr'},
    {label: 'May', value: 'May'},
    {label: 'June', value: 'Jun'},
    {label: 'July', value: 'Jul'},
    {label: 'August', value: 'Aug'},
    {label: 'September', value: 'Sep'},
    {label: 'October', value: 'Oct'},
    {label: 'November', value: 'Nov'},
    {label: 'December', value: 'Dec'},
  ]);

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    let allData = await firestore().collection('employees').doc(uid).get();
    let data = allData.data();
    setAttendance_Record(data.attendance_record);
    // await console.log(attendance_record)
  };

  return (
    <Animated.View enter style={styles.container}>
      <View style={styles.containerTop}>
        <View
          style={{
            // flex: 2,
            alignSelf: 'flex-end',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('showAllMonthsData', {
                attendance_record: attendance_record,
              })
            }>
            <Text style={{color: 'blue', fontSize: 18}}>
              All Records {`>>`}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileImage}>
          <Image
            source={{
              uri: 'https://sialifehospital.com/wp-content/uploads/2021/04/testimonial-1.png',
            }}
            style={{flex: 1}}
          />
        </View>
        <View style={{paddingTop: 20, alignItems: 'center'}}>
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
          {/* <View
            style={{
              flex: 1,
            }}>
            <DropDownPicker
              placeholder="Select Month"
              style={{width: '40%', alignSelf: 'flex-end'}}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              dropDownDirection="BOTTOM"
              dropDownContainerStyle={{
                width: '40%',
                alignSelf: 'flex-end',
                zIndex: 10,
                position: 'absolute',
              }}
            />
          </View> */}

          <View
            style={{
              flex: 2,
              marginVertical: 5,
            }}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
              Attendance Record Of Current Month:
            </Text>
          </View>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={attendance_record}
            renderItem={({item}) => {
              return (
                <View style={styles.listItemContainer}>
                  <View style={styles.dateEmptyContainer}>
                    <View style={styles.itemDateContainer}>
                      <Text style={styles.itemDatetxt}>Date : {item.date}</Text>
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={styles.attendanceDetails}>
                    <Text style={{fontSize: 16, color: 'black'}}>
                      Intry: <Text style={styles.entyTxt}>{item.check_in}</Text>{' '}
                    </Text>
                    <Text style={styles.seperator}>|</Text>
                    <Text style={{fontSize: 16, color: 'black'}}>
                      Exit:<Text style={styles.exitTxt}> {item.check_out}</Text>
                    </Text>
                    <Text style={styles.seperator}>|</Text>
                    <Text style={{fontSize: 16, color: 'black'}}>
                      Work Hr:{' '}
                      <Text style={styles.workTxt}>{item.work_hours} hr</Text>
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Text style={styles.backBtnTxt}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOut} style={styles.viewList}>
          <Text style={styles.viewListTxt}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Profile;
