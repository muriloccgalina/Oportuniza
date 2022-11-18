import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import React, { useContext, useState } from 'react';
import api from '../../api'
import Logo from '../../../assets/images/Logo.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Context } from "../../context/authContext";
import Stars from 'react-native-stars';
import { Entypo } from "@expo/vector-icons";

const RegisterDonations = ({ navigation }) => {

    const { state, dispatch } = useContext(Context);

    const [idUser, setidUser] = useState(state.idUser);
    const [idInstitute, setidInstitute] = useState(state.idInstitute);
    const [comment, setComment] = useState('');
    const [Qtde, setQtde] = useState('');
    const [dateDonation, setDateDonation] = useState('');

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post("/donation/register", {
                idUser: idUser,
                idDonation: idDonation,
                comment: comment,
                qtde: Qtde,
                dateDonation: dateDonation,
            });
            if (authData.status === 200) {
                alert(authData.data.message)
                setComment("")
                setQtde("")
                setDateDonation("")
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
                value={state.name}
                editable={false}
            />
            <CustomInput
                value={state.qtde}
                editable={false}
            />
            <CustomInput
                value={state.dateDonation}
                editable={true}
            />
            <CustomInput
                placeholder="Comment"
                value={comment}
                setValue={setComment}
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
});

export default RegisterDonations