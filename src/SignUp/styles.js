import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 1,
  },
  loginTxt: {
    fontSize: 22,
    color: '#CB01CF',
    fontWeight: '700',
    margin: 20,
  },
  bottomContainer: {
    flex: 1.8,
    borderWidth: 1,
    borderColor: '#0B3F70',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#EAFFEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    width: 360,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#878787',
    padding: 10,
    fontSize: 18,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  formFieldContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formButton: {
    margin: 10,
    width: 360,
    height: 50,
    backgroundColor: '#0B3F70',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formName: {
    margin: 20,
    fontSize: 30,
    color: '#0B3F70',
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
});

export default styles;
