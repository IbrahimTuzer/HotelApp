import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Modal,
  FlatList,
  Image,
} from "react-native";
import { getImages } from "../../api";
import { set } from "firebase/database";

const AddHotel = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [roomOneImage, setRoomOneImage] = useState(null);
  const [roomTwoImage, setRoomTwoImage] = useState(null);
  const [roomThreeImage, setRoomThreeImage] = useState(null);
  const [roomInputs, setRoomInputs] = useState({
    room1: false,
    room2: false,
    room3: false,
  });
  const [imageSelectionContext, setImageSelectionContext] = useState(null);

  console.log("mainImage:", mainImage);
  console.log("roomOneImage:", roomOneImage);
  console.log("roomTwoImage:", roomTwoImage);
  console.log("roomThreeImage:", roomThreeImage);
  const fetchImages = async () => {
    try {
      const data = await getImages();
      setImages(data);
      console.log("images:", data);
    } catch (error) {
      console.error("Error fetching images:", error.code, error.message);
    }
  };

  const toggleRoomInput = (room) => {
    setRoomInputs((prev) => ({ ...prev, [room]: !prev[room] }));
  };

  const selectImage = (context) => {
    setImageSelectionContext(context);
    setModalVisible(true);
    fetchImages();
  };

  const handleImageSelect = (uri) => {
    switch (imageSelectionContext) {
      case "main":
        setMainImage(uri);
        break;
      case "room1":
        setRoomOneImage(uri);
        break;
      case "room2":
        setRoomTwoImage(uri);
        break;
      case "room3":
        setRoomThreeImage(uri);
        break;
      default:
        break;
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.hotelContainer}>
          <Text style={styles.label}>HOTEL NAME</Text>
          <TextInput style={styles.input} placeholder="Otel ismi giriniz" />
          <Text style={styles.label}>HOTEL ADDRESS</Text>
          <TextInput style={styles.input} placeholder="Otel adresi giriniz" />
          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              <Text style={styles.label}>HOTEL DISTRICT</Text>
              <TextInput
                style={styles.input}
                placeholder="Otel şehri giriniz"
              />
            </View>
            <View style={styles.columnContainer}>
              <Text style={styles.label}>HOTEL RATING</Text>
              <TextInput
                style={styles.input}
                placeholder="Otel puanı giriniz"
              />
            </View>
          </View>
          <Text style={styles.label}>CHOOSE HOTEL IMAGE</Text>
          <Pressable
            style={[mainImage ? styles.selectImage : styles.button]}
            onPress={() => selectImage("main")}
          >
            <Text style={styles.textButton}>Resim Seç</Text>
          </Pressable>

          {/* Room 1 */}
          <Pressable
            style={styles.roomButton}
            onPress={() => toggleRoomInput("room1")}
          >
            <Text style={styles.roomText}>Oda 1 Ekle</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#0C6968" />
          </Pressable>
          {roomInputs.room1 && (
            <View style={styles.roomContainer}>
              <Text style={styles.label}>ROOM 1 CLASS </Text>
              <TextInput
                style={styles.input}
                placeholder="Ekonomik,Standart,Lüks"
              />
              <Text style={styles.label}>ROOM 1 PRICE </Text>
              <TextInput
                style={styles.input}
                placeholder="Oda Fiyatı Giriniz"
              />
              <Text style={styles.label}>ROOM 1 STATEMENT</Text>
              <TextInput
                style={styles.input}
                placeholder="Oda açıklamsı giriniz"
              />
              <Pressable
                style={[roomOneImage ? styles.selectImage : styles.button]}
                onPress={() => selectImage("room1")}
              >
                <Text style={styles.textButton}>Oda Resmi Seç</Text>
              </Pressable>
            </View>
          )}

          {/* Room 2 */}
          <Pressable
            style={styles.roomButton}
            onPress={() => toggleRoomInput("room2")}
          >
            <Text style={styles.roomText}>Oda 2 Ekle</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#0C6968" />
          </Pressable>
          {roomInputs.room2 && (
            <View style={styles.roomContainer}>
              <Text style={styles.label}>ROOM 2 CLASS </Text>
              <TextInput
                style={styles.input}
                placeholder="Ekonomik,Standart,Lüks"
              />
              <Text style={styles.label}>ROOM 2 PRICE </Text>
              <TextInput
                style={styles.input}
                placeholder="Oda Fiyatı Giriniz"
              />
              <Text style={styles.label}>ROOM 2 STATEMENT</Text>
              <TextInput
                style={styles.input}
                placeholder="Oda açıklamsı giriniz"
              />
              <Pressable
                style={[roomTwoImage ? styles.selectImage : styles.button]}
                onPress={() => selectImage("room2")}
              >
                <Text style={styles.textButton}>Oda Resmi Seç</Text>
              </Pressable>
            </View>
          )}

          {/* Room 3 */}
          <Pressable
            style={styles.roomButton}
            onPress={() => toggleRoomInput("room3")}
          >
            <Text style={styles.roomText}>Oda 3 Ekle</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#0C6968" />
          </Pressable>
          {roomInputs.room3 && (
            <View style={styles.roomContainer}>
              <Text style={styles.label}>ROOM 3 CLASS </Text>
              <TextInput
                style={styles.input}
                placeholder="Ekonomik,Standart,Lüks"
              />
              <Text style={styles.label}>ROOM 3 PRICE </Text>
              <TextInput
                style={styles.input}
                placeholder="Oda Fiyatı Giriniz"
              />
              <Text style={styles.label}>ROOM 3 STATEMENT</Text>
              <TextInput
                style={styles.input}
                placeholder="Oda açıklamsı giriniz"
              />
              <Pressable
                style={[roomThreeImage ? styles.selectImage : styles.button]}
                onPress={() => selectImage("room3")}
              >
                <Text style={styles.textButton}>Oda Resmi Seç</Text>
              </Pressable>
            </View>
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Oda Resmi Seç</Text>
                <FlatList
                  data={images}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({ item }) => (
                    <Pressable onPress={() => handleImageSelect(item)}>
                      <Image
                        source={{ uri: item }}
                        style={styles.imageThumbnail}
                      />
                    </Pressable>
                  )}
                  numColumns={3}
                />
                <Pressable
                  style={styles.closeButton}
                  onPress={() => {
                    setModalVisible(false);
                    handleImageSelect(null);
                  }}
                >
                  <Text style={styles.textButton}>Kapat</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddHotel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  hotelContainer: {
    padding: 10,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  columnContainer: {
    flexDirection: "column",
    flex: 1,
  },
  textButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0C6968",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  roomContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  roomButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#0C6968",
  },
  roomText: {
    color: "#0C6968",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  imageThumbnail: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  selectImage: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
});
