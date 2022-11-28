import {View, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import InputMask from 'react-input-mask';


const Maskedinput = ({ placeholder, mask, value, onChange}) => {
  const handleInput = ({ target: { value } }) => onChange(value);
  return (
      <View style={styles.container}>
          <InputMask
            placeholder={placeholder} 
            mask={mask}
            value={value}
            onChange={handleInput}
            style={styles.input}
          /> 
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
        backgroundColor: '#DCDCDC',
        width: '100%',
        marginVertical: 5,
        borderRightWidth: 4,
        borderBottomWidth:4,
        borderColor: '#000',
        borderStyle: 'solid',
        borderRadius: 5,
  },
  input: {
      padding: 13,
      backgroundColor: '#DCDCDC',
      fontWeight: 'bold',
  }
})

export default Maskedinput