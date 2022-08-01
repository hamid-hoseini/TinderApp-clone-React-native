import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';

export default function App() {
  console.log('here app');
  return (
    <NavigationContainer>
      {/* HOC - Higher Order Component*/}
      <AuthProvider>
        {/* Passes down the cool auth stuff to children... */}
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

