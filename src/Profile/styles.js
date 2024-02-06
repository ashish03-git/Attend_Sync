import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"yellow"
  },
  containerTop: {
    flex: 3,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'white',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  backBtn: {
    width: 160,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemContainer: {
    // flexDirection: 'row',
    width: 370,
    height: 80,
    marginVertical: 12,
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
  seperator:{
    fontSize:25,
    color:"black"
  },
  entyTxt:{
    fontSize:16,
    color:"green",
    fontWeight:"bold"
  },
  exitTxt:{
    fontSize:16,
    color:"red",
    fontWeight:"bold"
  },
  workTxt:{
    fontSize:16,
    color:"orange",
    fontWeight:"bold"
  },
});

export default styles;
