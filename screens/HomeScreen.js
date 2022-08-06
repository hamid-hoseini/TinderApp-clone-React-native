import { Avatar } from '@rneui/base'
import { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import CustomeListItems from '../components/CustomeListItems'
import { db, auth } from '../firebaseConfig'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-react-native-classnames';

const HomeScreen = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation();
  const { user, logOut } = useAuth();

useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      );
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  // const signOut = () => {
  //   logOut().then(() => {
  //     navigation.navigate('Login');
  //   })
  // };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
    })
    
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
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={logOut}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{ uri: user?.photoURL ? user?.photoURL : 'https://i.pinimg.com/originals/ec/61/d3/ec61d3114cc5269485d508244f531bdf.png' }} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Image style={tw`h-14 w-14`} source={require("../assets/logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles-sharp" size={30} />
        </TouchableOpacity>
      </View>
      {/* End of Header */}
      <ScrollView>
        <Text>Here is Home</Text>
        {/* { chats.map(({id, data: {chatName}}) => (
          <CustomeListItems 
            key={id} 
            id={id} 
            chatName={chatName}
            enterChat={enterChat}/>
        ))} */}
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