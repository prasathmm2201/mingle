import { View, ImageBackground, TouchableOpacity, Image, Text } from "react-native"
import { styles } from "./style"
import { Button } from "../../components"
import { theme } from "../../theme"
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LocalStoragekeys, getData } from "../../helper";
import { useEffect } from "react";

GoogleSignin.configure({
    webClientId:'846385039211-el4trqb5vp9cpi8fal3dhf2s1fid5qkl.apps.googleusercontent.com',
    "client_type": 3,
    offlineAccess: true
  })

export const WelcomePage = ({ navigation }) => {
    const createNew=()=>{
        navigation.navigate("Signup");
    }
    const login=()=>{
        navigation.navigate("Login");
    }

    const signIn = async () => {
        try {
          await GoogleSignin.configure();
          const userInfo = await GoogleSignin.signIn();
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          navigation.navigate("Signup", { serializedData: JSON.stringify(userInfo?.user) });

        } catch (error) {
          console.log('got error: ',error.message , error.code);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };


  const initalData =async()=>{
    const token = await getData(LocalStoragekeys?.token)
    if(token){
      navigation.navigate("Home");
    }

  }
  useEffect(()=>{
    initalData()
  },[])
    return (
        <ImageBackground
            source={require('../../../assets/welcomepanner.png')}
            style={styles?.container}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View>
                    <Text style={styles.text}>Connect friends</Text>
                    <Text style={styles.textSub}>easily & quickly</Text>
                </View>
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.sub}>Our chat app is the perfect way to stay</Text>
                    <Text style={styles.sub}>connected with friends and family.</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ marginTop: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                        <TouchableOpacity style={styles.google_logo} onPress={signIn}>
                            <Image
                                source={require("../../../assets/google-logo.png")}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.option}>
                        <Text style={styles.orText}>OR</Text>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Button
                            style={{
                                backgroundColor: theme?.typography?.context,
                                borderColor: theme?.typography?.context,
                                height: 48,
                                text_style: {
                                    color: theme?.typography?.main,
                                }
                            }}
                            onPress={createNew}
                            text={"Sign up withn mail"}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', gap: 5, marginTop: 20, justifyContent: "center" }}>
                        <Text style={styles?.existing}>Existing account?</Text>
                        <TouchableOpacity onPress={login}><Text style={styles?.login}>Log in</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}