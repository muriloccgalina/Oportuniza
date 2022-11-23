import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Context } from '../context/authContext'

const Home = () => {
  const [counter, setCounter] = useState(0);
  const { dispatch } = useContext(Context);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <View style={styles.flex0} />
      <View style={styles.flex1} />
      <View style={styles.flex0} />
    </View>
    </View>
  )
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent:'center'
  
    },
    content:{
      maxWidth:700,
      height:360
    },
    flex1:{
      minHeight:250,
      maxHeight: 310,
      backgroundColor:'#0000FF'
    },
    flex0:{
      backgroundColor:'red',
      height:50
    }
  });

export default Home;