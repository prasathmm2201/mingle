import { Text, TouchableOpacity, View } from "react-native"
import { theme } from "../../../theme";
import { Regular, SemiBold, stringAvatar, getTime, TimeDiffBetweenDates } from "../../../helper";
import AntDesign from 'react-native-vector-icons/AntDesign';

export const Card = (props) => {
    return (
        <TouchableOpacity onPress={() => props?.onClick(props?.item)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: "center" }}>
                    <View style={{ ...styles?.image_background, backgroundColor: stringAvatar(props?.item?.username)?.bgcolor }}>
                        <Text style={styles?.image_name}>{stringAvatar(props?.item?.username)?.children}</Text>
                        {
                            !props?.group &&
                            <View style={{ position: "absolute", right: 0, bottom: 0, zIndex: 2 }}>
                                {
                                    !props?.item?.is_group ?
                                    <View>
                                         {
                                            props?.isOnline?.includes(props?.item?.id) ?
                                            <Text style={{ backgroundColor: "green", borderRadius: 50, width: 15, height: 15, }}></Text> :
                                            <Text style={{ borderColor: "grey", borderWidth: 1, borderRadius: 50, width: 15, height: 15, backgroundColor: "#fff" }}> </Text>
                                         }
                                    </View>
                                    :""

                                }
                            </View>
                        }


                    </View>

                    <View>
                        <Text style={styles?.username}>{props?.item?.username}</Text>
                        {!props?.group && <Text style={styles?.message}>{props?.item?.previous_message}</Text>
                        }
                       
                    </View>
                </View>

                {
                    !props?.group &&
                    <View style={{ textAlign: "center" }}>
                        {
                            props?.newMessage.includes(props?.item?.id) ? <Text style={styles?.created_at}>{TimeDiffBetweenDates(new Date(props?.newMessageData?.find((v) => v?.user?.user_id || x?.user_id === props?.item?.id)?.created_at), new Date())}</Text> : !!props?.item?.created_at && <Text style={styles?.created_at}>{getTime(props?.item?.created_at)}</Text>
                        }


                        {
                            props?.newMessage.includes(props?.item?.id) ? (
                                <View style={{ textAlign: "center", flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }}>
                                    <View style={styles?.count}>
                                        <Text style={styles?.count_text}>
                                            {Number(props?.item?.count ?? 0) + props?.newMessage?.filter((v) => v === props?.item?.id)?.length}
                                        </Text>
                                    </View>
                                </View>

                            ) : props?.item?.count > 0 && (

                                <View style={{ textAlign: "center", flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }}>
                                    <View style={styles?.count}>
                                        <Text style={styles?.count_text}>
                                            {Number(props?.item?.count ?? 0) + props?.newMessage?.filter((v) => v === props?.item?.id)?.length}
                                        </Text>
                                    </View>
                                </View>
                            )

                        }

                    </View>
                }

{
                            props?.is_selected && 
                            <View style={{ textAlign: "center" , flexDirection:"row" , alignItems:"center", justifyContent:'center' }}>
                            <AntDesign name="checkcircle" style={{fontSize:30 , color:theme?.primary}}/>
                            </View>
                        }


            </View>
        </TouchableOpacity>
    )
}

const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
    username: {
        color: theme?.typography?.primary,
        fontFamily: Regular,
        fontSize: 20
    },
    created_at: {
        color: theme?.typography?.territory,
        fontFamily: Regular,
        fontSize: 12,
        margin: 0,
        padding: 0
    },
    message: {
        color: theme?.typography?.territory,
        fontFamily: Regular,
        margin: 0,
        padding: 0,
        fontSize: 12,
        lineHeight: 12
    },
    count: {
        backgroundColor: theme?.background?.error,
        borderRadius: 50,
        width: 21.809,
        height: 21.809,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        textAlign: "right",
        margin: "0 auto"
    },
    count_text: {
        color: theme?.typography?.context,
        fontFamily: SemiBold,
        fontSize: 14,

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
        justifyContent: "center",
        position: "relative"
    }

});