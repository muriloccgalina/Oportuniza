import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterDonations from './RegisterDonations';
import Donations from './Donations';

const Stack = createNativeStackNavigator();

const DonationRoutes = ({ navigation }) => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="DonationsMain" component={Donations} />
            </Stack.Navigator>
    )
}

export default DonationRoutes

