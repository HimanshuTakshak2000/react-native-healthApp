import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CalenderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Calender Screen</Text>
    </View>
  )
}

export default CalenderScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'white',
    justifyContent:"center",
    alignItems: 'center',
  },
  textStyle:{
    fontWeight:'500',
    color:'black',
    fontSize: 20,
  }
})