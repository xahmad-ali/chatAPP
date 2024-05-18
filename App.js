import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './home.js';
import { Chat_screen } from './chat_screen.js'
import { Uploads } from './Uploads.js';
import { auth,db,app } from './fireBase.js';
import { addDoc, collection } from "firebase/firestore"; 

import {signInAnonymously,signInWithEmailAndPassword,
  createUserWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';


const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Logs" component={Logs} options={headerShown=true} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Uploads" component={Uploads}/>
        <Stack.Screen name="Chat_screen" component={Chat_screen}/>

      </Stack.Navigator>
    </NavigationContainer>
   

  );
}



function Logs({navigation}) {

  const [password, setPassword] = useState('');
const [email, setEmail] = useState('');

const handleSignUp = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth,email, password);
    const user = userCredential.user;
    
    console.log("User signed up:", user);

       // Add user data to Firestore
       const usersCollectionRef = collection(db, "users"); // Get reference to 'users' collection
       const docRef = await addDoc(usersCollectionRef, { // Pass collection reference to addDoc
         Email: email
       })
    console.log("Document written with ID:", docRef.id)
    tohome(user);
    
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};


  const tohome=(user)=>{
    navigation.navigate("Home",{user})
  }

  const handleLogin=async()=>{
    try {const userCredential=await signInWithEmailAndPassword(auth,email,password);
      const user= userCredential.user
      console.log("User logged in :",user);
      tohome(user);
     
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
