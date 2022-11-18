import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/authContext'
import api from '../../api'
import { Entypo } from '@expo/vector-icons'
import CustomButton from '../../components/CustomButton'

const Institutes = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)

    const [institutes, setInstitutes] = useState({});

    useEffect(() => {
        const onScreenLoad = async () => {
            const list = await api.get('/institute/find');
            setInstitutes(list.data.institutes)
            dispatch({type: "update", payload: false})
        }
        onScreenLoad();
    }, [state.update]
    )

    const seeDonation = async (item) => {
        await dispatch({type: 'setInstitute', payload: item});
        navigation.navigate('InstituteDonations');
    }

    const newDonation = async (item) => {
        await dispatch({type: 'setInstitute', payload: item});
        navigation.navigate('InstituteDonations')
    }

    return (
        <View style={styles.view}>
            {state.isAdmin ? (
                <CustomButton text="New Institute" onPress={() => navigation.navigate("RegisterInstitute")} />
            ) : (
                <></>
            )}
            <FlatList
                data={institutes}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.text} onPress={() => seeDonation(item)}>
                                    <Text style={styles.title}>{item.name}</Text>
                                    <Text style={styles.item}>{item.type}</Text>
                                    <Text style={styles.item}>{item.description}</Text>
                                    <Text style={styles.item}>{item.address}</Text>
                            </TouchableOpacity>
                            <Entypo
                                name="squared-plus"
                                size={60}
                                color="green"
                                style={styles.icon}
                                onPress={() => newDonation(item)}
                            />
                        </View>
                    )
                }
                }
                keyExtractor={(item) => item.id}
            />
        </View>


    )
}

export default Institutes;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
    },
    button: {
        marginBottom: 20
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
        width: '80%',
        justifyContent: "center",
    },
    title: {
        fontSize: 30
    },
    item: {
        fontSize: 15
    },
    icon: {
        margin: 0
    }
})
