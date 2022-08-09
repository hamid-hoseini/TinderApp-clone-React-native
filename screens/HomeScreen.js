import { Avatar } from '@rneui/base'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import CustomeListItems from '../components/CustomeListItems'
import { db, auth } from '../firebaseConfig'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-react-native-classnames';
import Swiper from 'react-native-deck-swiper'

const HomeScreen = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation();
  const { user, logOut } = useAuth();
  const swipeRef = useRef();
  const [profiles, setProfiles] = useState([]);

useLayoutEffect(() => 
  db.collection("Users").onSnapshot((snapshot) => {
    if (!snapshot.docs.length) {
      navigation.navigate('Modal');
    }
  }), []);

  useEffect(() => {
    let unsibscribe;    
    const fetchCards = async () => {
      unsibscribe = db.collection("Users").onSnapshot((snapshot) => {
        setProfiles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
        );
        });
      }
      
      fetchCards();
      setIsLoading(false);
      return unsibscribe;
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
    <SafeAreaView style={tw`flex-1`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={logOut}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{ uri: user?.photoURL ? user?.photoURL : 'https://i.pinimg.com/originals/ec/61/d3/ec61d3114cc5269485d508244f531bdf.png' }} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image style={tw`h-14 w-14`} source={require("../assets/logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles-sharp" size={30} />
        </TouchableOpacity>
      </View>
      {/* End of Header */}
      
      {/* Cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Swiper 
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => {

          }}
          onSwipedRight={() => {

          }}
          overlayLabels={{
            left: {
              title: "Nope",
              style: {
                label: {
                  textAlign: "right",
                  color: "red"
                }
              }
            },
            right: {
              title: "Match",
              style: {
                label: {
                  color: "#4ded30"
                }
              }
            }
          }}
          renderCard={(card) => card ? (
            <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`}>
              <Image 
                style={tw`absolute top-0 h-full w-full rounded-xl`}
                source={{ uri: card.photoURL}} />
              <View style={[tw`absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl`, styles.cardShadow]}>
                <View>
                  <Text style={tw`text-xl font-bold`}>{card.firstName} {card.lastName}</Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
              </View>
            </View>

          ) : (
            <View
              style={[
                tw`relative bg-white h-3/4 rounded-xl justify-center items-center`, styles.cardShadow
              ]}
            >
              <Text style={tw`font-bold pb-5`}>No more profiles</Text>
              <Image style={tw`h-20 w-full`}
                height={100}
                width={100}
                source={{ uri: 'https://dikpora.jogjaprov.go.id/web_lama/assets/images/icon/no_data.png'}}
              />
            </View>
          )}
        />
      </View>
      {/* End of Cards */}
      <View style={tw`flex flex-row justify-evenly`}>
          <TouchableOpacity 
            onPress={() => swipeRef.current.swipeLeft()}
            style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`}>
            <Entypo name="cross" size={24} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => swipeRef.current.swipeRight()}
            style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`}>
            <AntDesign name="heart" size={24} />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41
  }
})