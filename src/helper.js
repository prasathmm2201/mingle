import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import RNFS from 'react-native-fs';

export const Networkcall = async ({
  url,
  method,
  body,
  headers,
  isAuthorized = false,
  // notValidateURL = false,
  otherProps = {},
}) => {
  //Check for URL,method,body
  // if (!url && !method) {
  //   return Promise.reject({ message: "URL and HTTP Method is not mentioned." });
  // }
  let newHeader = headers;

  //Adding Authorization to headers if it is requested
  if (isAuthorized) {
    // get the authentication token from local storage if it exists
    const value = await AsyncStorage.getItem(LocalStoragekeys?.token);
    newHeader = {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + value,
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }

  return Axios({
    method: method,
    url: url,
    data: body,
    headers: newHeader,
    ...otherProps,
  }).catch((error) => {
    console.log(error.message, 'error');
    return Promise.reject(error);
  });
};

export const LocalStoragekeys = {
  token: 'token',
  user_id: "user_id",
};

export const storeData = async (key, value) => {
  console.log(key, value, 'datatat');
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Data saved successfully.");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

// Retrieving data
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      console.log("No data found for key:", key);
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

const alphabetColors = {
  A: "#C24B23",
  B: "#647D18",
  C: "#2C7E4E",
  D: "#3275A5",
  E: "#5E3B77",
  F: "#773B54",
  G: "#A1652A",
  H: "#366D00",
  I: "#387C65",
  J: "#55678C",
  K: "#9636A9",
  L: "#A93666",
  M: "#867339",
  N: "#497639",
  O: "#228078",
  P: "#464D9F",
  Q: "#994092",
  R: "#890A3F",
  S: "#616116",
  T: "#267D26",
  U: "#3E6C75",
  V: "#453B77",
  W: "#773B63",
  X: "#CB2C6E",
  Y: "#6F2E2E",
  Z: "#962CCB",
};

export const stringAvatar = (name) => {
  let capName = name ? name.trim("").toUpperCase() : undefined;
  return {
    bgcolor: alphabetColors[capName?.[0]],
    children:
      capName &&
      (capName.indexOf(" ") >= 0
        ? `${capName.split(" ")[0][0]}${capName.split(" ")[1][0]}`
        : `${capName.split(" ")[0][0]}`),
  };
};

export const TimeDiffBetweenDates = (date1, date2) => {
  function formatTimeDifference(startDate, endDate) {
    const timeDifferenceMs = endDate - startDate;

    const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

    let formattedTime = '';
    if (hours > 0) {
      formattedTime = `${hours}hr `;
    }
    if (minutes > 0) {
      formattedTime = `${minutes}min `;
    }

    if (seconds > 0) {
      formattedTime = `${seconds}sec `;
    }

    if (seconds === 0) {
      formattedTime = "now";
    }

    return formattedTime.trim();
  }

  const startDate = new Date(date1);
  const endDate = new Date(date2);

  const formattedTime = formatTimeDifference(startDate, endDate);

  return formattedTime;
};

export const getTime=(date)=>{
  let d = new Date(date);
d = (d.getHours() > 12 ? d.getHours() - 12 : d.getHours())+':'+d.getMinutes()+' '+(d.getHours() >= 12 ? "PM" : "AM");

return d

}



export const Bold = "Bold"
export const SemiBold = "semiBold"
export const Regular = "Regular"

export const getUserData = async() =>{
  const token = await  getData(LocalStoragekeys?.token)
  if(!token) return {}
  const use_data = await jwtDecode(token);
  return {
    ...use_data,
    token
  }

}


export const convertMp3ToBase64 = async (mp3FilePath) => {
  try {
    const mp3Buffer = await RNFS.readFile(mp3FilePath, 'base64');
    return mp3Buffer;
  } catch (error) {
    console.error('Error converting MP3 to base64:', error);
    return null;
  }
};

export const formatTotalAudioDuration = (millis) => {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : 
  "") + seconds);
};



export var Base64 = {
  btoa: function (input) {
    input = input || '';
    var str = input;
    var output = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    for (var block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || (map = '=', i % 1);
      output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

      charCode = str.charCodeAt(i += 3 / 4);

      if (charCode > 0xFF) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }

      block = block << 8 | charCode;
    }

    return output;
  },

  atob: function (input) {
    input = input || '';
    var str = input.replace(/=+$/, '');
    var output = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (var bc = 0, bs = 0, buffer, i = 0;
      buffer = str.charAt(i++);

      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};
