import { Regular, SemiBold } from '../../helper';
import { theme } from '../../theme';
const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:theme?.background?.main,
        position: 'relative'
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
    header: {
        color: theme?.typography?.main,
        fontFamily: Regular,
        fontSize: 16
    },
    subNav: {
        color: theme?.typography?.territory,
        fontFamily: Regular,
        fontSize: 12,
        marginTop:4
    },
    topNavbar: {
        flexDirection: 'row', 
        justifyContent: "space-between", 
        alignItems: 'center', 
        padding: 10, 
        backgroundColor: theme?.typography?.context,
        borderBottomWidth:1,
        borderColor:'#EEFAF8'
    },
    bottomNavbar:{
        // flexDirection: 'row', 
        // justifyContent: "space-between", 
        // alignItems: 'center', 
        padding: 10,
        backgroundColor: theme?.typography?.context,
        borderTopWidth:1,
        borderColor:'#EEFAF8'
    },
    current_user:{
        backgroundColor:theme?.secondary,
        padding:12,
        borderRadius:12,
        borderTopRightRadius:0
    },
    current_user_text:{
        color:theme?.typography?.context,
        fontSize:12,
        fontFamily:Regular,
        letterSpacing:0.12
    },
    text_container: {
        alignItems: 'flex-end',
      },
      other_user:{
        backgroundColor: theme?.typography?.context,
        padding:12,
        borderRadius:12,
        borderTopLeftRadius:0
    },
    other_user_text:{
        color:theme?.typography?.primary,
        fontSize:12,
        fontFamily:Regular,
        letterSpacing:0.12
    },
    other_container: {
        alignItems: 'flex-start',
        flexDirection:"row",
        gap:10
      },
      message_background: {
        width: 44,
        height: 44,
        borderRadius: 50,
        alignItems: 'center',
        display: 'flex',
        justifyContent: "center"
    },
    user_created_at:{
        color:theme?.typography?.territory,
        fontSize:10,
        fontFamily:Regular,
        textAlign:'right',
        marginTop:5
    },
    other_created_at:{
        color:theme?.typography?.territory,
        fontSize:10,
        fontFamily:Regular,
        textAlign:'right',
        marginTop:5
    },
    audio:{
        backgroundColor:theme?.typography?.context,

    },
    audio_container: {
        width: "100%",
        color: theme?.typography?.main,
        borderColor: theme?.primary,
        fontFamily: Regular,
        height: 50,
        borderBottomWidth: 0,
        backgroundColor: theme?.background?.secondary,
        borderRadius: 12,
        // padding: 10,
        fontSize: 12,
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
          },
});