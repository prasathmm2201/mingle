import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Bold, formatTotalAudioDuration } from '../helper';
import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { theme } from '../theme';

const audioRecorderPlayer = new AudioRecorderPlayer();



export const AudioPlayer = ({ audio, color }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [state, setState] = useState({
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: 0,
    duration: 0
  });


  // Function to play audio and handle deletion afterward
const playAndDeleteAudio = async () => {
  // Create a file path for saving the audio
  const filePath = RNFS.CachesDirectoryPath + '/audio.mp3';

  try {
    // Save the base64 audio data to a file
    await RNFS.writeFile(filePath, audio, 'base64');

    // Play the audio (your audio playback logic here)
    await playAudio(filePath);

    // Delete the file after playback and object URL release
    await RNFS.unlink(filePath);
  } catch (error) {
    console.error('Error:', error);
  }
};





  const playAudio = async(audioFilePath) => {
    if (audioFilePath) {
      setIsPlaying(true);
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
          }
          return;
        });
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    } else {
      console.warn('Audio file path is empty');
    }
  };
  const stopAudio = () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsPlaying(false)
    setState({
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: 0,
      duration: 0
    })
  };

 
  return (
    <View style={{flexDirection:"row" , alignItems:"center" ,     gap:10
  }}>
      {isPlaying ? (
        <TouchableOpacity onPress={stopAudio}>
          <FontAwesome name="stop-circle" style={{ fontSize: 28, fontFamily: Bold, color: color }} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={playAndDeleteAudio}>
          <FontAwesome name="play-circle" style={{ fontSize: 28, fontFamily: Bold, color: color }} />
        </TouchableOpacity>
      )}
                    <Text style={{
    fontFamily: Bold,
    fontSize: 14,
    color: color ?? theme?.typography?.primary,
  }}>{state?.currentPositionSec ? formatTotalAudioDuration(state?.currentPositionSec)  : ""}</Text>

    </View>
  );
};

