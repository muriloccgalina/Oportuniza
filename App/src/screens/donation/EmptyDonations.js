import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/authContext'
import api from '../../api'
import { AntDesign } from "@expo/vector-icons";

const EmptyDonations = ({ navigation }) => {
    return (
        <View style={styles.content}>
            <Text style={styles.text}>You don't have any contributions yet</Text>
        </View>
    )
}

export default EmptyDonations;

const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        textAlign:'center',
        padding: 20,
        backgroundColor: '#F0F8FF',
        height:'100%',
        width:"100%"
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 24,
        alignItems: 'center'
    },

})
