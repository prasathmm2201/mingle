import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { Networkcall, getTime, getUserData, stringAvatar } from "../../helper";
import { theme } from "../../theme";
import { useEffect, useRef, useState } from "react";
import { TextFeild } from "../../components";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { config } from "../../../config";
import { useSocket } from "../../../socket";
import Feather from 'react-native-vector-icons/Feather';
import { AudioRecorder } from "../../components/audioRecored";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AudioPlayer } from "../../components/audioplayer";


export const Chat = ({ route }) => {
  const state = JSON.parse(route?.params?.serializedData)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([]);
  const [audio, setAudio] = useState(false)
  const [user, setUser] = useState({
    user_data: null
  })
  const socket = useSocket();
  const scrollViewRef = useRef(null);
  const [isOnline, setIsOnline] = useState([])
  const [offset, setOffset] = useState({
    offset: 0,
    scroll: 0,
    scroll1: 0
  })
  const [isLoading, setIsLoading] = useState({
    initial: false,
    isLoading: false
  });
  const [newMessage, setNewMessage] = useState([]);
  const [isVideo, setIsVideo] = useState(false)
  const getMessage = async (payload) => {
    let user_data;
    if (payload?.initial) {
      user_data = await getUserData()
    }
    setIsLoading({
      initial: payload?.initial ? true : false,
      isLoading: payload?.initial ? false : true
    })
    await Networkcall({
      url: `${config?.api_url}/message/get_message`,
      method: "POST",
      isAuthorized: true,
      body: {
        receiver_id: [state?.id],
        offset: payload?.offset ?? 0,
      },
    })
      .then((data) => {
        if (payload?.initial) {
          setUser({
            ...user,
            user_data: user_data
          })
        }

        setMessages(payload?.is_filter ? [...data?.data, ...messages] : data?.data);
        setNewMessage(data?.data)
        setIsLoading({
          initial: false,
          isLoading: false
        })
        if (payload?.initial) {
          scrollToBottom()
        }
      })
      .catch((err) => {
        setIsLoading({
          initial: false,
          isLoading: false
        })
        Alert.alert(err.message)
      });
  };

  const getGroupMessage = async (payload) => {
    let user_data;
    if (payload?.initial) {
      user_data = await getUserData()
    }
    setIsLoading({
      initial: payload?.initial ? true : false,
      isLoading: payload?.initial ? false : true
    })
    await Networkcall({
      url: `${config?.api_url}/message/get_group_message`,
      method: 'POST',
      isAuthorized: true,
      body: {
        group_id: state?.id,
        offset: payload?.offset ?? 0,
      },
    })
      .then((data) => {
        if (payload?.initial) {
          setUser({
            ...user,
            user_data: user_data
          })
        }
        setMessages(messages?.concat(data?.data));
        setNewMessage(data?.data)
        setIsLoading({
          initial: false,
          isLoading: false
        })
        if (payload?.initial) {
          scrollToBottom()
        }
      })
      .catch((err) => {
        setIsLoading({
          initial: false,
          isLoading: false
        })
        Alert.alert(err.message)
      });
  };


  const createGroupChat = (audio) => {
    socket.emit('groupchatMessage', { user_id: state?.id, message: message, user: user?.user_data, created_at: Date.now(), members: state?.members?.map((x) => x?.user), audio: !!audio ? audio : undefined });
    setMessage("")
    scrollToBottom()
    createMessage({ group_id: state?.id, message: message, user: user?.user_data, created_at: new Date(), audio: !!audio ? audio : undefined })
  }

  const sendMessage = (audio) => {
    socket.emit('privateMessage', { user_id: state?.id, user: user?.user_data, message: message, created_at: Date.now(), audio: !!audio ? audio : undefined });
    setMessages([...messages, { user_id: state?.id, user: user?.user_data, message: message, created_at: Date.now(), audio: !!audio ? audio : undefined }]);
    setMessage("")
    scrollToBottom()
    createMessage({ receivers: [state?.id], user: user?.user_data, message: message, created_at: new Date(), audio: !!audio ? audio : undefined })
  }

  const createMessage = (data) => {
    Networkcall({
      url: `${config?.api_url}/message/create`,
      method: "POST",
      isAuthorized: true,
      body: data
    }).then((data) => {
      console.log(data?.data)

    }).catch(() => {

    })
  }

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 10000, animated: true }); // Adjust the y value as needed
    }
  };

  const disconnect = () => {
    socket.emit('disconnect_online', user?.user_data?.user_id)
  }

  const fetchData = (offset) => {
    if (state?.is_group) {
      getGroupMessage({
        offset: offset,
        is_filter: true
      })
    } else {
      getMessage({
        offset: offset,
        is_filter: true
      })

    }
  };

  const handleScroll = (e) => {
    const { contentOffset } = e.nativeEvent;
    if (contentOffset.y === 0) {
      if (offset?.scroll !== offset?.scroll1) {
        fetchData(offset?.offset + 10);
        setOffset({
          ...offset,
          offset: offset?.offset + 10,
          scroll1: offset.scroll
        })
      }
    }
  };

  handleContentSizeChange = (contentWidth, contentHeight) => {
    setOffset({
      ...offset,
      scroll: contentHeight
    })
  };


  useEffect(() => {
    if (state?.is_group) {
      getGroupMessage({
        initial: true,
      });
    } else {
      getMessage({
        initial: true,
      });
    }
  }, [])


  useEffect(() => {
    if (socket && user?.user_data?.token) {
      if (state?.is_group) {
        socket.emit('setNickname', user?.user_data?.token)
        socket.emit('joinRoom', state?.id);
        socket.on('roomJoined', (room) => {
          console.log(`Joined room: ${room}`);
        });
        socket.on('groupchatMessage', (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
          scrollToBottom()

        });
      }
      else {
        socket.emit('setNickname', user?.user_data?.token)
        socket.on('privateMessage', (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
          scrollToBottom()
        });
        socket.on("user_connected", (data) => {
          setIsOnline(data)
        })
        socket.on("user_disconnected", (data) => {
          setIsOnline(data)
        })
      }
      return () => {
        if (socket) {
          console.log('disconnect-----')
          disconnect()
        }
      };
    }
  }, [socket , user?.user_data?.token]);





  const unreadMessage = () => {
    Networkcall({
      url: `${config?.api_url}/message/create`,
      method: "POST",
      isAuthorized: true,
      body: {
        is_unread: newMessage?.filter((x) => x?.is_unread === true)?.map((x) => {
          return {
            message: x?.id,
            user: user?.user_data?.user_id
          }
        })
      }
    }).then((data) => {
    }).catch((err) => {
      Alert.alert(err.message)

      console.log(err.message, 'err.message')
    })
  }

  useEffect(() => {
    if (newMessage?.filter((x) => x?.is_unread === true)?.length > 0) {
      unreadMessage()

    }
  }, [newMessage])

  return (
    <View style={styles?.container}>
      {
        isVideo ?
          <View style={{ flex: 1 }}>
            {/* <VideoCall startCall={startCall} setIsVideo={(v) => setIsVideo(v)} localStream={localStream} Mic={Mic} Video={Video} IconsShow={IconsShow} remoteAndLocalStream={remoteAndLocalStream} peerConnectionRef={peerConnectionRef} inCall={inCall} endCall={endCall} Icontoggle={Icontoggle} toggleVideo={toggleVideo} toggleMic={toggleMic} /> */}
          </View>
          :
          <View style={{ flex: 1 }}>
            <View style={styles?.topNavbar}>
              <View style={{ flexDirection: 'row', gap: 15, alignItems: "center" }}>
                <View style={{ ...styles?.image_background, backgroundColor: stringAvatar(state?.username)?.bgcolor }}>
                  <Text style={styles?.image_name}>{stringAvatar(state?.username)?.children}</Text>
                </View>
                <View>
                  <Text style={styles?.header}>{state?.username}</Text>
                  {
                    isOnline?.includes(state?.id) ? <Text style={styles?.subNav}>Active now</Text> : <Text style={styles?.subNav}>In-Active</Text>
                  }
                </View>
              </View>

              {/* <TouchableOpacity style={styles?.search} onPress={callIinitate}>
                <Ionicons name="videocam-outline" style={{ color: theme?.typography?.main, fontSize: 30 }} />
              </TouchableOpacity> */}
            </View>


            {
              isLoading?.initial ?
                <View style={{
                  flex: 1,
                  resizeMode: 'cover',
                  padding: 24,
                  alignItems: 'start',
                  justifyContent: 'center',
                  alignItems: "center"
                }}>
                  <Image source={require('../../../assets/Spinner-1s-200px.gif')} style={{ height: 120, width: 120 }} />
                </View> :
                <ScrollView
                  style={{ flex: 1, padding: 20, height: '100%' }}
                  ref={scrollViewRef}
                  onScroll={handleScroll}
                  onContentSizeChange={handleContentSizeChange}
                  scrollEventThrottle={16}
                >
                  {isLoading?.isLoading && <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 2, display: "flex" }} ><Feather name="loader" style={{ fontSize: 30, color: theme?.typography?.main }} /></View>
                  }
                  {
                    messages?.map((x, i) => {
                      return (
                        <View key={i} style={{ marginVertical: 10, overflow: "scroll" }}>
                          {
                            ((x?.user?.user_id || x?.user_id) === user?.user_data?.user_id) ?
                              <View style={styles.text_container}>
                                <View style={styles?.current_user}>
                                  {
                                    x?.audio?.length ? <AudioPlayer audio={x?.audio} color={"#fff"} /> : <Text style={styles?.current_user_text}>{x?.message}</Text>

                                  }
                                </View>
                                <Text style={styles?.user_created_at}>{x?.created_at ? getTime(new Date(x?.created_at)) : ""}</Text>
                              </View>
                              :
                              <View style={styles.other_container}>

                                <View style={{ ...styles?.message_background, backgroundColor: stringAvatar(x?.user?.name || x?.username)?.bgcolor }}>
                                  <Text style={styles?.image_name}>{stringAvatar(x?.user?.name || x?.username)?.children}</Text>
                                </View>
                                <View>
                                  <View style={styles?.other_user}>
                                    {
                                      x?.audio?.length ? <AudioPlayer audio={x?.audio} color={theme?.typography?.primary} /> : <Text style={styles?.other_user_text}>{x?.message}</Text>

                                    }
                                  </View>
                                  <Text style={styles?.other_created_at}>{x?.created_at ? getTime(new Date(x?.created_at)) : ""}</Text>
                                </View>
                              </View>
                          }
                        </View>
                      )
                    })
                  }
                </ScrollView>
            }

            <View style={styles?.bottomNavbar}>
              {
                audio ?
                  <AudioRecorder audio={audio} onDelete={() => setAudio(false)} onSend={(e)=>state?.is_group ? createGroupChat(e) : sendMessage(e)} />
                  : <View style={{ width: "100%", position: "relative" }}>
                    <View style={{ position: 'absolute', height: "100%", right: 5, width: 40, zIndex: 999, display: "flex", justifyContent: 'center', backgroundColor: theme?.background?.secondary }}>
                      {message ?
                        <TouchableOpacity onPress={()=>state?.is_group ? createGroupChat(null) : sendMessage(null)}>
                          <MaterialCommunityIcons name="send-circle" style={{ color: theme?.primary, fontSize: 40 }} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => setAudio(true)}>
                          <Ionicons name="mic-circle" style={{ color: theme?.primary, fontSize: 40 }} />
                        </TouchableOpacity>
                      }
                    </View>
                    <TextFeild
                      value={message}
                      onChangeText={(e) => setMessage(e)}
                      props_styles={{
                        borderBottomWidth: 0,
                        backgroundColor: theme?.background?.secondary,
                        borderRadius: 12,
                        padding: 10,
                        fontSize: 14,
                        paddingRight: 37
                      }}
                      placeholder="Write your message"
                    />
                  </View>
              }

            </View>
          </View>
      }

    </View >
  )
};
