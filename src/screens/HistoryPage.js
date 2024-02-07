import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import HistoryBox from "../components/HistoryBox";
import { getReservationData } from "../../api";
import { useSelector } from "react-redux";

const HistoryPage = ({ navigation }) => {
  const [reservationHotels, setReservationHotels] = useState([]);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allReservations = await getReservationData();
        // Kullanıcıya ait rezervasyonları filtrelemek için
        const filteredReservations = allReservations.filter(
          (reservation) => reservation.userMail === user.email
        );
        setReservationHotels(filteredReservations);
        console.log("Filtered reservation data:", filteredReservations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.backIconContainer}>
          <Pressable
            style={({ pressed }) => [
              { transform: [{ translateX: pressed ? -5 : 0 }] },
            ]}
            onPress={() => navigation.navigate("HomePage")}
          >
            <FontAwesome name="arrow-circle-left" size={30} color="#F3B456" />
          </Pressable>
        </View>
        <Image
          style={styles.logoImage}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/images%2Fhotel_findr_logo.png?alt=media&token=f90f0d66-4ba5-49fa-a559-92486516ac24",
          }}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Booking History</Text>
        </View>
        <View style={styles.blackLine}></View>
      </View>

      <View style={styles.historyContainer}>
        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={reservationHotels}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HistoryBox
              title={item.hotelName}
              totalPrice={item.totalPrice}
              stayDay={item.stayDay}
              image={item.image}
            />
          )}
          style={styles.flatList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  backIconContainer: {
    flex: 3,
    width: "95%",
    marginLeft: 15,
    marginTop: 5,
  },
  logoImage: {
    position: "absolute",
    top: 0,
    width: 160,
    height: 40,
    alignSelf: "center",
    resizeMode: "cover",
  },
  titleContainer: {
    position: "absolute",
    top: 40,
    left: -70,
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  blackLine: {
    position: "absolute",
    top: 75,
    left: 18,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "40%",
    marginTop: 10,
  },
  historyContainer: {
    flex: 7,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  flatList: {
    width: "100%",
    marginLeft: 35,
  },
});

export default HistoryPage;
