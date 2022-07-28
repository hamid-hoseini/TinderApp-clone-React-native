import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();

  const { user } = useAuth();

  return (
    <View>
      <Text>Welcome { user }!</Text>
      <Button title="login" onPress={signInWithGoogle} />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})