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
        <View style={styles.container}>
            <FlatList
                data={donations}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.content}>
                            <View style={styles.middle}>
                                <Text style={styles.title}>Itens: {item.itens}</Text>
                                <Text style={styles.title}>Quantity:{item.qtde}</Text>
                                <Text style={styles.title}>Doado por: {item.user.name}</Text>
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
    container: {
        flex: 1,
        padding: 13,
        justifyContent: "center",
        
        backgroundColor: '#F0F8FF',
    },
    content: {
        borderBottomWidth: 6,
        borderBottomColor: '#000',
        marginBottom:'3%',
        flexWrap: "wrap",
        paddingLeft: 13,
        paddingTop: 8,
        borderRadius: 10,
        height: 130,
        width: '100%',
        backgroundColor: '#6495ED',
    },
    middle: {
        height: '100%',
        width: '100%',
        justifyContent: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'FreeMono, monospace',
        color: '#fff',
        margin: 5,
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
