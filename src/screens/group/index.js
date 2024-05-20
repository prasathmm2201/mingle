import { Alert, FlatList, Image, Text, View } from "react-native"
import { styles } from "./style"
import { Button, TextFeild } from "../../components"
import { useEffect, useState } from "react"
import { theme } from "../../theme"
import { Card } from "../home/components/card"
import { Networkcall } from "../../helper"
import { config } from "../../../config"



export const Group = ({ navigation }) => {
    const [state, setState] = useState({
        search: '',
        name: "",
        error: {
            search: '',
            name: "",
        },
    });
    const [list, setList] = useState([])
    const [is_called, setIsCalled] = useState(false)
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)


    const updateState = (key, value) => {
        setState({ ...state, [key]: value });
    };

    const getList = (search) => {
        setIsCalled(true)

        Networkcall({
            url: `${config?.api_url}/users`,
            method: "POST",
            isAuthorized: true,
            body: {
                search: search ?? undefined
            }
        }).then((data) => {
            setIsCalled(false)
            setList(data?.data)
        }).catch((err) => {
            setIsCalled(false)
  Alert.alert(err?.message)
    
        })
    }

    const choose = (data) => {
        if (selected?.map((x) => x?.id).includes(data?.id)) {
            setSelected(selected?.filter((x) => x?.id !== data?.id))
        }
        else {
            setSelected([...selected, data])

        }
    }

    const groupCreate=(image)=>{
        console.log({
            name:state?.name,
            users:selected?.map((x)=>x?.id)
        } , 'ssksksk')
        setLoading(true)
         Networkcall({
           url: `${config?.api_url}/message/group/create`,
           method: "POST",
           isAuthorized:true,
           body:{
               name:state?.name,
               users:selected?.map((x)=>x?.id)
           }
       }).then((data) => {
           if(data?.data?.type === "error"){
               setLoading(false)
               return  Alert.alert("Group already exists")
           }
           navigation.navigate("Home" , { reload: state?.id });

           setLoading(false)

       }).catch((err) => {
           setLoading(false)
          Alert.alert(err?.message)
       })
}


useEffect(()=>{
    getList()
},[])


    return (
        <View style={styles?.container}>
 {
                        is_called ? 
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
          <View style={{flex:1}}>
              <View style={{flex:1}}>
                <View style={{ padding: 20, paddingBottom: 0 }}>
                    <Text style={styles?.title}>Create Group</Text>

                    <View style={{ marginTop: 10, marginBottom: 20 }}>
                        <TextFeild  value={state?.name} onChangeText={(v) => updateState('name', v)} props_styles={{
                            borderRadius: 12,
                            paddingHorizontal: 10,
                        }} label="Enter a name" />
                    </View>

                    <Text style={styles?.members_title}>Select Members</Text>

                    <TextFeild placeholder={'Search'} value={state?.search} onChangeText={(v) => updateState('search', v)} props_styles={{
                        backgroundColor: theme?.background?.secondary,
                        borderRadius: 12,
                        borderBottomWidth: 0,
                        paddingHorizontal: 10
                    }} />
                </View>

                <View style={{ padding: 20 }}>
                   
                      <FlatList
                      data={list}
                      renderItem={(data) => <Card {...data} group={true} onClick={choose} is_selected={selected?.map((v) => v?.id)?.includes(data?.item?.id)}/>}
                      keyExtractor={item => item.id}
                      contentContainerStyle={styles.flatListContainer}
                  />
                    
                   
                </View>
            </View>

            <View style={{padding:20 , backgroundColor:"#fff"}}>
                <Button
                    text={"Create "}
                    disabled={(state?.name && selected?.length) ? false : true}
                    is_loading={loading}
                    onPress={groupCreate}
                    loadingColor={"#fff"}
                />
            </View>
          </View>
}
        </View>
    )
}