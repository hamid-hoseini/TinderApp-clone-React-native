import { Avatar } from '@rneui/base'
import { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomeListItems from '../components/CustomeListItems'
import { db, auth } from '../firebaseConfig'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation();
  const { logOut } = useAuth();

useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      );
      // console.log(chats)


      // snapshot.docs.map((doc) => (
      //   console.log(doc.data())
      // ))
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const signOut = () => {
    logOut().then(() => {
      navigation.navigate('Login');
    })
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL ? auth?.currentUser?.photoURL : 'https://i.pinimg.com/originals/ec/61/d3/ec61d3114cc5269485d508244f531bdf.png' }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.iconsContainer}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' color="black" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
            <SimpleLineIcons name='pencil' color="black" size={24} />
          </TouchableOpacity>
        </View>
      )
    });
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName
    })
  }

  if (isLoading) {
    //console.log('test');
    return <SafeAreaView>
      <Text>
        Loading...
      </Text>
    </SafeAreaView>
  }

  return (
    <SafeAreaView>
      <ScrollView>
        { chats.map(({id, data: {chatName}}) => (
          <CustomeListItems 
            key={id} 
            id={id} 
            chatName={chatName}
            enterChat={enterChat}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginRight: 20
  }
})