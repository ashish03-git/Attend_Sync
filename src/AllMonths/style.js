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
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    // backgroundColor: 'green',
  },
  headerTxt: {
    fontSize: 20,
    marginHorizontal: 15,
    color: 'black',
    fontWeight: '500',
  },
  filerData: {
    flex: 2,
    flexDirection: 'row',
    justifyContent:"center",
    alignItems: 'center',
    // backgroundColor: 'yellow',
    paddingHorizontal: 10,
  },
  viewList: {
    width: 160,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#0B3F70',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewListTxt: {
    fontSize: 16,
    color: 'white',
    // fontWeight: '500',
  },
  containerBottom: {
    flex: 5,
  },
  listContainer: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
