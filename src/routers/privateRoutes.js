import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Chat, Group } from "../screens";

const Stack = createNativeStackNavigator();
const PrivateRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={({ route, state }) => ({
        tabBarShowLabel: false,
        tabBar: false,
        headerShown: false
      })}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Group" component={Group} />
    </Stack.Navigator>
  );
};

export default PrivateRouter;
