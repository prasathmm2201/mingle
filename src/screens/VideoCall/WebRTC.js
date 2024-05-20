import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import Feather from 'react-native-vector-icons/Feather'
import  Ionicons  from 'react-native-vector-icons/Ionicons'
import { Bold } from '../../helper';


export const VideoCall = ({
  Mic=true,
  Video=true,
  IconsShow=true,
  remoteAndLocalStream={
    screen: '1',
    localStreamURl: null,
    remoteStreamURl: null
  },
  inCall=false,
  startCall=()=>false,
  toggleMic=()=>false,
  toggleVideo=()=>false,
  Icontoggle=()=>false,
  endCall=()=>false

}) => {

   
  

    const WaitingComponent = () => {
        return (
            <View style={styles.remoteStyle}>
                <Text style={{ color: "#fff" , fontFamily:Bold , fontSize:16 }}>
                    Waiting for connection ...
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.body}>
          <TouchableWithoutFeedback onPress={() => Icontoggle()} style={styles.stream}>
            <View style={[styles.stream, {backgroundColor:'#202124'}]}>
              
                <View style={[styles.loaclStream, {bottom: IconsShow ? 90 : 0}]}>
                  {remoteAndLocalStream.localStreamURl ? (
                    <View style={{ flex: 1 }}>
                      <View style={styles.screenChangeIconView}>
                        {/* <TouchableOpacity onPress={() => ScreenChange()} style={styles.screenChange}>
                          <Feather name='resize-full-screen' style={{color:"#fff" , fontSize:12}} />
                        </TouchableOpacity> */}
                      </View>
                      <RTCView
                        streamURL={remoteAndLocalStream.localStreamURl && remoteAndLocalStream.localStreamURl.toURL()}
                        style={styles.stream}
                        objectFit="cover"
                        mirror={true}
                      />
                    </View>
                  ) : (<View><Text style={{fontFamily:Bold, color:"#fff" , fontSize:14}}>Waiting for Local stream ...</Text></View>)}
                </View>
              
              
                <View style={styles.stream}>
                  {remoteAndLocalStream.remoteStreamURl ? (
                    <View style={{ flex: 1 }}>
                      <RTCView
                        streamURL={remoteAndLocalStream.remoteStreamURl && remoteAndLocalStream.remoteStreamURl.toURL()}
                        style={styles?.stream}
                        objectFit="cover"
                        mirror={true}
                      />
                    </View>
                  ) : <WaitingComponent />}
                </View>
              
            </View>
          </TouchableWithoutFeedback>
  
          <View>
            {IconsShow ? (
              <View style={[ styles.footer ]}>
  
                <TouchableOpacity onPress={()=> endCall()} style={[styles?.Icons, { backgroundColor: "#e61923" }]}>
                  <Ionicons name={'call'} style={{color:"#fff" , fontSize:26}} />

                </TouchableOpacity>
  
  {
    !inCall && 
    <TouchableOpacity onPress={()=> startCall()} style={[styles?.Icons, { backgroundColor: "#38af48" }]}>
    <Ionicons name={'call'} style={{color:"#fff" , fontSize:26}} />

  </TouchableOpacity>
  }
               
  
                {Mic ? (
                  <TouchableOpacity onPress={() => toggleMic()} style={styles?.Icons}>
                  <Feather name={'mic'} style={{color:"#fff" , fontSize:26}} />
                  </TouchableOpacity>) : (
                  <TouchableOpacity onPress={() => toggleMic()} style={styles?.Icons}>
                  <Feather name={'mic-off'} style={{color:"#fff" , fontSize:26}} />
                  </TouchableOpacity>
                )}
  
  
                {Video ? (
                  <TouchableOpacity onPress={() => toggleVideo()} style={styles?.Icons}>
                    <Feather name='video' style={{color:"#fff" , fontSize:26}} />

                  </TouchableOpacity>) : (
                  <TouchableOpacity onPress={() => toggleVideo()} style={styles?.Icons}>
                    <Feather name='video-off' style={{color:"#fff" , fontSize:26}} />
                  </TouchableOpacity>
                )}
  
              </View>) : null}
          </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    body: {
      backgroundColor: "#000E08",
      ...StyleSheet.absoluteFill
    },
    loaclStream: {
      position: "absolute",
      width: 170,
      height: 250,
      zIndex: 1,
      bottom: 90,
      right: 0,
    },
    stream: {
      flex: 1,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: "space-around",
      marginBottom: 20,
      marginTop: 20,
      position: "absolute",
      width: "100%",
      bottom: 0,
    },
    remoteStyle: {
      color: "#000",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    screenChange: {
      backgroundColor: "#80808091", padding: 12, borderRadius: 60
    },
    screenChangeIconView: { position: "absolute", top: 0, right: 0, zIndex: 1, padding: 14 },
    Icons: {
      backgroundColor: "#80808091",
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 60,
    },
  });