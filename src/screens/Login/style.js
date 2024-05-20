const { StyleSheet } = require('react-native');
import { Bold, Regular, SemiBold } from '../../helper';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'start',
    alignItems: 'start',
    backgroundColor: theme?.typography?.context,
    flex: 1,
    padding: 24,
    justifyContent: 'center'
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
  google_logo:{
    width:58,
    height:58,
    flexShrink:0,
    borderColor:theme?.border?.primary,
    borderRadius:50,
    borderWidth:1,
    padding:10,
    marginTop:30
  },
  option: {
    position: "relative",
    borderRadius: 8,
    marginTop: 35,
    borderTopWidth: 1,
    borderColor: theme?.border?.secondery,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  orText: {
    color: theme?.border?.territory,
    fontFamily: SemiBold,
    fontSize: 14,
    position: 'absolute',
    padding: 15,
    letterSpacing:0.1,
    zIndex:999,
    backgroundColor:theme?.typography?.context
  },
  forgot_password:{
    color:theme?.primary,
    fontFamily:SemiBold,
    fontSize:14,
    letterSpacing:0.1,
    padding:16,
    textAlign:'center'
  }
});
