import { Regular, Bold } from '../../helper';
  import { theme } from '../../theme';
const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    resizeMode: 'cover',
    padding:24,
    alignItems: 'start',
    justifyContent: 'center',
    
  },
  text:{
    color:theme?.typography?.context,
    fontFamily:Regular,
    fontSize:68,
    margin:0,
    padding:0,
    lineHeight: 78
  },
  textSub:{
    color:theme?.typography?.context,
    fontFamily:Bold,
    fontSize:68,
    margin:0,
    padding:0,
    lineHeight: 78
  },
  sub:{
    color:theme?.typography?.secondary,
    fontFamily:Regular,
    fontSize:16,
    margin:0,
    padding:0,
    lineHeight: 26
  },
  google_logo:{
    width:58,
    height:58,
    flexShrink:0,
    borderColor:theme?.border?.primary,
    borderRadius:50,
    borderWidth:1,
    padding:10,
    margin:"0 auto"
  },
  option: {
    position: "relative",
    borderRadius: 8,
    marginTop: 30,
    borderTopWidth: 1,
    borderColor: theme?.border?.secondery,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  orText: {
    color: theme?.border?.secondery,
    fontFamily: Regular,
    fontSize: 14,
    position: 'absolute',
    padding: 15,
    lineHeight:14,
    letterSpacing:0.1,
    zIndex:999,
    backgroundColor:theme?.background?.primary
  },
  existing:{
    color: theme?.typography?.secondary,
    fontFamily: Regular,
    fontSize: 14,
    lineHeight:14,
    letterSpacing:0.1,
  },
  login:{
    color: theme?.typography?.context,
    fontFamily: Bold,
    fontSize: 14,
    lineHeight:14,
    letterSpacing:0.1
  }
});
