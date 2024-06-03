import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getData } from "../../api"; // createHotel fonksiyonunun yolu sizin proje yapınıza göre değişiklik gösterebilir
import { useNavigation } from "@react-navigation/native";

const AdminDashboard = () => {
  const navigation = useNavigation();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await getData();
        setHotels(value);
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    const formattedTitle =
      item.name.length > 14 ? item.name.substring(0, 14) + "." : item.name;
    return (
      <View style={styles.roomContainer}>
        <Text style={styles.title}>{formattedTitle}</Text>
        <Image
          style={{ width: "100%", height: 100, borderRadius: 10 }}
          source={{ uri: item.mainImage }}
        />
        <Text style={styles.deleteText}>Silmek için uzun basın</Text>
      </View>
    );
  };

  const addNewHotel = () => {
    // Yeni otel ekleme sayfasına yönlendirme
    navigation.navigate("AddHotel");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin Panele Hoş Geldiniz</Text>
      </View>
      <View style={styles.topbar}>
        <Text style={styles.count}>Güncel otel sayısı: {hotels.length}</Text>
        <Pressable onPress={addNewHotel}>
          <Text style={styles.addicon}>Otel ekle</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.containerScroll}>
        <FlatList
          data={hotels}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns="2"
          style={styles.flatList}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
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
    padding: 6,
  },
  roomContainer: {
    width: "49%",
    borderWidth: 1,
    borderColor: "#0C6968",
    padding: 10,
    gap: 4,
    margin: 2,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
  flatList: {},
  deleteText: {
    color: "red",
    fontSize: 12,
    alignSelf: "center",
  },
  topbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#0C6968",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  count: {
    color: "black",
    fontSize: 16,
  },
  addicon: {
    backgroundColor: "#0C6968",
    padding: 4,
    color: "white",
    fontSize: 24,
  },
});
