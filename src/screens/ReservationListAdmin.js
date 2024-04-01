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
import { getReservationData, deleteReservationData } from "../../api";
import { useSelector } from "react-redux";

const ReservationListAdmin = ({ navigation }) => {
  const [reservationHotels, setReservationHotels] = useState([]);
  const reservation = useSelector((state) => state.reservation.reservations);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allReservations = await getReservationData();
        // Kullanıcıya ait rezervasyonları filtrelemek için
        const filteredReservations = allReservations.filter(
          (reservation) => reservation.userMail === user.email
        );
        // Oluşturulma tarihine göre sıralama
        filteredReservations.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReservationHotels(allReservations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, reservation]);

  const handleDeleteReservation = (id) => {
    // Silme işlemi için id'ye göre filtreleme
    deleteReservationData(id);
    const newReservations = reservationHotels.filter(
      (reservation) => reservation.id !== id
    );
    setReservationHotels(newReservations);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Rezervasyon Geçmişi</Text>
        </View>
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
              onDelete={() => handleDeleteReservation(item.id)}
              userMail={item.userMail}
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

  historyContainer: {
    flex: 11,
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

export default ReservationListAdmin;
