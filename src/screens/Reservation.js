import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { sendReservationData } from "../../api";
import { useSelector } from "react-redux";


const Reservation = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.user);
  const { selectedRoom} = route.params;
   
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(selectedRoom.price); // Default olarak günlük ücret gösterilsin
  const [showCheckInDatePicker, setShowCheckInDatePicker] = useState(false);
  const [showCheckOutDatePicker, setShowCheckOutDatePicker] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false); // Rezervasyon işlemi başarılı mı?

  useEffect(() => {
    if (reservationSuccess) {
      // Rezervasyon işlemi başarılı olduğunda, input alanlarını başlangıç haline getir
      setCheckInDate(new Date());
      setCheckOutDate(new Date());
      setNumberOfNights(0);
      setTotalPrice(selectedRoom.price);
      setReservationSuccess(false); // Rezervasyon başarısını sıfırla
    }
  }, [reservationSuccess, selectedRoom.price]);

  useEffect(() => {
    calculateNumberOfNights(checkInDate, checkOutDate);
  }, [checkInDate, checkOutDate]);

  const handleCheckInDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || checkInDate;
    setShowCheckInDatePicker(false);
    setCheckInDate(currentDate);
    setCheckOutDate(currentDate); // Check-in tarihi seçildiğinde, check-out tarihi de check-in tarihine eşitlensin
  };

  const handleCheckOutDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || checkOutDate;
    setShowCheckOutDatePicker(false);
    setCheckOutDate(currentDate);
  };

  // Hesaplama fonksiyonu, check-in ve check-out tarihleri seçildikten sonra çalışacak
  const calculateNumberOfNights = (checkIn, checkOut) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay));
    setNumberOfNights(diffDays);
    // Seçilen tarihlerin arasındaki gece sayısını hesapladıktan sonra toplam ücreti güncelle
    setTotalPrice(diffDays * selectedRoom.price);
  };

  const handleReservation = async () => {
    try {
      // Check-in ve Check-out tarihleri tam olarak seçilmiş mi kontrol et
      if (checkInDate && checkOutDate) {
        // Toplam fiyat ve gece sayısı 0'dan büyükse rezervasyonu yap
        if (totalPrice > 0 && numberOfNights > 0) {
          const reservationData = {
            hotelName: selectedRoom.name,
            image: selectedRoom.image,
            stayDay: numberOfNights.toString(),
            totalPrice: totalPrice.toString(),
            userMail: user.email,
            checkInDate: checkInDate.toISOString(),
            checkOutDate: checkOutDate.toISOString(),
          };
          await sendReservationData(reservationData);
          setReservationSuccess(true);
        } else {
          // Eğer tarihler tam olarak seçilmiş ama totalPrice veya numberOfNights 0 ise kullanıcıyı uyar
          console.log("Please select valid check-in and check-out dates.");
        }
      } else {
        // Eğer tarihler tam olarak seçilmemişse kullanıcıyı uyar
        console.log("Please select both check-in and check-out dates.");
      }
    } catch (error) {
      console.error("Error while sending reservation data:", error);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.backIconContainer}>
          <Pressable
            style={({ pressed }) => [
              { transform: [{ translateX: pressed ? -5 : 0 }] },
            ]}
            onPress={() => navigation.navigate("HomePage")}
          >
            <Ionicons name="arrow-back" size={36} color="black" />
          </Pressable>
        </View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoImage}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/hotelapp-69717.appspot.com/o/images%2Fhotel_findr_logo.png?alt=media&token=f90f0d66-4ba5-49fa-a559-92486516ac24",
            }}
          />
        </View>
      </View>

      <View style={{ borderBottomWidth: 2, width: "40%", marginLeft: 5,}}>
        <Text style={styles.roomText}>Your Room</Text>
      </View>

      <View style={styles.roomContainer}>
        <View style={{ flex: 1, width: "70%" }}>
          <ImageBackground
            style={styles.roomImage}
            source={{ uri: selectedRoom.image }}
          >
            <Text style={styles.roomNameText}>{selectedRoom.room}</Text>
          </ImageBackground>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Image
          style={styles.infoImage}
          source={require("../../assets/info.png")}
        />
      </View>

      <View style={styles.chooseContainer}>
  <View style={styles.dateInputContainer}>
    <Pressable
      style={styles.dateInput}
      onPress={() => setShowCheckInDatePicker(true)}
    >
      <Text style={styles.dateInputText}>
        Check-in Date: {checkInDate.toLocaleDateString()}
      </Text>
    </Pressable>
    {showCheckInDatePicker && (
      <DateTimePicker
        value={checkInDate}
        mode="date"
        display="default"
        onChange={handleCheckInDateChange}
        minimumDate={new Date()}
      />
    )}
  </View>

  <View style={styles.dateInputContainer}>
    <Pressable
      style={styles.dateInput}
      onPress={() => setShowCheckOutDatePicker(true)}
    >
      <Text style={styles.dateInputText}>
        Check-out Date: {checkOutDate.toLocaleDateString()}
      </Text>
    </Pressable>
    {showCheckOutDatePicker && (
      <DateTimePicker
        value={checkOutDate}
        mode="date"
        display="default"
        onChange={handleCheckOutDateChange}
        minimumDate={checkInDate}
      />
    )}
  </View>
</View>


      <View style={styles.payContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.priceText}>Price:{selectedRoom.price}</Text>
            <MaterialIcons
              style={styles.dolarIcon}
              name="attach-money"
              size={18}
              color="#72BD39"
            />
            <Text style={{ fontSize: 20 }}> / Day</Text>
          </View>

          {totalPrice > 0 && numberOfNights > 0 ? (
        <Pressable
        style={({ pressed }) => [
          { transfsorm: [{ translateX: pressed ? -5 : 0 }] },
          styles.button,
        ]}
        onPress={handleReservation}
      >
        <Text>Price Now</Text>
      </Pressable>
      ) : (
        <Text style={styles.button}>Price Now</Text>
      )}

          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Reservation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backIconContainer: {
    marginRight: 20,
  },
  logoContainer: {
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 150,
    height: 72,
    resizeMode: "cover",
  },
  roomContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  roomImage: {
    marginTop: 10,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  roomNameText: {
    fontSize: 20,
    color: "#FFFFFF",
    position: "absolute",
    bottom: 10,
    left: 5,
    fontWeight: "bold",
  },
  chooseContainer: {
    flex: 3,
       justifyContent: 'center',
       paddingHorizontal: 10,
  },
  dateInputContainer: {
    marginBottom: 10,
  },
  dateInput: {
    borderWidth: 1,
       borderColor: '#ccc',
       padding: 10,
       borderRadius: 5,
  },
  dateInputText: {
    fontSize: 16,
  },
  payContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-around",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 18,
    color: "black",
    marginRight: 5,
  },
  dollarIcon: {
    marginRight: 5,
  },
});
