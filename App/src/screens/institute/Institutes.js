import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/authContext'
import api from '../../api'
import { AntDesign} from '@expo/vector-icons'
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
        navigation.navigate('RegisterDonation')
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonTop}>
            {state.isAdmin ? (
                <CustomButton text="New Institute" onPress={() => navigation.navigate("RegisterInstitute")} />
            ) : (
                <></>
            )}
            </View>
            <FlatList
                data={institutes}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.content}>
                            <TouchableOpacity style={styles.nameInstitute} onPress={() => seeDonation(item)}>
                                    <Text style={styles.title}>{item.name}</Text>
                                    <Text style={styles.item}>{item.type}</Text>
                                    <Text style={styles.item}>{item.cnpj}</Text>
                                    <Text style={styles.item}>{item.address}</Text>
                            </TouchableOpacity>
                            <AntDesign
                                name="plussquare"
                                size={45}
                                color="#000"
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

export default Institutes

const styles = StyleSheet.create({
    buttonTop:{
        width:'100%',
        alignItems:'center',
        marginBottom:10,
    },
    container: {
        flex: 1,
        padding:13,
        justifyContent: "center",
        backgroundColor: '#F0F8FF',
    },
    content: { 
        borderBottomWidth:6,
        borderBottomColor: '#000',
        flexWrap: "wrap",
        paddingLeft: 13,
        paddingTop: 8,
        borderRadius: 10,
        height: 130,
        width: '100%',
        backgroundColor: '#6495ED',
        marginBottom:10
    },
    icon:{
        marginLeft:'25%',
        marginTop:'9%',
    },
    title: {
        fontSize: 23,
        fontWeight:'bold',
        fontFamily: 'FreeMono, monospace' , 
        color: '#fff',
        marginLeft: 5,
        marginBottom: 10,
        
    },
    item: {
        fontSize: 18,
        fontWeight:'bold',
        fontFamily: 'FreeMono, monospace' , 
        color: '#fff',
        marginLeft: 5,
    },
    nameInstitute: {
        fontWeight: 'bold',
        color: '#fff',
        margin: 5,
        fontSize: 15
    },
})
