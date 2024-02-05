import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import Filter from "../components/Filter";
import { getData } from "../../api";
import Hotels from "../components/Hotels";

const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [hotels, setHotels] = useState([]);

  const filterHotels = () => {
    return hotels.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  useEffect(() => {
    const data = async () => {
      try {
        const value = await getData();
        setHotels(value);
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    data();
  }, [getData]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <ImageBackground
          style={{
            width: "100%",
            flex: 1,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          resizeMode="cover"
          source={require("../../assets/holiday.png")}
        >
          <Image
            style={styles.logoImage}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/images%2Fhotel_findr_logo.png?alt=media&token=f90f0d66-4ba5-49fa-a559-92486516ac24",
            }}
          />

          <View style={styles.overlay}>
            <Text style={styles.searchText}>Find Your Room</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Find your room"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.filterContainer}>
        <Filter />
      </View>

      <View style={styles.FlatListContainer}>
        <FlatList
          data={filterHotels()}
          renderItem={({ item }) => <Hotels data={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C6968",
  },
  headerContainer: {
    width: "100%",
    height: 300,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: "hidden",
  },
  logoImage: {
    top: 100,
    width: 350,
    height: 96,
    resizeMode: "cover",
  },
  searchText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 400,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  searchInput: {
    marginVertical: 10,
    width: "90%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  filterContainer: {
    width: "95%",
  },
  FlatListContainer: {
    flex: 3,
    width: "95%",
    justifyContent: "center",
  },
});

export default HomePage;
