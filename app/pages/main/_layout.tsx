import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../../../components/TabBar'
import { ScrollProvider } from '../../../contexts/ScrollContext'; // Added this line

export default function _layout() {
    return (
        <ScrollProvider> {/* Added this wrapper */}
            <Tabs
                tabBar={props => <TabBar {...props} />}
                screenOptions={{ headerShown: false }}
            >
                
                <Tabs.Screen
                    name='index'
                    options={{
                        title: "Inicio",
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name='cursos'
                    options={{
                        title: "Cursos"
                    }}
                />
                <Tabs.Screen
                    name='provas'
                    options={{
                        title: "Provas"
                    }}
                />

                <Tabs.Screen
                    name='login'
                    options={{
                        title: "User",
                        headerShown: false
                    }}
                />
            </Tabs>
        </ScrollProvider> 
    )
}