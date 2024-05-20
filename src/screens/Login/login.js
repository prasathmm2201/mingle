import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from 'react-native';
import { styles } from './style';
import { Button, TextFeild } from '../../components';
import { useEffect, useState } from 'react';
import { LocalStoragekeys, Networkcall, getData, storeData } from '../../helper';
import { config } from '../../../config';


export const Login = ({ navigation }) => {
  const [state, setState] = useState({
    email: '',
    password: "",
    error: {
      email: '',
      password: "",
    },
  });
  const [loading, setLoading] = useState(false)
  const updateState = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const login =async () => {
    setLoading(true)
   await Networkcall({
      url: `${config?.api_url}/auth/login`,
      method: "POST",
      body: {
        username: state?.username,
        password: state?.password
      },
      isAuthorized: false
    }).then((data) => {
      setLoading(false)
      storeData(LocalStoragekeys?.token, data?.data?.data);
      storeData(LocalStoragekeys?.user_id, data?.data.user_id);
      navigation.navigate("Home");


    }).catch((err) => {
      console.log(err , 'err')
      setLoading(false)
      Alert.alert(err?.message);

    })
  }

  const initalData =async()=>{
    const token = await getData(LocalStoragekeys?.token)
    if(token?.length){
      console.log(token , 'token')

      navigation.navigate("Home");
    }

  }
  useEffect(()=>{
    initalData()
  },[])

  return (
    <KeyboardAvoidingView enabled={true} behavior='padding' style={{flex:1 , backgroundColor:"#fff"}}>
    <SafeAreaView style={styles.container}>
      <View >
        <View style={{ position: "relative" }}>
          <Text style={styles?.title}>Log in to Chatbox</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 19 }}>
          <Text style={styles?.subTitle}>Welcome back! Sign in using your social account or email to continue us</Text>
        </View>

        {/* <View style={{ flexDirection: 'row', justifyContent: "center" }}>
          <TouchableOpacity style={styles.google_logo} onPress={signIn}>
            <Image
              source={require("../../../assets/google-logo.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.option}>
          <Text style={styles.orText}>OR</Text>
        </View> */}

        <View style={{ marginTop: 30, flexDirection: "column", gap: 30 }}>
          <TextFeild value={state?.username} onChangeText={(e) => updateState("username", e)} label="Your email"
          />
          <TextFeild value={state?.password} onChangeText={(e) => updateState("password", e)} label="Password"
          />
        </View>

        <View style={{ marginTop: 30 }}>
          <Button
            text={"Log in"}
            disabled={(state?.username && state?.password) ? false : true}
            is_loading={loading}
            onPress={login}
            loadingColor={"#fff"}
          />
          {/* <TouchableOpacity>
            <Text style={styles?.forgot_password}>Forgot password?</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
