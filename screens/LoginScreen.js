import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Input, Image, ThemeProvider } from '@rneui/themed'
import { Button } from '@rneui/base'
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';

const LoginScreen = () => {
  // const { signInWithGoogle } = useAuth();
  // const { user } = useAuth();
  const [name, setName]= useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((authUser) => {
    //   console.log(authUser);
    //   if (authUser) {
    //     navigation.replace('Home');
    //   }
    // });

    // return unsubscribe;
  }, []);

  const logIn = async () => {
    try {
      setError("");
      await signIn(email, password);
      navigation.navigate('Home');
    } catch (err) {
      setError(err.message);
    }
  }
  // const logIn = () => {
  //   return;
  // }

  // const signIn = () => {
  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .catch(err => alert(err));

  // }

  
  return (
    // <View>
    //   <Text>Welcome { user }!</Text>
    //   <Button title="login" onPress={signInWithGoogle} />
    // </View>
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image 
        source={{uri: 'https://mobileappsshowdown.com/wp-content/uploads/2020/07/Tinder.jpg'}} 
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <Input autoFocus
          placeholder='Email'
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input secureTextEntry
          placeholder='Password' 
          type="password"  
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={logIn}
        />
      </View>
      <Button raised containerStyle={styles.button} onPress={logIn} title="Sign In" />
      <Button containerStyle={styles.button} type="link" onPress={() => navigation.navigate('Register')} title="Register" />
      <View style={{ height: 150}} />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  image: {
    width: 120, 
    height: 120
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white'
  },
  button: {
    width: 200,
    marginTop: 10,
    borderRadius: 10
  },
  inputContainer: {
    width: 300
  }
})