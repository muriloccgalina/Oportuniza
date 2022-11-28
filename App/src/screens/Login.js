import { StyleSheet, TouchableOpacity, View, Image, useWindowDimensions, Text, TextInput } from "react-native";
import React, { useState, useContext } from 'react';
import Logo from '../../assets/images/Logo.png';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import { Context } from '../context/authContext';
import Maskedinput from "../components/MaskedInput";

const Login = ({ navigation }) => {
    const { dispatch } = useContext(Context);
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const onLoginPressed = async () => {
        try {
            const authData = await api.post('/login', {
                cpf: cpf,
                password: password
            })
            if (authData.status === 200) {
                await AsyncStorage.setItem('token', authData.data.token)
                dispatch({ type: 'logIn', payload: true })
            } else {
                alert('CPF or password incorrect!')
                setPassword('')
            }
        } catch (error) {
            alert('CPF or password incorrect!')
            setPassword('')
        }
    }

    const { height } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.content}>
                <Maskedinput
                    placeholder={"CPF"}
                    mask={"999.999.999-99"}
                    value={cpf}
                    onChange={setCpf}
                />

                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                />

                <CustomButton text="Login" onPress={onLoginPressed} />

                <TouchableOpacity
                    onPress={() => navigation.navigate("RegisterUser")}
                >
                    <Text>
                        Don't have an account?{" "}
                        <Text style={styles.createAccountText}>
                            Sign up
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F0F8FF',
        height: '100%'
    },
    header:{ 
        width:'70%',
        height: '35%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        width:'100%',
        height: '60%',
        alignItems: 'center',
        justifyContent:'start'
    },
    logo: {
        width: '100%',
    },
    createAccountText: {
        fontWeight: "bold",
        color: "#6200ee",
    },
});

export default Login;