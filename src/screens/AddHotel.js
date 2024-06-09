import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
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
  Alert,
} from "react-native";
import { createHotel, getImages, updateHotel } from "../../api";
import { useNavigation } from "@react-navigation/native";

const AddHotel = ({ route }) => {
  const [update, setUpdate] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [roomOneImage, setRoomOneImage] = useState(null);
  const [roomTwoImage, setRoomTwoImage] = useState(null);
  const [roomThreeImage, setRoomThreeImage] = useState(null);
  const [hotelName, setHotelName] = useState(null);

  const [hotelAddress, setHotelAddress] = useState(null);
  const [hotelDistrict, setHotelDistrict] = useState(null);
  const [hotelRating, setHotelRating] = useState(null);
  const [roomOne, setRoomOne] = useState({
    roomClass: null,
    roomPrice: null,
    roomStatement: null,
  });
  const [roomTwo, setRoomTwo] = useState({
    roomClass: null,
    roomPrice: null,
    roomStatement: null,
  });
  const [roomThree, setRoomThree] = useState({
    roomClass: null,
    roomPrice: null,
    roomStatement: null,
  });
  const [roomInputs, setRoomInputs] = useState({
    room1: false,
    room2: false,
    room3: false,
  });
  const [imageSelectionContext, setImageSelectionContext] = useState(null);

  useEffect(() => {
    if (route && route.params && route.params.hotel) {
      console.log("Route params:", route.params);
      setUpdate(true);
      const hotel = route.params.hotel;
      setMainImage(hotel.mainImage);
      setHotelName(hotel.name);
      setHotelAddress(hotel.address);
      setHotelDistrict(hotel.district);
      setHotelRating(hotel.rating);
      if (hotel.rooms && hotel.rooms.length > 0) {
        if (hotel.rooms[0]) {
          setRoomOne(hotel.rooms[0]);
          setRoomOneImage(hotel.rooms[0].roomImage);
          setRoomInputs((prev) => ({ ...prev, room1: true }));
        }
        if (hotel.rooms[1]) {
          setRoomTwo(hotel.rooms[1]);
          setRoomTwoImage(hotel.rooms[1].roomImage);
          setRoomInputs((prev) => ({ ...prev, room2: true }));
        }
        if (hotel.rooms[2]) {
          setRoomThree(hotel.rooms[2]);
          setRoomThreeImage(hotel.rooms[2].roomImage);
          setRoomInputs((prev) => ({ ...prev, room3: true }));
        }
      }
    }
  }, [route]);
  useEffect(() => {
    fetchImages();
  }, []);

  const isFormValid = () => {
    return (
      hotelName &&
      hotelAddress &&
      hotelDistrict &&
      hotelRating &&
      mainImage &&
      roomOne.roomClass &&
      roomOne.roomPrice &&
      roomOne.roomStatement &&
      roomOneImage &&
      roomTwo.roomClass &&
      roomTwo.roomPrice &&
      roomTwo.roomStatement &&
      roomTwoImage &&
      roomThree.roomClass &&
      roomThree.roomPrice &&
      roomThree.roomStatement &&
      roomThreeImage
    );
  };

  const sendHotelData = async (isEdit) => {
    if (!isFormValid()) {
      Alert.alert("Eksik Alanlar", "Lütfen tüm alanları doldurun.");
      return;
    }

    const hotelData = {
      name: hotelName,
      address: hotelAddress,
      district: hotelDistrict,
      rating: hotelRating,
      mainImage: mainImage,
      rooms: [
        {
          roomClass: roomOne.roomClass,
          roomPrice: roomOne.roomPrice,
          roomStatement: roomOne.roomStatement,
          roomImage: roomOneImage,
        },
        {
          roomClass: roomTwo.roomClass,
          roomPrice: roomTwo.roomPrice,
          roomStatement: roomTwo.roomStatement,
          roomImage: roomTwoImage,
        },
        {
          roomClass: roomThree.roomClass,
          roomPrice: roomThree.roomPrice,
          roomStatement: roomThree.roomStatement,
          roomImage: roomThreeImage,
        },
      ],
    };

    try {
      if (isEdit) {
        const hotelId = route.params.hotel.id; // hotelId'yi alın
        if (!hotelId) throw new Error("Hotel ID is missing");
        await updateHotel(hotelId, hotelData); // Güncelleme işlevi
        console.log("Hotel updated:");
      } else {
        await createHotel(hotelData); // Oluşturma işlevi
        console.log("Hotel created:");
      }
      navigation.navigate("AdminDashboard");
    } catch (error) {
      console.error("Error sending hotel data:", error.code, error.message);
    }
  };

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
          <TextInput
            style={styles.input}
            placeholder="Otel ismi giriniz"
            value={hotelName}
            onChangeText={setHotelName}
          />
          <Text style={styles.label}>HOTEL ADDRESS</Text>
          <TextInput
            style={styles.input}
            placeholder="Otel adresi giriniz"
            value={hotelAddress}
            onChangeText={setHotelAddress}
          />
          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              <Text style={styles.label}>HOTEL DISTRICT</Text>
              <TextInput
                style={styles.input}
                placeholder="Otel şehri giriniz"
                value={hotelDistrict}
                onChangeText={setHotelDistrict}
              />
            </View>
            <View style={styles.columnContainer}>
              <Text style={styles.label}>HOTEL RATING</Text>
              <TextInput
                style={styles.input}
                placeholder="Otel puanı giriniz"
                value={hotelRating}
                onChangeText={setHotelRating}
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
                value={roomOne.roomClass}
                onChangeText={(text) =>
                  setRoomOne((prev) => ({ ...prev, roomClass: text }))
                }
              />
              <Text style={styles.label}>ROOM 1 PRICE </Text>
              <TextInput
                style={styles.input}
                placeholder="Oda Fiyatı Giriniz"
                value={roomOne.roomPrice}
                onChangeText={(text) =>
                  setRoomOne((prev) => ({ ...prev, roomPrice: text }))
                }
              />
              <Text style={styles.label}>ROOM 1 STATEMENT</Text>
              <TextInput
                style={styles.input}
                placeholder="Oda açıklamsı giriniz"
                value={roomOne.roomStatement}
                onChangeText={(text) =>
                  setRoomOne((prev) => ({ ...prev, roomStatement: text }))
                }
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
                value={roomTwo.roomClass}
                onChangeText={(text) =>
                  setRoomTwo((prev) => ({ ...prev, roomClass: text }))
                }
              />
              <Text style={styles.label}>ROOM 2 PRICE </Text>
              <TextInput
                style={styles.input}
                placeholder="Oda Fiyatı Giriniz"
                value={roomTwo.roomPrice}
                onChangeText={(text) =>
                  setRoomTwo((prev) => ({ ...prev, roomPrice: text }))
                }
              />
              <Text style={styles.label}>ROOM 2 STATEMENT</Text>
              <TextInput
                style={styles.input}
                placeholder="Oda açıklamsı giriniz"
                value={roomTwo.roomStatement}
                onChangeText={(text) =>
                  setRoomTwo((prev) => ({ ...prev, roomStatement: text }))
                }
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
                value={roomThree.roomClass}
                onChangeText={(text) =>
                  setRoomThree((prev) => ({ ...prev, roomClass: text }))
                }
              />
              <Text style={styles.label}>ROOM 3 PRICE </Text>
              <TextInput
                style={styles.input}
                placeholder="Oda Fiyatı Giriniz"
                value={roomThree.roomPrice}
                onChangeText={(text) =>
                  setRoomThree((prev) => ({ ...prev, roomPrice: text }))
                }
              />
              <Text style={styles.label}>ROOM 3 STATEMENT</Text>
              <TextInput
                style={styles.input}
                placeholder="Oda açıklamsı giriniz"
                value={roomThree.roomStatement}
                onChangeText={(text) =>
                  setRoomThree((prev) => ({ ...prev, roomStatement: text }))
                }
              />
              <Pressable
                style={[roomThreeImage ? styles.selectImage : styles.button]}
                onPress={() => selectImage("room3")}
              >
                <Text style={styles.textButton}>Oda Resmi Seç</Text>
              </Pressable>
            </View>
          )}

          <Pressable
            style={[
              styles.sendButton,
              { backgroundColor: isFormValid() ? "#0C6968" : "#ccc" },
            ]}
            onPress={() => sendHotelData(route.params.isEdit)}
            disabled={!isFormValid()}
          >
            <Text style={styles.textSendButton}>
              {route.params.isEdit ? "GÜNCELLE" : "OLUŞTUR"}
            </Text>
          </Pressable>

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
  sendButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  textSendButton: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
