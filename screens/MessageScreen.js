import { useRoute } from '@react-navigation/native'
import { StyleSheet, Text, Sa, SafeAreaView } from 'react-native'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'

const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();

  const { matchDetails } = params;
  console.log(matchDetails?.users);
  return (
    <SafeAreaView>
      <Header title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} callEnabled/>
      <Text>Message</Text>
    </SafeAreaView>
  )
}

export default MessageScreen

const styles = StyleSheet.create({})