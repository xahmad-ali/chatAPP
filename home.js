import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./fireBase";
import { auth } from "./fireBase";


function Home({ navigation }) {
  const [users, setUsers] = useState();
  const [senderId,setSenderId] = useState();
  // const {user}= route.params;
  

 // Function to get the current user's ID
const get_currentUser = async () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      console.log("from getUser:->",currentUser.email)
      console.log("Current user id->",currentUser.uid)
      resolve(currentUser.email); // Resolve with the UID of the current user
    } else {
      reject(new Error("No user is logged in")); // Reject with an error if no user is logged in
    }
  })
};
  //////////////////////////////
  const fetchUsers = async () => {
    try {
      // Get the current user ID
      const currentUserEmail = await get_currentUser();
      console.log("Current Usser email:", currentUserEmail);
    
      // Fetch users from Firestore
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
  
      let data = [];
      querySnapshot.forEach((doc) => {
        // Assuming each document has an "id" field representing the UID
        data.push({ id: doc.id, Email: doc.data().Email });
      });
      console.log("Before filter ",data)
      // Filter out the current user
      
     // data = data.filter((user) => user.Email !== currentUserEmail);
      // Filter out the current user and capture the filtered out user's ID
      data = data.filter((user) => {
        if (user.Email === currentUserEmail) {
          filteredOutUserId = user.id;
          return false;
        }
        return true;
      });
  
      setSenderId(filteredOutUserId)
      console.log("Filtered out user ID:", filteredOutUserId);
  
      // Log filtered users
      console.log("Filtered Users:", data);
  
      // Set the users data (assuming you have a function setUsers to do this)
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };
  
  ///////////////////////////////
  useEffect(() => {
    fetchUsers();
  }, []);

  const chat = (Remail,Rid,senderId) => {
    console.log(" go to chat ", { Remail,Rid,senderId, });
    navigation.navigate("Chat_screen", {reciverId:Rid,senderId:senderId });
  };

  const go_upload=()=>{
    navigation.navigate("Uploads",{senderId});
  }

  return (
    <View>
      <View style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}>
        <FlatList
          style={{
            //  flex:.5,
            flexDirection: "row",
            borderRadius: 20,
            padding: 30,
            backgroundColor: "plum",
            margin: 20,
            //alignContent:'flex-start'
            alignSelf: "auto",
          }}
          data={users}
          renderItem={({ item }) => (
            <View style={{ padding: 15, borderColor: "black" }}>
              <TouchableOpacity onPress={() => chat(item.Email,item.id,senderId)}>
                <Text style={{ fontSize: 30 }}>{item.Email}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
        />
      </View>

      <View style={{ padding: 30, alignSelf: "center" }}>
        <TouchableOpacity
          style={{ padding: 20, borderRadius: 15, backgroundColor: "plum" }}
          onPress={go_upload}
        >
          <Text>uploads</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  userContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export { Home };
