import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Hotels = (props) => {
  const address = props.data.address.length > 30 ? `${props.data.address.substring(0, 30)}...` : props.data.address;
  return (
    <View style={styles.hotelContainer}>
      <Image
        style={styles.image}
        source={{ uri: props.data.mainImage }}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{props.data.name}</Text>
        
        <View style={styles.address}>
        <Image style={styles.map} source={require("../../assets/map.png")} />
        <Text>{address}</Text>
        <Image style={styles.star} source={require("../../assets/star.png")} />
        <Text>{props.data.rating}</Text>

      </View>

     

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hotelContainer: {
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    borderRadius: 40,
  },
  image: {
    width: "100%",
    height: 80,
    borderRadius: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  detailsContainer: {
    padding: 10,
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  map:{
    width: 20,
    height: 20,
    marginRight: 5,
  },
  star:{
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: 'orange'
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
})

export default Hotels