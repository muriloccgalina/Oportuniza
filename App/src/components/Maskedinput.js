import {View, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import InputMask from 'react-input-mask';


const Maskedinput = ({ placeholder, mask, value, onChange }) => {
  return (
      <View style={styles.container}>
          <InputMask
            placeholder={placeholder} 
            mask={mask}
            value={value}
            onChange={onChange}
            style={styles.input}
          /> 
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'lightgray',
      width: '100%',
      marginVertical: 5,
      borderWidth: 1,
      borderColor: 'lightgray',//'#e8e8e8',
      borderRadius: 5,
  },
  input: {
      padding: 15,
      backgroundColor: 'lightgray',
      fontWeight: 'bold',
  }
})

export default Maskedinput