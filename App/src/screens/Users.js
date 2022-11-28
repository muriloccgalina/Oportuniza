import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import api from '../api'
import { ImageBackground } from 'react-native';
import CustomInput from '../components/CustomInput';
import userImage from '../../assets/images/userimage.png'

const Users = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)

    const [users, setUsers] = useState({});

    useEffect(() => {
        const onScreenLoad = async () => {
            const list = await api.get('/user/find', {
                params: {
                    idUser: state.idUser,
                  }
            });
            console.log(list);
            setUsers(list.data.users)
            dispatch({type: "update", payload: false})
        }
        onScreenLoad();
    }, [state.update]
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={({ item }) => {
                    return (
                            <View style={styles.content}>
                                <CustomInput
                                    value={item.name}
                                    editable={false}
                                />
                                <CustomInput
                                    value={item.cpf}
                                    editable={false}
                                />
                                <CustomInput
                                    value={item.email}
                                    editable={false}
                                />
                                <CustomInput
                                    placeholder={'Phone'}
                                    value={item.phone}
                                    editable={false}
                                />
                            </View>
                    )
                }
                }
                keyExtractor={(item) => item.id}
            />
            <ImageBackground
            source={userImage}
            style={styles.imagem} />
        </View>


    )
}

export default Users

const styles = StyleSheet.create({
    
    container: {
        backgroundColor: 'lightblue',
        alignItems:'center',
        justifyContent: 'space-between',
        backgroundColor: '#F0F8FF',
        width: '100%',
        height: '100%',
    },
    content: {
        marginTop: 20,
        height: '100%',
        width: '100%',
        justifyContent: "center",
    },
    imagem:{
        maxHeight:'90%',
        minHeight:'60%',
        width: '100%',
        marginBottom:'-20%',
    },
})
