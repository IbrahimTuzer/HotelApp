import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React from 'react'

const Filter = () => {
  return (
    
      <ScrollView
       horizontal
       showsHorizontalScrollIndicator= {false}
       >
      <Pressable style={styles.filterText}>
      <Text style={styles.text}>Marmaris</Text>
      </Pressable>
      <Pressable style={styles.filterText}>
      <Text style={styles.text}>Bodrum</Text>
      </Pressable>
      <Pressable style={styles.filterText}>
      <Text style={styles.text}>Akyaka</Text>
      </Pressable>
      <Pressable style={styles.filterText}>
      <Text style={styles.text}>Antalya</Text>
      </Pressable>
      
      
      </ScrollView>
   
  )
}

export default Filter

const styles = StyleSheet.create({
    filterText:{
        flexDirection: "row",
        borderRadius: 20,
        width:82,
        height:32,
        alignItems:"center",
        justifyContent: "center",
        margin: 10,
        backgroundColor: "#D9D9D9"
    },
    
})