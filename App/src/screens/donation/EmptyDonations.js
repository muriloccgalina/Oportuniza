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
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'lightblue',
        height:'100%'
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 30,
        alignItems: 'center'
    },

})
