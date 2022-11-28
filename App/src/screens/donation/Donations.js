import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/authContext'
import api from '../../api'
import { AntDesign } from "@expo/vector-icons";

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
            if (list.data.donations[0] != null) {
            setDonations(list.data.donations)
            } else {
                navigation.navigate('EmptyDonations')
            }
            dispatch({ type: "update", payload: false })
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
                            {/* 
                                <Text style={styles.item}>{item.institute.name}</Text>
                                <Text style={styles.title}>{item.itens}</Text>
                                <Text style={styles.title}>{item.qtde}</Text>

                             */}
                            <View style={styles.header}>
                                <Text style={styles.nameInstitute}>{item.institute.name}</Text>
                                <Text style={styles.title}>{item.itens}</Text>
                                <Text style={styles.title}>{item.qtde}</Text>
                            </View>
                            <View style={styles.footer}>
                                <AntDesign name='smileo' size={30} style={styles.emoji} />
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
    textTop:{
        height: 20,
    },
    content: {
        borderBottomWidth: 6,
        borderBottomColor: '#000',
        flexWrap: "wrap",
        paddingLeft: 13,
        paddingTop: 8,
        borderRadius: 10,
        height: 130,
        width: '100%',
        backgroundColor: '#6495ED',
    },
    header: {

        minWidth: '85%'
    },
    footer: {
        width: '10%'
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: 'FreeMono, monospace',
        color: '#fff',
        margin: 5,
    },
    nameInstitute: {

        fontWeight: 'bold',
        color: '#fff',
        margin: 5,
        fontSize: 15
    },

})
