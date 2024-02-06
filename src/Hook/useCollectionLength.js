import {View, Text} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const useCollectionLength = () => {
  const [collectionLength, setCollectionLength] = useState(0);

  useEffect(() => {
    const fetchCollectionLength = async () => {
      try {
        const querySnapshot = await firestore().collection('employees').get();
        const length = querySnapshot.size;
        // console.log(length)
        setCollectionLength(length);
      } catch (error) {
        console.error('Error fetching collection length:', error);
      }
    };
    fetchCollectionLength();
  }, []);
  return collectionLength;
};

export default useCollectionLength;

// import {View, Text} from 'react-native';
// import React, {useState, useEffect} from 'react';
// import firestore from '@react-native-firebase/firestore';

// const useCollectionLength = () => {
//   const [collectionLength, setCollectionLength] = useState(0);

//   useEffect(() => {
//     const fetchCollectionLength = async () => {
//       try {
//         const querySnapshot = await firestore().collection('employees').get();
//         const length = querySnapshot.size;
//         setCollectionLength(length);
//       } catch (error) {
//         console.error('Error fetching collection length:', error);
//       }
//     };

//     fetchCollectionLength();
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   return collectionLength;
// };

// export default useCollectionLength;
