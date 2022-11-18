import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Context } from '../context/authContext'

const Home = () => {
  const [counter, setCounter] = useState(0);
  const { dispatch } = useContext(Context);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Text> {counter} </Text>
      <Button 
        title='Aumentar' 
        onPress={() => setCounter(counter + 1)}
      />
      <Button 
        title='Logout' 
        onPress={() => dispatch({ type: 'logOut' })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30
  }
})

export default Home;