import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import React, { useState, useContext } from 'react';
import Logo from '../../../assets/images/Logo.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import api from '../../api'
import { Context } from '../../context/authContext'
import {Picker} from '@react-native-picker/picker';
import Maskedinput from "../../components/Maskedinput";

const RegisterInstitute = ({ navigation }) => {

    const { state, dispatch } = useContext(Context);

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [address, setAddress] = useState('');

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post("/institute/register", {
                name: name,
                type: type,
                cnpj: cnpj,
                address: address,
            });
            if (authData.status === 200) {
                alert(authData.data.message)
                setName("")
                setType("")
                setCnpj("")
                setAddress("")
                dispatch({type: "update", payload: true})
            }
            else {
                console.log(authData.data.message)
            }
        }
        catch (e) {
            console.log(e)
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
                placeholder="Institute Name"
                value={name}
                setValue={setName}
            />

            <Picker
                selectedValue={type}
                style={styles.picker}
                onValueChange={setType}
            >
                <Picker.Item label="Technology" value="Technology" />
            </Picker>

            <Maskedinput 
                placeholder={"CNPJ"}
                mask={"99.999.999/9999-99"}
                value={state.cnpj}
                onChange={setCnpj}
            />

            <CustomInput
                placeholder="Address"
                value={address}
                setValue={setAddress}
            />

            <CustomButton text="Register" onPress={onRegisterPressed} />
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

export default RegisterInstitute;