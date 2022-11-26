import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterInstitute from './RegisterInstitute';
import Institutes from './Institutes';
import RegisterDonation from '../donation/RegisterDonation';
import InstituteDonations from '../donation/InstituteDonations';

const Stack = createNativeStackNavigator();

const InstituteRoutes = ({ navigation }) => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="MainInstitutes" component={Institutes} />
                <Stack.Screen name="RegisterInstitute" component={RegisterInstitute} />
                <Stack.Screen name="RegisterDonation" component={RegisterDonation} />
                <Stack.Screen name="InstituteDonations" component={InstituteDonations} />
            </Stack.Navigator>
    )
}

export default InstituteRoutes

