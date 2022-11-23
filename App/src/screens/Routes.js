import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons'
import { Context } from '../context/authContext'

import Home from './Home'
import InstituteRoutes from './institutes/InstituteRoutes'
import DonationRoutes from './donation/DonationRoutes'
import UserRoutes from './user/UserRoutes'

const Tab = createBottomTabNavigator();

const Routes = () => {
    const { state, dispatch } = useContext(Context);
    return (
        <Tab.Navigator screenOptions={{
            headerRight: () => (
                <Entypo
                    name='log-out'
                    size={20}
                    style={{ margin: 10 }}
                    color="#000"
                    onPress={() => dispatch({ type: 'logOut' })}
                />
            )
        }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => (
                        <Entypo name='home' size={30} />
                    )
                }}
            />
            <Tab.Screen
                name="Institutes"
                component={InstituteRoutes}
                options={{
                    tabBarIcon:
                        () => (
                            <Entypo name='bowl' size={30} />
                        )
                }}
            />
            <Tab.Screen
                name="Donations"
                component={DonationRoutes}
                options={{
                    tabBarIcon: () => (
                        <Entypo name='fingerprint' size={30} />
                    )
                }}
            />
            {state.isAdmin ? (
                <Tab.Screen
                    name="User"
                    component={UserRoutes}
                    options={{
                        tabBarIcon: () => (
                            <Entypo name='user' size={30} />
                        )
                    }}
                />
            ) : (
                <></>
            )}

        </Tab.Navigator>
    )
}

export default Routes;

const styles = StyleSheet.create({})