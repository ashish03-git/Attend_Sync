import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// You can adjust these factors as needed to fit your layout requirements
const widthFactor = 1; // 80% of the screen width
const heightFactor = 0.1; // 40% of the screen height

const width = screenWidth * widthFactor;
const height = screenHeight * heightFactor;
// console.log(width," ",height)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    // backgroundColor: 'green',
  },
  headerTxt: {
    fontSize: 24,
    marginHorizontal: 15,
    color: 'black',
    fontWeight: '500',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
  },
  btnContainer: {
    // flex: 1,
    marginHorizontal: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  // logOutBtn: {
  //   width: 100,
  //   height: 28,
  //   borderRadius: 18,
  //   backgroundColor: 'red',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  backBtnTxt: {
    fontSize: 16,
    color: 'white',
    // fontWeight: '500',
  },
  selectMonthBtn: {
    width: '30%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  viewList: {
    width: 70,
    height: 70,
    borderRadius: 40,
    flexDirection:"row",
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    bottom: 15,
  },
  viewListTxt: {
    fontSize: 16,
    color: 'white',
    // fontWeight: '500',
  },
  containerBottom: {
    flex: 7,
    padding:10,
  },
  listContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom:30
  },
  listItemContainer: {
    // flexDirection: 'row',
    width: width - 10,
    height: height,
    marginVertical: 12,
    marginHorizontal: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
    // flexDirection: 'row',
  },
  dateEmptyContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  itemDateContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemDatetxt: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
  },
  attendanceDetails: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  seperator: {
    fontSize: 25,
    color: 'black',
  },
  entyTxt: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  exitTxt: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  workTxt: {
    fontSize: 16,
    color: 'orange',
    fontWeight: 'bold',
  },
  noDataTxt: {
    fontSize: 18,
    color: 'red',
    fontWeight: '600',
  },
});

export default styles;
