import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import React, { useContext, useState } from 'react';
import api from '../../api'
import Logo from '../../../assets/images/Logo.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Context } from "../../context/authContext";
import Stars from 'react-native-stars';
import { Entypo } from "@expo/vector-icons";

const RegisterDonation = ({ navigation }) => {

    const { state, dispatch } = useContext(Context);

    const [idUser, setidUser] = useState(state.idUser);
    const [idInstitute, setidInstitute] = useState(state.idInstitute);
    const [itens, setItens] = useState('');
    const [qtde, setQtde] = useState('');

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post("/donation/register", {
                idUser: idUser,
                idInstitute: idInstitute,
                itens: itens,
                qtde: qtde,
            });
            if (authData.status === 200) {
                alert(authData.data.message)
                setItens("")
                setQtde("")
                dispatch({type: "update", payload: true})
                navigation.navigate('DonationMain')
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
        <View style={styles.container}>
            
            <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />
            <View style={styles.content}>
            <CustomInput
                value={state.nameInstitute}
                editable={false}
            />

            <CustomInput
                value={state.name}
                editable={false}
            />

            <CustomInput
                placeholder="Itens"
                value={itens}
                setValue={setItens}
            />
            <CustomInput
                placeholder="Quantity"
                value={qtde}
                setValue={setQtde}
            />
            </View>
            <CustomButton text="Register" onPress={onRegisterPressed} />
        
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F0F8FF',
        height:'100%'
    },
    content:{
        marginBottom: 20,
        width:'100%',
        alignItems:'center'
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
});

export default RegisterDonation