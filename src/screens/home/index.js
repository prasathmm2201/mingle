import { Alert, FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import Octicons from 'react-native-vector-icons/Octicons';
import { theme } from "../../theme";
import { Card } from "./components/card";
import { Bold, Networkcall, getUserData, stringAvatar } from "../../helper";
import { config } from "../../../config";
import { useEffect, useState } from "react";
import { useSocket } from "../../../socket";
import { NoDataFound, TextFeild } from "../../components";
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const Home = ({ navigation , route }) => {
  const [list, setList] = useState({
    list: [],
    loading: false,
    user_data: {}
  });
  const [listData, setListData] = useState([])
  const [isOnline, setIsOnline] = useState([])
  const [newMessageData, setNewMessageData] = useState([])
  const [newMessage, setNewMessage] = useState([])
  const [searchText, setSearchText] = useState("")
  const [isSearch, setSearch] = useState(false)
  const socket = useSocket();

  const orderBy = (id) => {
    const movedObjectIndex = listData?.filter(item => item.id === id);
    const movedObjectIndex1 = listData?.filter(item => item.id !== id);

    setListData([...movedObjectIndex, ...movedObjectIndex1])

    // if (movedObjectIndex !== -1) {
    //     const movedObject = list?.list?.splice(movedObjectIndex, 1)[0];
    //     list?.list?.unshift(movedObject);
    //     setList()
    // }
  }
  const gotoChat = (data) => {
    navigation.navigate("Chat", { serializedData: JSON.stringify(data) });
  }
  const createGroup = ()=>{
    navigation.navigate("Group", { serializedData: JSON.stringify(list?.user_data) });

  }
  const getList = async ({
    initial = false
  }) => {
    setList({
      ...list,
      loading: initial ? true : false
    })
    let user_data;
    if (initial) {
      user_data = await getUserData()
    }
    await Networkcall({
      url: `${config?.api_url}/message/get_all_message`,
      method: "POST",
      isAuthorized: true
    }).then((data) => {
      if (initial) {
        setList({
          ...list,
          loading: false,
          user_data: user_data
        })
      }
      setListData(data?.data)


    }).catch((err) => {
      console.log(err, 'err')
      setList({
        ...list,
        loading: false
      })
      Alert.alert(err?.message);

    })
  }

  const disconnect = () => {
    socket.emit('disconnect_online', list?.user_data?.user_id)
  }

  useEffect(() => {
    if (socket) {
      socket.on("user_connected", (data) => {
        setIsOnline(data)
      })
      socket.on("user_disconnected", (data) => {
        setIsOnline(data)
      })
      socket.on('privateMessage', (data) => {
        setNewMessage((prevMessages) => [...prevMessages, data?.user?.user_id]);
        setNewMessageData((prevMessages) => [...prevMessages, data])
        // orderBy(data?.user?.user_id)
      });
      socket.on("groupMessageChat", (data) => {
        console.log(data, 'slsll')
        setNewMessage((prevMessages) => [...prevMessages, data?.user_id]);
        setNewMessageData((prevMessages) => [...prevMessages, data])
        // orderBy(data?.user_id)
      })
      socket.on('createGroup', (data) => {
        setListData((prevMessages) => [data, ...prevMessages])
      })
    }
    return () => {
      if (socket) {
        disconnect()
      }
    };
  }, [socket]);

  useEffect(() => {
    if (socket && list?.user_data?.token) {
      socket.emit('setNickname', list?.user_data?.token)
    }
  }, [socket, list?.user_data?.token])


  useEffect(() => {
    getList({
      initial: true
    })
    console.log('slslsl')
  }, [route])


  const Logout=()=>{
    AsyncStorage.clear()
    navigation.navigate("Welcome");

  }


  return (
    <View style={styles?.container}>
      {
        isSearch ?
          <View style={{ padding: 20 }}>
            <View style={{
              flexDirection: "row", alignItems: "center", borderWidth: 1,
              borderColor: theme?.border?.teritory, borderRadius: 50, justifyContent: "space-between",
              position:"relative" ,

            }}>
              <TextFeild
                value={searchText}
                onChangeText={(e) => setSearchText(e)}
                props_styles={{
                  borderBottomWidth: 0,
                  backgroundColor: theme?.typography?.primary,
                  borderRadius: 12,
                  padding: 10,
                  fontSize: 14,
                  paddingRight: 37,
                  color: "#fff",
                  fontFamily:Bold
                  // height:10
                }}
                placeholder="Search" />
              <View style={{
                width: 60,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position:"absolute",
                right:10 , zIndex:2
              }}>
                <TouchableOpacity onPress={() => setSearch(false)}>
                  <Octicons name="search" style={{ color: theme?.typography?.context, fontSize: 22 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          :
          <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', padding: 20 }}>
            <View style={styles?.search}>
              <TouchableOpacity onPress={() => setSearch(true)}>
                <Octicons name="search" style={{ color: theme?.typography?.context, fontSize: 22 }} />
              </TouchableOpacity>
            </View>
            <Text style={styles?.header}>Mingle</Text>
            <View style={styles?.search}>
              <View style={{ ...styles?.image_background, backgroundColor: stringAvatar(list?.user_data?.name)?.bgcolor }}>
                <Text style={styles?.image_name}>{stringAvatar(list?.user_data?.name)?.children}</Text>
              </View>
              <TouchableOpacity onPress={Logout} style={{position:"absolute" , bottom:-20 , right:-5 , width:30 , height:30 , backgroundColor:"#fff"  , borderRadius:50 , flexDirection:"row" , alignItems:'center' , justifyContent:"center"}}>
              <AntDesign name="logout" style={{ color: theme?.background?.error, fontSize: 20 }}/>

              </TouchableOpacity>
            </View>
          </View>

      }

      <View style={styles?.main}>
        {
          list?.loading ?
            <View
              style={{
                flex: 1,
                resizeMode: 'cover',
                padding: 24,
                alignItems: 'start',
                justifyContent: 'center',
                alignItems: "center"
              }}
            >
              <Image source={require('../../../assets/Spinner-1s-200px.gif')} style={{ height: 120, width: 120 }} />

            </View>
            :
            listData?.length ? 
            <FlatList
              data={listData?.length > 0 ? listData?.filter(_ => _.username.toLowerCase().includes(searchText?.toLowerCase())) : []}
              renderItem={(data) => <Card {...data} onClick={gotoChat} isOnline={isOnline} newMessage={newMessage} newMessageData={newMessageData} />}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.flatListContainer}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
            :
            <NoDataFound/>
        }
        <TouchableOpacity style={{ backgroundColor: theme?.typography?.primary,  borderRadius:50 , position:"absolute" , bottom:4 , right:4 , width:60 , height:60 , flexDirection:'row' , justifyContent:'center' , alignItems:"center"}} onPress={createGroup}>
          <AntDesign name="addusergroup" style={{ color: theme?.typography?.context, fontSize: 30 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
};
