import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/* HOC - Higher Order Component*/}
      <StackNavigator />
    </NavigationContainer>
  );
}

