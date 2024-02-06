import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";

const Filter = (props) => {

  const uniqueDistricts = [...new Set(props.districts)];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {uniqueDistricts.map((district, index) => (
        <Pressable
          key={index}
          style={styles.filterText}
          onPress={() => props.onSelectDistrict(district)}
        >
          <Text style={styles.text}>{district}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterText: {
    flexDirection: "row",
    borderRadius: 20,
    width: 82,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#D9D9D9",
  },
  
});

export default Filter;
