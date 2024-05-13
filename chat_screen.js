import { View,Text,TouchableOpacity,StyleSheet } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'

function Chat_screen({navigation,route}) {
  const [messages, setMessages] = useState([])
  const {email} =route.params;



  useEffect(() => {
    console.log(email)
    setMessages([
      {
        _id: 1,
        text: 'Hello',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
    ])
  }, [])

  const onSend =messageArray => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messageArray),
    )
  }
  
  return (
    <GiftedChat style={{flex:1,backgroundColor:'yellow'}}
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
    renderBubble={prpos=>{
      return(
        <Bubble
        {...prpos}
        wrapperStyle={{right:{backgroundColor:'pink'}}}
        />
      )
    }}
  />


  )
}

export {Chat_screen};