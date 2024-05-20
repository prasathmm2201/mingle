import { TextInput, StyleSheet, View, Text } from "react-native";
import { theme } from "../theme";
import { Regular, SemiBold } from "../helper";

export const TextFeild = ({ label = "" , onChangeText=()=>false , value="" , props_styles={} , placeholder="" , disabled=true}) => {
  return (
   <View >
    {label ? <Text style={styles?.label}>{label}</Text> : ""}
  
     <TextInput
      style={{...styles?.container , ...props_styles}}
      underlineColorAndroid="transparent"
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      editable={disabled} 
    />
   </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: 1,
    color: theme?.typography?.main,
    fontSize: 16,
    backgroundColor: theme?.typography?.context,
    borderColor: theme?.primary,
    fontFamily: Regular,
    height: 50
  },
  label:{
  color:theme?.primary,
  fontSize:14,
  fontFamily:SemiBold,
  letterSpacing:0.1
  }
});
