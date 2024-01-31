import { StyleSheet, Text, View, Pressable} from 'react-native'
import React from 'react'

const MyButton = (props) => {
    const title = props.title
    const handleOnPress = props.handleButton
    const isDisable = props.isDisable
    
      return (
        <Pressable 
        style={({pressed})=> [{backgroundColor: props.isDisable ? "#D9D9D9" : (pressed ? "gray" : "#0C2D57")},styles.otherButtonContainer]}
        onPress={handleOnPress}
        disabled={isDisable}>
            <Text style={styles.signUpText}>{title}</Text>
        </Pressable>
      )
    }
    
    export default MyButton
    
    const styles = StyleSheet.create({
        otherButtonContainer: {
          borderWidth: 1,
          borderColor:"white",
          width:"70%",
          alignItems:"center",
          justifyContent:"center", 
          paddingVertical:10,
          borderRadius:30,
          marginBottom: 30,
        },
        signUpText: {
            fontSize:20,
            fontWeight:"bold",
            color:"white",
            
        }
    })