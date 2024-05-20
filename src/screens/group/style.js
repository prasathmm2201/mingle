const { StyleSheet } = require('react-native');
import { Bold, SemiBold } from '../../helper';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme?.typography?.context,
    flex: 1
  },
  title:{
    color:theme?.typography?.main,
    fontFamily:Bold,
    fontSize:26,
    textAlign:'center'
  },
  image_name: {
    color: theme?.typography?.context,
    fontFamily: SemiBold,
    fontSize: 16
},
image_background: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    display: 'flex',
    justifyContent: "center"
},
members:{
    color:theme?.typography?.territory,
    fontSize:16,
    fontFamily:SemiBold,
    marginTop:15,
    marginBottom:15
},
flatListContainer: {
    gap:20
  },
  members_title:{
    color:theme?.primary,
    fontSize: 14,
    fontFamily:SemiBold,
    letterSpacing:0.1,
    marginBottom:10
  }
});
