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
import { getAuth } from "firebase/auth";
import { auth } from "./fireBase";

function Home({ navigation, route }) {
  const [users, setUsers] = useState();
  // const {user}= route.params;

  const get_currentUser = async () => {
    return new Promise((resolve, reject) => {
      const currentUser = auth.currentUser;
      console.log("i amfirst",currentUser)
      if (currentUser) {
        console.log("asdasd", currentUser.uid)
        
        resolve(currentUser.uid)// Resolve with the UID of the current user
       // return(currentUser.uid)
      } else {
        reject(new Error("No user is logged in")); // Reject with an error if no user is logged in
      }
    });
  };
  //////////////////////////////
  const fetchUsers = async () => {
    try {
      // Get the current user ID
      const currentUserId = await get_currentUser();
      console.log("next :" ,currentUserId)
      //currentUserId= currentUserId
      //console.log("next 2:" ,currentUserId)
  
      // Fetch users from Firestore
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
  
      let data = [];
      querySnapshot.forEach((doc) => {
        // Assuming each document has an "email" field
        data.push({ id: doc.id, Email: doc.data().Email });
        console.log(data)
      });
  
      // Filter out the current user
      data = data.filter((i) => i.id !== currentUserId);
      console.log("myname is chiki",data)
  
      // Set the users data
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };
  
  ///////////////////////////////
  useEffect(() => {
    fetchUsers();
  }, []);

  const chat = (email) => {
    console.log(" go to chat ", { email });
    navigation.navigate("Chat_screen", { email });
  };

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
              <TouchableOpacity onPress={() => chat(item.Email)}>
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
        >
          <Text>Chat Box</Text>
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
