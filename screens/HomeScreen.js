import { StyleSheet, Text, View, button } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'

const HomeScreen = () => {
  const {user, LogOut } = useAuth();

  const handleLogOut = async () => {
    try {
      await LogOut();
    } catch (error) {
      console.log(error);
    }
  }  


  return (
    <View>
      <Text>HomeScreen</Text>
      <button onPress={handleLogOut}>Log Out</button>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})