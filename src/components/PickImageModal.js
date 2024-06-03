import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  FlatList,
} from "react-native";
import { storage } from "../../firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const PickImageModal = ({
  modalVisible,
  setModalVisible,
  onImageSelected,
  selectedRoomIndex,
}) => {
  const [images, setImages] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  // Firebase Storage'dan resimleri al
  const fetchImages = async () => {
    try {
      const storageRef = ref(storage, "images/");
      const listResult = await listAll(storageRef);
      const urls = await Promise.all(
        listResult.items.map((itemRef) => getDownloadURL(itemRef))
      );
      setImages(urls);
    } catch (error) {
      console.error("Error fetching images:", error.code, error.message);
    }
  };

  // Bir resme tıklandığında seçilen resmin URL'sini saklayan fonksiyon
  const handleImagePress = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };

  // Resmi seç butonuna basıldığında seçilen resmin URL'sini başka bir bileşene aktaran fonksiyon
  const handleSelectImage = () => {
    console.log("selectedImageUrl:", selectedImageUrl);
    setModalVisible(!modalVisible);
    if (selectedImageUrl) {
      onImageSelected(selectedImageUrl);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      fetchImages();
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="none"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Resimleri Listele Burada</Text>
          <FlatList
            data={images}
            numColumns={2}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleImagePress(item)}>
                <Image source={{ uri: item }} style={styles.image} />
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Vazgeç</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleSelectImage}
            >
              <Text style={styles.textStyle}>Resmi Seç</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginRight: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "gray",
    resizeMode: "contain",
  },
});

export default PickImageModal;
