import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from '@rneui/themed'
import { db, auth } from '../firebaseConfig'

const CustomeListItems = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );

      return unsubscribe;
  }, [])

  return (
    <View key={id}>
      <ListItem onPress={() => enterChat(id, chatName)} bottomDivider>
        <Avatar
          rounded
          source={{
            uri: chatMessages?.[0]?.photoURL || 
              'https://i.pinimg.com/originals/ec/61/d3/ec61d3114cc5269485d508244f531bdf.png'
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: '600'}}>
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  )
}

export default CustomeListItems

const styles = StyleSheet.create({})