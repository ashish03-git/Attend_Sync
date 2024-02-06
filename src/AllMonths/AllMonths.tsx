import {View, Text, FlatList} from 'react-native';
import React, {FunctionComponent, ReactElement} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './style';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from 'react';

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
  const currentMonthRecord: AttendanceRecord[] = route.params.attendance_record;
  //   console.log(currentMonthRecord)
  const [open, setOpen] = useState<OpenState>(false);
  const [value, setValue] = useState<Value>('');
  const uid = 'KROwXP2g9peVWDIoqRucTQnI60A3';
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
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Font5
          name="arrow-left"
          onPress={() => navigation.goBack()}
          size={28}
          color="black"
        />
        <Text style={styles.headerTxt}>View All Records</Text>
      </View>
      <View style={styles.filerData}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
              Select month to see record :{' '}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <DropDownPicker
              placeholder="Select Month"
              // style={{width: '60%', alignSelf: 'flex-end'}}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              dropDownDirection="BOTTOM"
              dropDownContainerStyle={{
                // width: '60%',
                alignSelf: 'flex-end',
                zIndex: 10,
                position: 'absolute',
              }}
            />
          </View>
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
  );
};

export default AllMonths;
