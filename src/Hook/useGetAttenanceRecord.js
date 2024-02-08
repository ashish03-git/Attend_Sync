import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const useGetAttenanceRecord = (uid, year, month) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAttendanceDataOfGivenMonth = async () => {
      const currentDate = new Date();
      let currentYear = year || currentDate.getFullYear();
      let currentMonth =
        month ||
       currentDate.toLocaleString('default', {month: 'long'}).toLowerCase();

      try {
        const data = await firestore().collection('employees').doc(uid).get();
        const arrayData = data.data();

        if (arrayData) {
          const attendanceRecord =
            await arrayData.attendance_records?.[currentYear]?.[currentMonth];
          if (attendanceRecord !== undefined) {
            setData(attendanceRecord);
          } else {
            setData('No record found for the given year or month');
          }
        } else {
          setData('No record found for the given year or month');
        }
      } catch (error) {
        console.log(error);
        setData('Error occurred while fetching data');
      }
    };

    fetchAttendanceDataOfGivenMonth();
  }, [uid, year, month]);

  return data;
};

export default useGetAttenanceRecord;
