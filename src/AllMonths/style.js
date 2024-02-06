import {StyleSheet} from 'react-native';

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
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
});

export default styles;
