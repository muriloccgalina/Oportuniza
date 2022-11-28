import { StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons'

import { Context } from '../context/authContext'

import Home from './Home'
import InstituteRoutes from './institute/InstituteRoutes'
import DonationRoutes from './donation/DonationRoutes'
import Users from './Users'

const Tab = createBottomTabNavigator();

const Routes = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)
    return (
        
        <Tab.Navigator screenOptions={{
            
            headerRight: () => (
                <AntDesign
                    name='logout'
                    size={22}
                    style={{ margin: 10 }}
                    onPress={() => dispatch({ type: 'logOut' })}
                    color="#000"
                />
            )            
        }} >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => (
                        <AntDesign name='home' size={21} />
                    ),
                }}
            />
            
            <Tab.Screen
                name="Donations"
                component={DonationRoutes}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name='md-receipt-outline' size={21} />
                    )
                }}
            />
            <Tab.Screen
                name="Institutes"
                component={InstituteRoutes}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name='building' size={21} />
                    )
                }}
            />
                <Tab.Screen
                    name="Users"
                    component={Users}
                    options={{
                        tabBarIcon: () => (
                            <AntDesign name='user' size={21} />
                        )
                    }}
                />

        </Tab.Navigator>
    )
}

export default Routes

const styles = StyleSheet.create({
    
})