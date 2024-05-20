const { StyleSheet } = require('react-native');
import { Bold, Regular, SemiBold } from '../../helper';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme?.typography?.context,
    flex: 1,
    justifyContent: 'space-between'
  },
  title:{
    color:theme?.typography?.main,
    fontFamily:Bold,
    fontSize:18,
    textAlign:'center'
  },
  subTitle:{
    color:theme?.typography?.territory,
    fontFamily:Regular,
    width:293,
    margin:"0 auto",
    textAlign:"center"
  },

  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
  },

});
