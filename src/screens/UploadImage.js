import React, { useState } from "react";
import {
  Button,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    setImage(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
      const uploadURL = uploadMedia(result.assets[0].uri);
      setImage(uploadURL);
    } else {
      Alert.alert("Uyarı", "Resim seçme işlemi iptal edildi.");
    }
  };

  const uploadMedia = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(storage, `images/image-${Date.now()}`);
      const result = await uploadBytes(storageRef, blob);
      blob.close();
      Alert.alert("Başarılı", "Resim yükleme işlemi başarılı.");
      return await snapshot.ref.getDownloadURL(storageRef);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Resim Seç ve Yükle</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  imageContainer: {
    marginVertical: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default UploadImage;
