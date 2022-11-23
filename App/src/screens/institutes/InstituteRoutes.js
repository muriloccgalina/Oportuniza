import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Institutes from './Institutes';
import RegisterDonations from '../donation/RegisterDonations';
import InstituteDonations from '../donation/InstituteDonations';

const Stack = createNativeStackNavigator();

const InstituteRoutes = ({ navigation }) => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="MainInstitutes" component={Institutes} />
                <Stack.Screen name="RegisterDonations" component={RegisterDonations} />
                <Stack.Screen name="InstituteDonations" component={InstituteDonations} />
            </Stack.Navigator>
    )
}

export default InstituteRoutes

