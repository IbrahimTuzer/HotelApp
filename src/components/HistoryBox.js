import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons"; // AntDesign silme ikonu için

const HistoryBox = ({ title, totalPrice, stayDay, image, onDelete }) => {
  // onDelete prop'u eklendi
  const formattedTitle =
    title.length > 10 ? `${title.substring(0, 10)}...` : title;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{formattedTitle}</Text>
        <View style={styles.priceContainer}>
          <MaterialIcons name="attach-money" size={18} color="#72BD39" />
          <Text style={styles.price}>{totalPrice}</Text>
          <Text style={styles.totalPriceText}>Toplam Fiyat</Text>
        </View>
        <Text style={styles.stayText}>Tatil Süresi</Text>
        <View style={styles.lengthDayContainer}>
          <Text style={styles.day}>{stayDay}</Text>
          <Text style={styles.dayText}>GÜN</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <AntDesign name="delete" size={24} color="red" />
      </Pressable>
    </View>
  );
};

export default HistoryBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    height: 150,
    backgroundColor: "#0C6968",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dolarIcon: {},
  price: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    marginRight: 5,
  },
  totalPriceText: {
    fontSize: 18,
    color: "white",
  },
  stayText: {
    fontSize: 18,
    color: "white",
  },
  lengthDayContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  dayText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  image: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    resizeMode: "cover",
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
