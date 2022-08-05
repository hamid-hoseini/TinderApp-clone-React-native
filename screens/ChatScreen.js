import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, TextInput, ScrollView, StatusBar, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/base'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import firebase from 'firebase/compat/app';
import { db, auth } from '../firebaseConfig'


const ChatScreen = ({ navigation, route}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "center",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center"}}>
          <Avatar rounded source={{ uri: "https://i.pinimg.com/originals/ec/61/d3/ec61d3114cc5269485d508244f531bdf.png"}}/>
          <Text style={{marginLeft: 10, fontWeight: "700"}}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity 
          style={{ marginLeft: 10}}
          onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 60,
          marginRight: 10
        }}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation, messages])

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      ));

      return unsubscribe;
  }, [route])

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    });

    setInput("");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
      <StatusBar style="light"/>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height" }
        style={styles.container}
        keyboardVerticalOffset={60}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) => 
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar 
                      position="absolute"
                      rounded
                      //WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5
                      }}
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{
                        uri: data.photoURL ? data.photoURL : 'https://i.pinimg.com/originals/ec/61/d3/ec61d3114cc5269485d508244f531bdf.png'
                      }}
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar 
                      position="absolute"
                      rounded
                      //WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5
                      }}
                      bottom={-15}
                      left={-5}
                      size={30}
                      source={{
                        uri: data.photoURL ? data.photoURL : 'https://i.pinimg.com/originals/ec/61/d3/ec61d3114cc5269485d508244f531bdf.png'
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput 
                placeholder='Signal Message' 
                style={styles.textInput}
                value={input}
                onChangeText ={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative"

  },
  sender: {
    padding: 15,
    backgroundColor: "#2b68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative"
  },
  senderText: {
    marginLeft: 10,
    marginBottom: 15,
    fontWeight: "500",
    color: "white"
  },
  receiverText: {
    marginLeft: 10,
    fontWeight: "500",
    color: "black"
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white"
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "gray",
    borderRadius: 30
  }
})