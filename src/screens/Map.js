import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const hotels = [
  { id: 1, name: 'Hotel A', latitude: 37.0351, longitude: 27.4305 },
  { id: 2, name: 'Hotel B', latitude: 36.8556, longitude: 28.2680 },
  { id: 3, name: 'Hotel C', latitude: 37.0340, longitude: 27.4339 }, 
  { id: 4, name: 'Hotel D', latitude: 36.9714, longitude: 28.2115 }, 
  { id: 5, name: 'Hotel E', latitude: 36.8569, longitude: 28.2694 }, 
 
];

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.0351,
          longitude: 27.4305,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {hotels.map((hotel) => (
          <Marker
            key={hotel.id}
            coordinate={{ latitude: hotel.latitude, longitude: hotel.longitude }}
            title={hotel.name}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;
