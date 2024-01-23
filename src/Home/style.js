import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height + 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  nameContainer: {
    flex: 3,
    justifyContent: 'center',
    // backgroundColor: 'pink',
    paddingLeft: 15,
  },
  nameTxt: {
    fontSize: 28,
    color: 'black',
    fontWeight: '500',
  },
  nameSubTxt: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
  profileImgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    // elevation: 2,
  },
  checkInContainer: {
    flex: 4,
  },
  checkInBtnContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thanksContainer: {
    flex: 3,
  },
  thanksIcone: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  thanksTxt: {
    fontSize: screenWidth / 9,
    color: '#228B22',
    fontWeight: '500'
  },
  complementTxt: {
    fontSize: screenWidth / 22,
    color: '#228B22',
    alignSelf: 'center',
  },
  thanksCompanyName: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 15,
  },
  companyNameTxt: {fontSize: 18, color: '#800000', marginRight: 5},
  checkInBtn: {
    width: screenWidth / 2,
    height: screenWidth / 2,
    borderRadius: screenWidth / 4, // Adjust the border radius as needed
    backgroundColor: 'white', // Change the background color as needed
    elevation: 2, // Adjust the elevation as needed for the outer side shadow
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayTime: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  todayDetails: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'purple',
  },
  CheckTiming: {
    width: screenWidth / 3.2,
    height: screenHeight / 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkEntryTime: {
    margin: 5,
    fontSize: 20,
    color: 'green',
    fontWeight: '600',
  },
  checkLeaveTime: {
    margin: 5,
    fontSize: 20,
    color: 'red',
    fontWeight: '600',
  },
  txt: {
    margin: 5,
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
});

export default styles;
