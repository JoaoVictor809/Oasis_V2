import { Tabs, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; // Important for re-checking auth
import TabBar from '../../../components/TabBar'; // Assuming this is your custom tab bar
import { ScrollProvider } from '../../../contexts/ScrollContext';

export default function MainTabLayout() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false); // This state is for potential other uses, tab press re-checks
    const isFocused = useIsFocused(); // Hook to detect if the tab navigator screen is focused

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = await AsyncStorage.getItem('userToken');
            setIsAuthenticated(!!token);
        };

        // Check auth status when the tab navigator gains focus or on initial mount.
        // isFocused is true on initial mount if it's the first screen.
        if (isFocused) { 
            checkAuthStatus();
        }
        // An initial check regardless of focus state might be redundant if isFocused covers mount,
        // but can be kept for certainty depending on navigation structure.
        // For robust tab behavior, the onPress check is key.
        checkAuthStatus(); 
    }, [isFocused]); // Rerun when isFocused changes

    return (
        <ScrollProvider>
            <Tabs
                tabBar={props => <TabBar {...props} />} // Your custom tab bar
                screenOptions={{ headerShown: false }}
            >
                <Tabs.Screen
                    name='index'
                    options={{ title: "Inicio" }}
                />
                <Tabs.Screen
                    name='cursos'
                    options={{ title: "Cursos" }}
                />
                <Tabs.Screen
                    name='provas'
                    options={{ title: "Provas" }}
                />
                <Tabs.Screen
                    // 'login' is kept as the route name, which should map to app/pages/main/login.tsx
                    // The behavior of pressing the tab is then overridden by the listener.
                    name='login' 
                    options={{ title: "User" }} // This title will be displayed on the tab
                    listeners={{
                        tabPress: (e) => {
                            e.preventDefault(); // Prevent default navigation to the 'login' screen file
                            // Re-check auth status directly on press for immediate accuracy
                            AsyncStorage.getItem('userToken').then(token => {
                                if (token) {
                                    router.push('/pages/main/EditProfileScreen');
                                } else {
                                    router.push('/pages/main/login');
                                }
                            });
                        },
                    }}
                />
            </Tabs>
        </ScrollProvider>
    );
}
