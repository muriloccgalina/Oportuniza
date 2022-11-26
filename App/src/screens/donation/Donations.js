import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/authContext'
import api from '../../api'
import Stars from 'react-native-stars';
import { Entypo } from "@expo/vector-icons";

const InstituteDonations = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)

    const [donations, setDonations] = useState({});

    useEffect(() => {
        const onScreenLoad = async () => {
            const list = await api.get('/donation/findByUser', {
                params: {
                    idUser: state.idUser,
                  }
            });
            console.log(list);
            setDonations(list.data.donations)
            dispatch({type: "update", payload: false})
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
                                <Text style={styles.item}>{item.institute.name}</Text>
                                <Text style={styles.title}>{item.itens}</Text>
                                <Text style={styles.title}>{item.qtde}</Text>
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
        fontSize: 20,
        margin: 5,
        textAlign: 'center'
    },
    item: {
        margin: 5,
        fontSize: 15
    },
    icon: {
        margin: 10
    },
})
