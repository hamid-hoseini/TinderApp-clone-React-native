import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/base'
//import useAuth from '../hooks/useAuth'

const HomeScreen = () => {
  //const {user, LogOut } = useAuth();

  const handleLogOut = async () => {
    // try {
    //   await LogOut();
    // } catch (error) {
    //   console.log(error);
    // }
    return;
  }  


  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={handleLogOut} title="Log Out" />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})