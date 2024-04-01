import React, { useState } from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createHotel } from "../../api"; // createHotel fonksiyonunun yolu sizin proje yapınıza göre değişiklik gösterebilir
import PickImageModal from "../components/PickImageModal";

const AdminDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [hotelData, setHotelData] = useState({
    address: "",
    district: "",
    mainImage: "",
    name: "",
    rating: "",
    rooms: [],
  });
  console.log("hotelData:", hotelData.mainImage);

  const handleSelectedImage = (imageUrl) => {
    setHotelData((prevState) => ({
      ...prevState,
      mainImage: imageUrl,
    }));
  };

  const handleOpenModal = () => {
    setModalVisible(true); // Modalı görünür hale getir
  };

  const handleInputChange = (name, value) => {
    setHotelData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoomChange = (index, name, value) => {
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[index] = { ...updatedRooms[index], [name]: value };
    setHotelData({ ...hotelData, rooms: updatedRooms });
  };

  const addRoom = () => {
    setHotelData((prevState) => ({
      ...prevState,
      rooms: [
        ...prevState.rooms,
        { name: "", image: "", price: "", statement: "" },
      ],
    }));
  };

  const handleSubmit = async () => {
    await createHotel(hotelData);
    // Gönderme işlemi başarılı olduktan sonra formu temizleyebilir veya başka bir işlem yapabilirsiniz.
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin Panele Hoş Geldiniz</Text>
      </View>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <TextInput
          style={styles.input}
          placeholder="Adres"
          value={hotelData.address}
          onChangeText={(text) => handleInputChange("address", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="İlçe"
          value={hotelData.district}
          onChangeText={(text) => handleInputChange("district", text)}
        />
        <TouchableOpacity onPress={handleOpenModal}>
          <Text style={styles.inputImage}>
            {hotelData.mainImage ? (
              <View style={styles.imageCont}>
                <Image
                  source={{ uri: hotelData.mainImage }}
                  style={{
                    width: 200,
                    height: 100,

                    resizeMode: "contain",
                  }}
                />
              </View>
            ) : (
              "Ana Resim Seçiniz"
            )}
          </Text>
          <PickImageModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onImageSelected={handleSelectedImage}
            // Ana resmin URL'sini almak için callback fonksiyonunu prop olarak iletiyoruz
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Otel Adı"
          value={hotelData.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Puan"
          value={hotelData.rating}
          onChangeText={(text) => handleInputChange("rating", text)}
          keyboardType="numeric"
        />

        {/* Odaları Yönetmek için UI */}
        {hotelData.rooms.map((room, index) => (
          <View key={index} style={styles.roomContainer}>
            <TextInput
              style={styles.input}
              placeholder="Oda Adı"
              value={room.name}
              onChangeText={(text) => handleRoomChange(index, "name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Oda Resmi URL"
              value={room.image}
              onChangeText={(text) => handleRoomChange(index, "image", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Oda Fiyatı"
              value={room.price}
              keyboardType="numeric"
              onChangeText={(text) => handleRoomChange(index, "price", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Oda Açıklaması"
              value={room.statement}
              onChangeText={(text) =>
                handleRoomChange(index, "statement", text)
              }
            />
          </View>
        ))}
        <Button title="Yeni Oda Ekle" onPress={addRoom} />
        <Button title="Gönder" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#0C6968",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  headerText: {
    color: "white",
    fontSize: 24,
  },
  containerScroll: {
    padding: 10,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  roomContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  imageCont: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputImage: {
    height: 105,
    marginVertical: 1,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    margin: 1,
    paddingTop: 10,
  },
});
