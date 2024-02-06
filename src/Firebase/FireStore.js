import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import database, {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import useCollectionLength from '../Hook/useCollectionLength';

const FireStore = () => {
  //   const [value, setValue] = useState('');
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [date, setDate] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [workHours, setWorkHours] = useState(null);
  const [allEmployees, setAllEmployees] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const length = useCollectionLength();

  useEffect(() => {
    getAllValues();
    // console.log(length);
  }, []);

  const AddValue = async () => {

    // this code will enter the new date data into the array of attendance app
    let details = {
      date: date,
      check_in: checkIn,
      check_out: checkOut,
      work_hours: workHours,
    };
    await firestore()
      .collection('employees')
      .doc('4')
      .update({
        attendance_record: firebase.firestore.FieldValue.arrayUnion(details),
      })
      .then(() => console.log('data added into array'));
  };

  // to get data present in the firestore
  const getAllValues = async () => {


    // method 1 - it is to read data available in firestore
    // const data = await firestore()
    //   .collection('employees')
    //   .onSnapshot(snap => {
    //     snap.forEach(employee => {
    //       allEmployees.push(employee.data());
    //     });
    //     // console.log(allEmployees)
    //   });

    // method 2 - it is to read data available in firestore
    const data = await firestore().collection('employees').get();
    data.forEach(item => allEmployees.push(item.data()));
  };
  // console.log(allEmployees);

  const handleEdit = async item => {
    setIsUpdateVisible(true);
    setName(item.name);
    setId(item.id);
    setDate(item.date);
    setCheckIn(item.check_in);
    setCheckOut(item.check_out);
    setWorkHours(item.work_hours);
  };

  const UpdateData = async () => {
    const updatedPayload = {
      name: name,
      id: id,
      date: date,
      check_in: checkIn,
      check_out: checkOut,
      work_hours: workHours,
    };

    database()
      .ref(`employees/${id}/`)
      .update(updatedPayload)
      .then(() => {
        console.log('details updated sucessfully');
        setIsUpdateVisible(false);
        setCheckOut('');
        setName(''), setId('');
        setCheckIn('');
        setWorkHours('');
        setDate('');
      })
      .catch(err => console.error(err));
    getAllValues();

    // Alert.alert(
    //   'Error occurs while updating value',
    //   'All fields are required',
    //   [
    //     {
    //       text: 'OK',
    //       onPress: () => {},
    //     },
    //   ],
    // );
  };

  const handleDelete = async item => {
    Alert.alert('Delete', 'Are you sure you want to delete this employee ?', [
      {
        text: 'Cancle',
        onPress: () => {},
      },
      {
        text: 'Delete',
        onPress: async () => {
          await database().ref(`employees/${item.id}`).remove();
          getAllValues();
        },
      },
    ]);
  };

  return (
    <ScrollView style={{flex: 1}}>
      <Text style={{alignSelf: 'center', fontSize: 30, color: 'black'}}>
        Fire Store CURD
      </Text>

      <View style={{flex: 2, alignItems: 'center', paddingVertical: 40}}>
        {/* name */}
        <TextInput
          placeholder="Enter Items Name"
          style={{
            width: '90%',
            height: 50,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            padding: 10,
            fontSize: 18,
            marginVertical: 10,
          }}
          onChangeText={text => setName(text)}
          value={name}
        />

        {/* id */}
        <TextInput
          placeholder="Enter Your Id"
          style={{
            width: '90%',
            height: 50,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            padding: 10,
            fontSize: 18,
            marginVertical: 10,
          }}
          onChangeText={text => setId(text)}
          value={id}
        />

        {/* Date */}
        <TextInput
          placeholder="Enter Date"
          style={{
            width: '90%',
            height: 50,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            padding: 10,
            fontSize: 18,
            marginVertical: 10,
          }}
          onChangeText={text => setDate(text)}
          value={date}
        />

        {/* Check In */}
        <TextInput
          placeholder="Enter Check In "
          style={{
            width: '90%',
            height: 50,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            padding: 10,
            fontSize: 18,
            marginVertical: 10,
          }}
          onChangeText={text => setCheckIn(text)}
          value={checkIn}
        />

        {/* Check out */}
        <TextInput
          placeholder="Enter Check Out "
          style={{
            width: '90%',
            height: 50,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            padding: 10,
            fontSize: 18,
            marginVertical: 10,
          }}
          onChangeText={text => setCheckOut(text)}
          value={checkOut}
        />

        {/* Working Hours */}
        <TextInput
          placeholder="Enter Working Time "
          style={{
            width: '90%',
            height: 50,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            padding: 10,
            fontSize: 18,
            marginVertical: 10,
          }}
          onChangeText={text => setWorkHours(text)}
          value={workHours}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            // isUpdateVisible
            onPress={false ? UpdateData : AddValue}
            style={{
              margin: 10,
              width: 160,
              height: 50,
              backgroundColor: 'blue',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isUpdateVisible ? (
              <Text style={{color: 'white', fontSize: 18}}>Update</Text>
            ) : (
              <Text style={{color: 'white', fontSize: 18}}>Add</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsListVisible(!isListVisible)}
            style={{
              margin: 10,
              width: 160,
              height: 50,
              backgroundColor: 'orange',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 18}}>Show</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isListVisible ? (
        <View style={{flex: 1, alignItems: 'center'}}>
          <FlatList
            data={allEmployees}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    width: 339,
                    height: 120,
                    marginVertical: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'green',
                    flexDirection: 'row',
                  }}>
                  <View style={{padding: 5, flex: 2}}>
                    <Text style={{fontSize: 16, color: 'black'}}>
                      id:{item.id}
                    </Text>
                    <Text style={{fontSize: 16, color: 'black'}}>
                      name:{item.name}
                    </Text>
                    <Text style={{fontSize: 16, color: 'black'}}>
                      date:{item.date}
                    </Text>
                    <Text style={{fontSize: 16, color: 'black'}}>
                      checkIn:{item.check_in}
                    </Text>
                    <Text style={{fontSize: 16, color: 'black'}}>
                      checkOut:{item.check_out}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      // backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleEdit(item)}
                      style={{
                        margin: 10,
                        width: 80,
                        height: 40,
                        backgroundColor: 'blue',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'white', fontSize: 18}}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleDelete(item)}
                      style={{
                        margin: 10,
                        width: 80,
                        height: 40,
                        backgroundColor: 'red',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'white', fontSize: 18}}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 22, color: 'black'}}>
            Click on show button to view employees
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default FireStore;
