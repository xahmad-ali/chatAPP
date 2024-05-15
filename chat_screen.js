import React, { useState, useEffect,useCallback } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./fireBase.js"; // Assuming you have already set up Firebase in "fireBase.js"

function Chat_screen() {
  const route = useRoute();
  const [messages, setMessages] = useState([]);



  useEffect(() => {
    let unsubscribe; // Declare unsubscribe variable outside the try block
  
    
        const q = query(
          collection(db, 'chats', "" + route.params.senderId + route.params.reciverId, 'messages'),
          orderBy('createdAt', 'desc')
        );
  
        // Subscribe to real-time updates using onSnapshot
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const allMessages = querySnapshot.docs.map(doc => {
            return { ...doc.data(), createdAt: Date.parse(new Date()) }
          });  

          setMessages(allMessages);
        
        
        });
        
    
  return()=> unsubscribe();
   
  }, []);
  
  ////////////////////
  const onSend = useCallback(async(messageArray = []) => {
    console.log(messageArray);
    const msg = messageArray[0];
    const Mymsg = {
      ...msg,
      sendBy: route.params.senderId,
      reciverId: route.params.reciverId,
      createdAt: Date.parse(msg.createdAt)
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, Mymsg)
    );

    console.log(Mymsg);

    try {
      await addDoc(
        collection(
          db,
          "chats",
          "" + route.params.senderId + route.params.reciverId,
          "messages"
        ),
        {
          ...Mymsg
        }
      );

      await addDoc(
        collection(
          db,
          "chats",
          "" + route.params.reciverId + route.params.senderId,
          "messages"
        ),
        {
          ...Mymsg
        }
        
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, []);

 



  ////////////////////////////////////////////////
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{ right: { backgroundColor: "pink" } }}
      />
    );
  };

  /////////////////////////
  return (
    <GiftedChat
      style={{ flex: 1, backgroundColor: "yellow" }}
      messages={messages}
      onSend={onSend}
      user={{
        _id: route.params.senderId,
      }}
      renderBubble={renderBubble}
    />
  );
}

export { Chat_screen };
