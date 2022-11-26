import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Context } from '../context/authContext'
import CustomButton from '../components/CustomButton';

const Home = ({ navigation }) => {

  const { state, dispatch } = useContext(Context);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {state.name}</Text>
      <CustomButton text="Institutes" onPress={() => navigation.navigate("Institutes")} />
      <CustomButton text="Donations" onPress={() => navigation.navigate("Donations")} />
      <CustomButton text="Users" onPress={() => navigation.navigate("Users")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:'space-around'
    
  },
  text: {
    fontSize: 30,
    margin: 40
  }
})

export default Home;