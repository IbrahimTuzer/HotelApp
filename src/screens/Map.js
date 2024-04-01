import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Map = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Harita Sayfası Yapılacak</Text>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
