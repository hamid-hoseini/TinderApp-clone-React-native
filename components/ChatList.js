import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import useAuth from '../hooks/useAuth';
import ChatRow from './ChatRow';
import { db } from '../firebaseConfig';
import tw from 'tailwind-react-native-classnames';

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    let unsibscribe;   
    const fetchMatched = async () => {
      unsibscribe = await db.collection("Matches")
        .where('userMatched', 'array-contains', user.uid)
        .get()
        .then((snapshot) => {
          // setMatches(
          //     snapshot.docs.map((doc) => ({
          //       id: doc.id,
          //       ...doc.data()
          //     }))
          //   );
          setMatches( snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
              }))
          );
             //setMatches((prevData) => [...prevData, ...matched]);
             
          setIsLoading(false);
            
          }
        ).catch ((error) => {
          alert(error);
        });

      }
      fetchMatched();
    return unsibscribe;
  }, [])

  const setValue = (data) => {
    //setMatches((data) => [...data);
  }

  if (isLoading) {
    return <SafeAreaView>
      <Text>
        Loading...
      </Text>
    </SafeAreaView>
  }

  // return (
  //   <View>
  //     <Text>done!</Text>
  //   </View>
  // )
  return matches.length > 0 ? (
    <FlatList
      style={tw`h-full`}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => {
        //console.log(item);
        return <ChatRow matchDetails={item} />}
      }
    />
  ) 
  : (
    <View style={tw`p-5`}>
      <Text style={tw`text-center text-lg`}>No Matches at the moment!</Text>
    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({})