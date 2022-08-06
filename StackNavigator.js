import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import useAuth from './hooks/useAuth';

const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#FE4C6A" },
  headerTitleStyle: { color: "black" },
  headerTintColor: "black"
}

export default function StackNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator 
      initialRouteName='Home'
      screenOptions={globalScreenOptions}>
        { !user ? (
          <>
          <Stack.Screen options={{title: "Sign In"}} name="Login" component={LoginScreen} />  
          <Stack.Screen name="Register" component={RegisterScreen} />  
        </>
        ) : (
          <>
          <Stack.Screen name="AddChat" component={AddChatScreen} />  
          <Stack.Screen name="Chat" component={ChatScreen} />  
          <Stack.Screen options={{headerLeft: () => { return null;}}} name="Home" component={HomeScreen} />  
          </>
        )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
