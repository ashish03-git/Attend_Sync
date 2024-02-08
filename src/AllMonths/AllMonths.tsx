import {View, Text, FlatList} from 'react-native';
import React, {FunctionComponent, ReactElement, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './style';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from 'react';
import {UseSelector, useSelector} from 'react-redux';
import firestore, {firebase} from '@react-native-firebase/firestore';
import useGetAttenanceRecord from '../Hook/useGetAttenanceRecord';
import MaterialCommunityIcone from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [noDataFoundStatus, setNoDataFoundStatus] = useState<boolean>(false);
  const [attendance_record, setAttendance_Record] = useState<Record>([]);
  const [msg, setMsg] = useState<string>('');
  const [items, setItems] = useState([
    {label: 'January', value: 'january'},
    {label: 'February', value: 'february'},
    {label: 'March', value: 'march'},
    {label: 'April', value: 'april'},
    {label: 'May', value: 'may'},
    {label: 'June', value: 'june'},
    {label: 'July', value: 'july'},
    {label: 'August', value: 'august'},
    {label: 'September', value: 'september'},
    {label: 'October', value: 'october'},
    {label: 'November', value: 'november'},
    {label: 'December', value: 'december'},
  ]);

  const [yearsValues, setYearValues] = useState([
    {label: '2024', value: '2024'},
    {label: '2023', value: '2023'},
    {label: '2022', value: '2022'},
    {label: '2021', value: '2021'},
    {label: '2020', value: '2020'},
    {label: '2019', value: '2019'},
    {label: '2018', value: '2018'},
    {label: '2017', value: '2017'},
    {label: '2016', value: '2016'},
    {label: '2015', value: '2015'},
    {label: '2014', value: '2014'},
  ]);

  const navigation = useNavigation();
  const storedReduxUserDataID = useSelector(state => state.user_data.data.id);
  const [currentMonthRecord, setCurrentMonthRecord] = useState([]);
  // console.log(yearValue,monthValue)
  const data = useGetAttenanceRecord(
    storedReduxUserDataID,
    yearValue,
    monthValue,
  );
  setTimeout(() => {
    if (typeof data === 'object') {
      setNoDataFoundStatus(false);
      setCurrentMonthRecord(data);
    } else {
      setNoDataFoundStatus(true);
      setMsg(data);
    }
  }, 100);

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
            items={yearsValues}
            setOpen={setOpenYear}
            setValue={setYearValue}
            setItems={setYearValues}
            dropDownDirection="BOTTOM"
            dropDownContainerStyle={{
              width: '80%',
              position: 'absolute',
              zIndex: 100,
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
        {noDataFoundStatus ? (
          <>
            <MaterialCommunityIcone name="note-off" size={50} color={'red'} />
            <Text style={styles.noDataTxt}>
              No Record Found For Selected Month
            </Text>
          </>
        ) : (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={currentMonthRecord}
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
                        In: <Text style={styles.entyTxt}>{item.check_in}</Text>{' '}
                      </Text>
                      <Text style={styles.seperator}>|</Text>
                      <Text style={{fontSize: 16, color: 'black'}}>
                        Out:
                        <Text style={styles.exitTxt}> {item.check_out}</Text>
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
          </>
        )}
      </View>
    </View>
  );
};

export default AllMonths;
