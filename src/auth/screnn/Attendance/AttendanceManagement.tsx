import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


const AttendanceManagement = () => {
  return (
    <View style = {styles.container}>
      <Text>AttendanceManagement</Text>
    </View>
  )
}

export default AttendanceManagement

const styles = StyleSheet.create({
    container:{
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'blue'
    }

})