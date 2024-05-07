import React from 'react'
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native'


function Home({navigation}) {

  const chat=()=>{
    navigation.navigate("chat_screen")
  };

  return (
    <View style={styles.container}>

    <View style={{padding:10,justifyContent:'space-evenly'}}>
    <Text>Welcome to home</Text>
    </View>

<View >
<TouchableOpacity style={{padding:20,borderRadius:15,backgroundColor:'plum'}}
onPress={chat}>
  <Text>chat box </Text>
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

export {Home};