# Tinder 2.0 clone with REACT NATIVE
  A copy of the Tinder app to learn and improve coding skills with the React Native platform.

## What I have learned in this project are:

  1. Context api to provide a way to share values (global variables) like user info after authentication between components without having to explicitly pass a prop through every level of the tree.
  2. Custom Hook: When we have component logic that needs to be used by multiple components, we can extract that logic to a custom Hook
  3. Higher Order Component (HOC) is an advanced technique in React for reusing component logic. They are a pattern that emerges from React's compositional nature. Concretely, a higher-order component is a function that takes a component and returns a new component. [Read more...](https://reactjs.org/docs/higher-order-components.html)
  4. Using Environment variables and setup 
  5. Firebase authentication and sign in & sign up using email and password

  ## Dependencies
  - Tailwind React Native Classnames [link](https://www.npmjs.com/package/tailwind-react-native-classnames)
  - React Navigation [link](https://reactnavigation.org/)
  - React Native Safe Area Context [link](https://reactnavigation.org/)
  - React Navigation Native [link](https://reactnavigation.org/)
  - React Native Screens
  - Native Stack Navigator [link](https://reactnavigation.org/docs/hello-react-navigation)
  - Expo Google App Auth [link](https://www.npmjs.com/package/expo-google-app-auth)
  - React Native Dotenv [link](https://www.npmjs.com/package/react-native-dotenv)


Note 1: 
  let's use expo to install: 
  - react-native-screens 
  - react-native-safe-area-context
  - firebase

Note 2:
  By using React Native Dotenv to protect important keys we need to configure `babe.config.js` but it will run into issues. So to resolve the issues read: [link](https://github.com/goatandsheep/react-native-dotenv#caveats) 

## React Context Example

> Use react context and create custom Hook
```jsx
const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{
      user: "Hamid"
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}
```

> The way to use custom Hook

```jsx
const LoginScreen = () => {

  const { user } = useAuth();

  return (
    <View>
      <Text>Welcome { user }!</Text>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})
```


### Supported platform

- Ios
- Android