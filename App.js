import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './home.js';
import { chat_screen } from './chat_screen.js';
import { auth } from './fireBase.js';

import {signInAnonymously,signInWithEmailAndPassword,
  createUserWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';


const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Logs" component={Logs} options={headerShown=true} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="chat_screen" component={chat_screen}/>

      </Stack.Navigator>
    </NavigationContainer>
   

  );
}



function Logs({navigation}) {

  const [password,setPassword] = useState();
  const [email,setEmail] = useState();


  
  const handleSignUp=async()=>{
    try { await createUserWithEmailAndPassword(auth,email,password)
      .then((userCredss)=>{
        const user=userCredss.user
        console.warn(user)
      })
      
    } catch (error) {
      console.error(error);
    }
  };

  const tohome=()=>{
    navigation.navigate("Home")
  }

  const handleLogin=async()=>{
    try {await signInWithEmailAndPassword(auth,email,password)
      .then((userCred)=>{
        const user=userCred.user
        console.warn(user)
        tohome()
      })
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('User does not exist. Please sign up.');
      } else if (error.code === 'auth/wrong-password') {
        console.log('Incorrect email or password.');
      } else {
        console.error(error);
      } 
    }
  };

  


  return (
    <View style={styles.container}>

    <View style={{padding:10,justifyContent:'space-evenly'}}>
    <Text>Welcome to login</Text>
    </View>


    <View style={{padding:10}}>
    <TextInput
    style={{backgroundColor:'pink',height:40,width:300,borderRadius:20,paddingLeft:10}}
    placeholder='user Name '
    value={email}
    onChangeText={setEmail}
    />
    </View>

    <View style={{padding:10}}>
    <TextInput
    style={{backgroundColor:'pink',height:40,width:300,borderRadius:20,paddingLeft:10}}
    placeholder='password'
    value={password}
    onChangeText={setPassword}
    />
    </View>

    <View style={{padding:10}}>
    <TouchableOpacity style={{padding:10,backgroundColor:'plum',borderRadius:10}}
    onPress={handleLogin}>
      <Text>login</Text>
    </TouchableOpacity>
    </View>

    <View style={{padding:10}}>
    <TouchableOpacity style={{padding:10,backgroundColor:'plum',borderRadius:10}}
    onPress={handleSignUp}>
      <Text>Sign  up</Text>
    </TouchableOpacity>
    </View>
    
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'light-grey',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
