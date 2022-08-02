import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();
  // const user = false;
  console.log('here');
  return (
      <Stack.Navigator>
        { user ? (
          <>
          <Stack.Screen name="Home" component={HomeScreen} />
          {/*<Stack.Screen name="Chat" component={ChatScreen} /> */}
          </>
        ) : (
          <>
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
          <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      
      </Stack.Navigator>
  )
}

export default StackNavigator