import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const hotels = [
  { id: 1, name: 'Paşa Beach', latitude: 37.0351, longitude: 27.4305 },
  { id: 3, name: 'Casa Mera', latitude: 37.0340, longitude: 27.4339 },
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
