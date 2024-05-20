import { Image, View } from "react-native"

export const NoDataFound=()=>{
    return(
        <View style={{flex:1 , justifyContent:"center" , alignItems:"center"}}>
            <Image source={require('../../assets/nodata.png')} style={{width:250 , height:250}}/>
            
        </View>
    )
}