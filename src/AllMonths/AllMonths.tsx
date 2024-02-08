import {View, Text, FlatList} from 'react-native';
import React, {FunctionComponent, ReactElement, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './style';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from 'react';
import {UseSelector, useSelector} from 'react-redux';
import firestore, {firebase} from '@react-native-firebase/firestore';

interface AttendanceRecord {
  date: string;
  check_in: string;
  check_out: string;
  work_hours: string;
}

type OpenState = boolean;
type Value = string;
type Record = [];

const AllMonths: FunctionComponent = (): ReactElement => {
  const route = useRoute();
  const [openMonth, setOpenMonth] = useState<OpenState>(false);
  const [monthValue, setMonthValue] = useState<Value>('');
  const [openYear, setOpenYear] = useState<OpenState>(false);
  const [yearValue, setYearValue] = useState<Value>('');
  const [attendance_record, setAttendance_Record] = useState<Record>([]);
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
  const navigation = useNavigation();
  const storedReduxUserDataID = useSelector(state => state.user_data.data.id);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate
    .toLocaleString('default', {month: 'long'})
    .toLowerCase();
  const [currentMonthRecord, setCurrentMonthRecord] = useState([]);

  useEffect(() => {
    getAttendanceRecordFromFirebase();
  }, []);

  const getAttendanceRecordFromFirebase = async () => {
    let data = firestore()
      .collection('employees')
      .doc(storedReduxUserDataID)
      .get();

    let array = (await data).data();
    setCurrentMonthRecord(
      array.attendance_records[currentYear]?.[currentMonth],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Font5
          name="arrow-left"
          onPress={() => navigation.goBack()}
          size={22}
          color="black"
        />
        <Text style={styles.headerTxt}>View All Record</Text>
      </View>

      <View style={styles.filerData}>
        <View style={{flex: 1}}>
          <DropDownPicker
            placeholder="Select Year"
            style={{width: '80%'}}
            open={openYear}
            value={yearValue}
            items={items}
            setOpen={setOpenYear}
            setValue={setYearValue}
            setItems={setItems}
            dropDownDirection="BOTTOM"
            dropDownContainerStyle={{
              width: '80%',
              position:"absolute",
              zIndex:100
            }}
          />
        </View>

        <View style={{flex: 1}}>
          <DropDownPicker
            placeholder="Select Month"
            style={{width: '80%', alignSelf: 'flex-end'}}
            open={openMonth}
            value={monthValue}
            items={items}
            setOpen={setOpenMonth}
            setValue={setMonthValue}
            setItems={setItems}
            dropDownDirection="BOTTOM"
            dropDownContainerStyle={{
              width: '80%',
              alignSelf: 'flex-end',
              zIndex: 10,
              position: 'absolute',
            }}
          />
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={currentMonthRecord}
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
                    In: <Text style={styles.entyTxt}>{item.check_in}</Text>{' '}
                  </Text>
                  <Text style={styles.seperator}>|</Text>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    Out:<Text style={styles.exitTxt}> {item.check_out}</Text>
                  </Text>
                  <Text style={styles.seperator}>|</Text>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    Time:{' '}
                    <Text style={styles.workTxt}>{item.work_hours} hr</Text>
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default AllMonths;
