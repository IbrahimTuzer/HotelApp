import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";
import Rooms from "../components/Rooms";

const Detail = ({ navigation, route }) => {

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.headerContainer}>
        <Image
          style={styles.logoImage}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/images%2Fhotel_findr_logo.png?alt=media&token=f90f0d66-4ba5-49fa-a559-92486516ac24",
          }}
        />
      </View>

      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.hotelImage}
          source={{ uri: route.params.data.mainImage }}
          imageStyle={{ borderRadius: 20, overflow: "hidden" }}
        >
          <Text style={styles.nameText}>{route.params.data.name}</Text>
        </ImageBackground>
      </View>

      <View style={styles.adressRatinContainer}>
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.map} source={require("../../assets/map.png")} />
          <Text>{route.params.data.district}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.star}
            source={require("../../assets/star.png")}
          />
          <Text>{route.params.data.rating}</Text>
        </View>
      </View>

      <Text style={styles.roomsHeader}>Rooms</Text>

      <View style={styles.roomsContainer}>
        <Rooms 
        rooms={route.params.data.rooms}
        roomsImage={route.params.data.roomsImage}
        roomsPrices={route.params.data.roomsPrices}
        roomsStatement={route.params.data.roomsStatement}
        roomsData={route.params.data}

        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 200,
    height: 96,
    resizeMode: "cover",
  },
  imageContainer: {
    width: "90%",
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  hotelImage: {
    width: "100%",
    height: "100%",
  },
  nameText: {
    marginTop: 160,
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#0C6968",
    
  },
  adressRatinContainer: {
    flex: 1,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "space-between",
  },
  map: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  star: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: "orange",
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  roomsHeader: {
    width: "90%",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  roomsContainer: {
    flex: 5,
    width: "100%",
    justifyContent: "center",
 alignItems: "center",}
});

export default Detail;
