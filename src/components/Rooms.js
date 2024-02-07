import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Rooms = (props) => {
  const navigation = useNavigation();

  const handleSelectRoom = (selectedRoom) => {
    navigation.navigate("Reservation", { selectedRoom });
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {props.rooms.map((room, index) => (
        <View key={index} style={styles.roomContainer}>
          <View style={styles.roomContent}>
            <ImageBackground
              source={{ uri: props.roomsImage[index] }}
              style={styles.imageStyle}
            >
              <Text style={styles.defaultStyle}>{room}</Text>
            </ImageBackground>

            <Text style={styles.statement}>{props.roomsStatement[index]}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                handleSelectRoom({
                  room,
                  image: props.roomsImage[index],
                  price: props.roomsPrices[index],
                  statement: props.roomsStatement[index],
                })
              }
            >
              <Text style={styles.buttonText}>Selected Room</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  roomContainer: {
    backgroundColor: "#0C6968",
    marginRight: 15,
    marginLeft: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    width: 300,
    height: 300,
  },
  roomContent: {
    alignItems: "center",
    flex: 1,
  },
  defaultStyle: {
    color: "#FFFFFF",
    textShadowColor: "#0C6968",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontSize: 16,
    position: "absolute",
    bottom: 10,
    left: 5,
    fontWeight: "bold",
  },
  imageStyle: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
    overflow: "hidden",
  },
  statement: {
    paddingTop: 20,
    color: "white",
  },
  button: {
    marginTop: 30,
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Rooms;
