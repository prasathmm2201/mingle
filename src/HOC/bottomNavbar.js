/* eslint-disable react/react-in-jsx-scope */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { HomeParent } from '../screens/home';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TopNavBar } from '../components';


const Tab = createBottomTabNavigator();
export const BottomNavBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#fff"
      screenOptions={({ route, state }) => ({
        tabBarShowLabel: false,
        tabBar: false,
        // headerShown: false,
        tabBarStyle: [styles.shadow],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === "Home") {
            iconName = focused ? (
              <Foundation name={'home'} size={34} color={"#002B5B"} />
            ) : (
              <Octicons name={'home'} size={23} color={"#002B5B"} />
            );
          } else if (rn === "Search") {
            iconName = focused ? (
              <Octicons name={'search'} size={34} color={"#002B5B"} />
            ) : (
              <Octicons name={'search'} size={23} color={"#002B5B"} />
            );
          } else if (rn === "Chat") {
            iconName = focused ? (
              <Ionicons name={'chatbox-ellipses'} size={34} color={"#002B5B"} />
            ) : (
              <Ionicons
                name={"chatbox-ellipses-outline"}
                size={23}
                color={"#002B5B"}
              />
            );
          } else if (rn === "Likes") {
            iconName = focused ? (
              <AntDesign name={'heart'} size={34} color={"#002B5B"} />
            ) : (
              <AntDesign name={'hearto'} size={23} color={"#002B5B"} />
            );
          }

          return iconName;
        },
        headerStyle: [styles.header],
        // headerTitle: (props) => <TopNavBar {...props} />
      })}
    >
      <Tab.Screen name="Home" component={HomeParent} />
      <Tab.Screen name="Search" component={HomeParent} />
      <Tab.Screen name="Likes" component={HomeParent} />
      <Tab.Screen name="Chat" component={HomeParent} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 60,
    borderWidth: 0,
    borderColor: '#fff',
  },
  header: {
    backgroundColor: '#458CE6'
    }
});
