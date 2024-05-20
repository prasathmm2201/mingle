import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Bold } from "../helper";
import { theme } from "../theme";
import Feather from 'react-native-vector-icons/Feather';

export const Button = ({ onPress = () => false, text = "" , style , disabled , is_loading=false , loadingColor }) => {
  const onPressFuntion=()=>{
    if(disabled || is_loading){
      return false
    }
    else{
      onPress()
    }
  }
  return (
    <TouchableOpacity style={disabled ? {...styles.disabled_container} : {...styles.container , ...style}} onPress={onPressFuntion}>
      {
        is_loading ? <Feather name="loader" style={{fontSize:30 , color:loadingColor ?? theme?.typography?.main}}/> : <Text style={disabled ? {...styles.disabled_text} : {...styles.text , ...style?.text_style}}>{text}</Text>

      }
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 18,
    backgroundColor: theme?.primary,
    borderColor: theme?.primary,
    height: 48
  },
  text:{
    color: theme?.typography?.context,
    fontFamily: Bold,
    fontSize: 16
  },
  disabled_container:{
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 18,
    backgroundColor: theme?.background?.secondary,
    borderColor: theme?.background?.secondary,
    height: 48
  },
  disabled_text:{
    color: theme?.typography?.territory,
    fontFamily: Bold,
    fontSize: 16
  }
});
