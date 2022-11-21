import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, Picker } from "react-native";
import React, { useState } from 'react';
import Logo from '../../assets/images/Logo.png';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from '../api'
import Maskedinput from "../components/Maskedinput";

const RegisterUser = ({ navigation }) => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const data = await api.post('/user/register', {
                name: name,
                cpf: cpf,
                password: password
            });
            if (data.status === 200) {
                console.log(data)
                alert(data.data.message)
                navigation.navigate('Login')
            } else {
                console.log(data)
            }
        } catch (err) {
            console.log(err);
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
              
                placeholder="The owner name"
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
   

            <CustomButton text="Register" onPress={onRegisterPressed} />
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
            >
                <Text>
                    Já tem uma conta?{" "}
                    <Text style={styles.loginText}>Faça o login</Text>
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
    Maskedinput:{
        
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