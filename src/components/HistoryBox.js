import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const HistoryBox = (props) => {
  const title =
    props.title.length > 10
      ? `${props.title.substring(0, 10)}...`
      : props.title;
  const price = props.totalPrice;
  const day = props.stayDay;
  const image = props.image;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.priceContainer}>
          <MaterialIcons
            style={styles.dolarIcon}
            name="attach-money"
            size={18}
            color="#72BD39"
          />
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.totalPriceText}>Toplam Fiyat</Text>
        </View>
        <Text style={styles.stayText}>Tatil Süresi</Text>
        <View style={styles.lengthDayContainer}>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.dayText}>GÜN</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
      </View>
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
});
