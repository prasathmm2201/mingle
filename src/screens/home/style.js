import { SemiBold } from '../../helper';
import { theme } from '../../theme';
const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme?.typography?.primary
  },
  search:{
    borderWidth:1,
    borderColor:theme?.border?.teritory,
    borderRadius:50,
    width:42,
    height:42,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    position:"relative"
  },
  header:{
    color:theme?.typography?.context,
    fontFamily:SemiBold,
    fontSize:20
  },
  main:{
    backgroundColor:theme?.typography?.context,
    flex:1,
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
    padding:24
  },
  flatListContainer: {
    gap:30
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
    display:'flex',
    justifyContent:"center"
    }

});