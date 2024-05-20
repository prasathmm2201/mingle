import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import RNFS from 'react-native-fs';
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import AudioRecorderPlayer, { AVEncoderAudioQualityIOSType, AVEncodingOption, AVModeIOSOption, AudioEncoderAndroidType, AudioSourceAndroidType } from 'react-native-audio-recorder-player';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { theme } from '../theme';
import { Bold, Regular, convertMp3ToBase64 } from '../helper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { StyleSheet } = require('react-native');

const audioRecorderPlayer = new AudioRecorderPlayer();

export const AudioRecorder = ({
  audio = false,
  onDelete=()=>false,
  onSend=()=>false
}) => {
  const [isRecording, setIsRecording] = useState(audio ? true : false);
  const [state, setState] = useState({
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: 0,
    duration: 0
  });
  const [audioFilePath, setAudioFilePath] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [send , setSend] = useState(false)
  const [resume , setResume] = useState(false)

  const onStartRecord = async () => {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const meteringEnabled = false;

    check(PERMISSIONS.ANDROID.RECORD_AUDIO).then(async (result) => {
      if (result === RESULTS.GRANTED) {
        setIsRecording(true);
        const filePath = await audioRecorderPlayer.startRecorder(undefined, audioSet, meteringEnabled);
        setAudioFilePath(filePath); // Store the audio file path
        audioRecorderPlayer.addPlayBackListener((e) => {
          setState({
            currentPositionSec: e.currentPosition,
            currentDurationSec: e.duration,
            playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
            duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
          });
          return;
        });
      } else {
        request(PERMISSIONS.ANDROID.RECORD_AUDIO)
          .then(async (result) => {
            if (result === RESULTS.GRANTED) {
              setIsRecording(true);
              const filePath = await audioRecorderPlayer.startRecorder(undefined, audioSet, meteringEnabled);
              setAudioFilePath(filePath); // Store the audio file path
              audioRecorderPlayer.addPlayBackListener((e) => {
                setState({
                  currentPositionSec: e.currentPosition,
                  currentDurationSec: e.duration,
                  playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                  duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
                });
                return;
              });
            } else if (result === RESULTS.BLOCKED) {
              return Alert.alert('Permission Blocked');
            } else {
            }
          })
          .catch((error) => {
            console.error('Error requesting permission:', error);
          });
      }
    });
  };

  const onStopRecord = async () => {
    setIsRecording(false);
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setState({
      recordSecs: 0,
      ...state
    });
  };

  const playBase64Audio = async () => {
   if(resume){
    if (audioFilePath) {
      setIsPlay(true);
      setResume(false)
      try {
        await audioRecorderPlayer.resumePlayer();
        audioRecorderPlayer.addPlayBackListener((e) => {
          setState({
            currentPositionSec: e.currentPosition,
            currentDurationSec: e.duration,
            playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
            duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
          });
          if(e.currentPosition === e.duration){
            stopAudio()
            setResume(false)
          }
          return;
        });
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    } else {
      console.warn('Audio file path is empty');
    }
   }
   else{
    if (audioFilePath) {
      setIsPlay(true);
      setResume(true)
      try {
        await audioRecorderPlayer.startPlayer(audioFilePath);
        audioRecorderPlayer.addPlayBackListener((e) => {
          setState({
            currentPositionSec: e.currentPosition,
            currentDurationSec: e.duration,
            playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
            duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
          });
          if(e.currentPosition === e.duration){
            stopAudio()
            setResume(false)
          }
          return;
        });
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    } else {
      console.warn('Audio file path is empty');
    }
   }
  };
  

  const stopAudio = () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsPlay(false)
    setState({
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: 0,
      duration: 0
    })
  };

  const pausePlayer=()=>{
    audioRecorderPlayer.pausePlayer()
    setIsPlay(false)
  }

  const onDeleteAudio = async () => {
    try {
      if (audioFilePath) {
        await RNFS.unlink(audioFilePath);
        setAudioFilePath(''); 
        onDelete()
      }
    } catch (error) {
      console.error('Error deleting audio:', error);
    }
  };
  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const remainingSeconds = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };
  const sendAudio = ()=>{
    if(audioFilePath){
      setSend(true)
      convertMp3ToBase64(audioFilePath)
      .then((base64Data) => {
        if (base64Data) {
          setSend(false)
          onDeleteAudio()
          onSend(base64Data)
        } else {
          setSend(false)
          console.log('Failed to convert MP3 to base64.');
        }
      })
      .catch((error) => {
        setSend(false)
        console.error('Error:', error);
      });
    }
  }

  const formatTotalAudioDuration = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : 
    "") + seconds);
  };

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000); // Update every second

      return () => clearInterval(interval); // Cleanup interval on unmount or when isRecording changes
    }
  }, [isRecording]);


  useEffect(() => {
    if (audio) {
      onStartRecord()
    }
  }, [])
  return (
    <View>
      {
        isRecording ?
          <View style={styles?.audio_container}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <TouchableOpacity >
                <Ionicons name="mic-circle" style={{ color: theme?.primary, fontSize: 40 }} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles?.timer}>{recordingTime ? formatTime(recordingTime) : ""}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={onStopRecord} style={{ backgroundColor: theme?.primary, padding: 5, borderRadius: 12 }}>
                <MaterialIcons name="done" style={{ color: theme?.typography?.context, fontSize: 25 }} />
              </TouchableOpacity>
            </View>
          </View>
          :
          <View style={styles?.audio_container}>
            <View style={{ alignItems: "center", flexDirection: "row", gap: 10 }}>
              <TouchableOpacity onPress={onDeleteAudio}>
                <AntDesign name="delete" style={{ color: theme?.background?.error, fontSize: 28, fontFamily: Bold }} />
              </TouchableOpacity>
              {
                isPlay ?
                  <TouchableOpacity onPress={pausePlayer}>
                    <FontAwesome name="stop-circle" style={{ color: theme?.primary, fontSize: 28, fontFamily: Bold }} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={playBase64Audio}>
                    <FontAwesome6 name="play-circle" style={{ color: theme?.primary, fontSize: 28, fontFamily: Bold }} />
                  </TouchableOpacity>
              }

            </View>
            <View>
              <Text style={styles?.timer}>{state?.currentPositionSec ? formatTotalAudioDuration(state?.currentPositionSec)  : ""}</Text>

            </View>
            <View>
              <TouchableOpacity onPress={sendAudio}>
                <MaterialCommunityIcons name="send-circle" style={{ color: theme?.primary, fontSize: 40 }} />
              </TouchableOpacity>
            </View>
          </View>
      }
    </View>

  );
};


const styles = StyleSheet.create({
  audio: {
    backgroundColor: theme?.typography?.context,

  },
  audio_container: {
    // width: "100%",
    color: theme?.typography?.main,
    borderColor: theme?.primary,
    fontFamily: Regular,
    height: 50,
    borderBottomWidth: 0,
    backgroundColor: theme?.background?.secondary,
    borderRadius: 12,
    padding: 4,
    fontSize: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 10
  },
  timer: {
    fontFamily: Bold,
    fontSize: 14,
    color: theme?.typography?.primary
  }
});