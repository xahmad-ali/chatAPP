import React, { useEffect, useState } from 'react';
import { Button, Image, View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from "@react-navigation/native";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc,onSnapshot } from "firebase/firestore"; 

function Uploads() {
  //const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showImage, SetShowImage] = useState(null);

  const route = useRoute();
  const storage = getStorage();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      SetShowImage(result.assets[0].uri);
      on_fireStore(result.assets[0].uri); // Pass the uri to the on_fireStore function
    }
  };

  const on_fireStore = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob(); //converts in binary

    const storageRef = ref(storage, "Stuff/" +""+route.params.senderId, new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
            console.log(error)
            Alert.alert('Error', 'There was an error uploading the image.');
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL)
                setUploading(true)
            });
        }
    );
};

    const fetch_firestore=async()=>{
        try {
            // Create a reference to the image in Firebase Storage
            const storageRef = ref(storage, `Stuff/${route.params.senderId}`);
    
            // Get the download URL of the image
            const downloadURL = await getDownloadURL(storageRef);
    
            // Return the download URL
            return downloadURL;
        } catch (error) {
            // Handle any errors that occur during the process
            console.error('Error retrieving image download URL:', error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const downloadURL = await fetch_firestore();
                console.log('Image download URL:', downloadURL);
                SetShowImage(downloadURL);
                console.log('Image fetched successfully');
            } catch (error) {
                console.error('Error:', error);
                Alert.alert('Error', 'Failed to retieve image.');
            }
        };

        fetchImage();
    }, [SetShowImage]);





  return (
    <View style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          style={{ padding: 10, backgroundColor: 'plum', borderRadius: 10 }}
          onPress={pickImage}
        >
          <Text>Pick Image</Text>
        </TouchableOpacity>
      </View>


      <View style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}>
            <Text>Uploaded</Text>
            {showImage && (
                <Image source={{ uri: showImage }} style={{ width: 100, height: 100 }} />
            )}
        </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
});

export { Uploads };
