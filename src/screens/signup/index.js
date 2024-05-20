import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { styles } from './style';
import { Button, TextFeild } from '../../components';
import { useEffect, useState } from 'react';
import { LocalStoragekeys, Networkcall, getData } from '../../helper';
import { config } from '../../../config';

export const SignUp = ({ navigation, route }) => {
  const location = route?.params?.serializedData ? JSON.parse(route?.params?.serializedData) : null

  const [state, setState] = useState({
    email: '',
    password: "",
    username: "",
    confirm_password: "",
    disabled: true,
    error: {
      email: '',
      password: "",
    },
  });
  const [loading, setLoading] = useState(false)

  const updateState = (key, value) => {
    setState({ ...state, [key]: value });
  };



  const signUp = async () => {
    setLoading(true)
    await Networkcall({
      url: `${config?.api_url}/auth/sign_up`,
      method: "POST",
      body: {
        username: state?.username,
        password: state?.password,
        email_id: state?.email
      },
      isAuthorized: false

    }).then(() => {
      setLoading(false)
      navigation.navigate("Login")
    }).catch((err) => {
      console.log(err?.code, 'constraint')
      if (err.code === "ERR_BAD_REQUEST") {
        setLoading(false)
        Alert.alert("username already exists");
      }
      else {
        setLoading(false)
        Alert.alert(err?.message);
      }


    })




  }

  const goLogin = () => {
    signUp()
  }
  const initalData =async()=>{
    const token = await getData(LocalStoragekeys?.token)
    if(token){
      navigation.navigate("Home");
    }
  }

  useEffect(() => {
    if (location) {
      setState({
        ...state,
        email: location?.email,
        username: location?.name,
        disabled: false,
      })
    }
    initalData()
  }, [])


  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View>
            <Text style={styles?.title}>Sign up with Email</Text>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
              <Text style={styles?.subTitle}>Get chatting with friends and family today by signing up for our chat app!</Text>
            </View>
          </View>
          <View style={{ flexDirection: "column", gap: 30 }}>
            <TextFeild value={state?.username} onChangeText={(e) => updateState("username", e)} label="Your name"
            />
            <TextFeild value={state?.email} onChangeText={(e) => updateState("email", e)} label="Your email" disabled={state?.disabled}
            />
            <TextFeild value={state?.password} onChangeText={(e) => updateState("password", e)} label="Password"
            />

          </View>

          <View style={styles.btnContainer}>
            <Button
              text={"Create an account"}
              disabled={(state?.email && state?.password && state?.username) ? false : true}
              is_loading={loading}
              onPress={goLogin}
              loadingColor={"#fff"}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
