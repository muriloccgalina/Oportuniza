import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import Logo from '../../assets/images/Logo.png';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from '../api'
import {Picker} from '@react-native-picker/picker';
import Maskedinput from "../components/MaskedInput";

const RegisterUser = ({ navigation }) => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [admin, setAdmin] = useState(false);

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const data = await api.post('/user/register', {
                name: name,
                cpf: cpf,
                password: password,
                admin: admin,
                email: email,
                phone: phone
            });
            if (data.status === 200) {
                console.log(data)
                alert(data.data.message)
                navigation.navigate('Login')
            }else {
                console.log(data)
            }
        } catch (err) {
            if (err.response.status === 500) {
                alert(err.response.data.error);
                console.log(err);
            } else {
                console.log(err);
                alert(err.response.data.message);
            }
        }
    }

    return (
        <View style={styles.view}>
            <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />

            <CustomInput
                placeholder="Name"
                value={name}
                setValue={setName}
            />

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
            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />
            <CustomInput
                placeholder="Phone"
                value={phone}
                setValue={setPhone}
            />

            <CustomButton text="Register" onPress={onRegisterPressed} />
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
            >
                <Text>
                   Already have an account?{" "}
                    <Text style={styles.loginText}>Sign in</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    loginText: {
        fontWeight: "bold",
        color: "#6200ee",
    },
    picker: {
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        borderWidth: 0,
        height: 45,
        width: '100%'
    }
});

export default RegisterUser;