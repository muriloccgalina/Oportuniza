import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/authContext'
import api from '../../api'
import Stars from 'react-native-stars';
import { Entypo } from "@expo/vector-icons";

const InstituteDonations = ({ navigation }) => {

    const { state } = useContext(Context)

    const [donations, setDonations] = useState({});

    useEffect(() => {
        const onScreenLoad = async () => {
            const list = await api.get('/donation/findByInstitute', {
                params: {
                    idInstitute: state.idInstitute,
                },
            }).then((res) => setDonations(res.data.donations))
        }
        onScreenLoad();
    }, [state.update]
    )

    return (
        <View style={styles.view}>
            <FlatList
                data={donations}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <View style={styles.text}>
                                <Text style={styles.title}>{item.comment}</Text>
                                <Text style={styles.item}>Donated by: {item.user.name}</Text>
                            </View>
                        </View>
                    )
                }
                }
                keyExtractor={(item) => item.id}
            />
        </View>


    )
}

export default InstituteDonations

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'lightblue',
        alignItems: 'center'
    },
    text: {
        height: 120,
        width: '100%',
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        margin: 10,
        textAlign: 'center'
    },
    item: {
        margin: 10,
        fontSize: 15
    },
    icon: {
        margin: 10
    },
    myStarStyle: {
        color: 'orange',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        width: 50,
        fontSize: 50
    },
    myEmptyStarStyle: {
        color: 'gray',
        width: 50,
        fontSize: 50
    }
})
