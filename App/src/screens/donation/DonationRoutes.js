import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterDonation from './RegisterDonation';
import Donations from './Donations';

const Stack = createNativeStackNavigator();

const DonationRoutes = ({ navigation }) => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="DonationMain" component={Donations} />
            </Stack.Navigator>
    )
}

export default DonationRoutes

