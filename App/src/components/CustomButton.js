import {Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
 
const CustomButton = ({ onPress, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
        </Pressable>
    )
}
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4169E1',
        width: '50%',
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        padding: 15,
        fontWeight: 'bold',
        color: 'white',
    }
})
 
export default CustomButton;