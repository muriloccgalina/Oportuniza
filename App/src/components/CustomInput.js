import {View, TextInput, StyleSheet } from 'react-native';
import React from 'react';
 
const CustomInput = ({ value, setValue, placeholder, secureTextEntry, editable }) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                editable={editable}
                
            />
        </View>
    )
}
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dcdcdc',
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
        fontWeight: 'bold',
    }
})
 
export default CustomInput;