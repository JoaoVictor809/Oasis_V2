import { View, Platform, StyleSheet, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useScroll } from '../contexts/ScrollContext';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';

export default function TabBar({ state, descriptors, navigation }) {
    const { isTabBarVisible } = useScroll();
    const translateYValue = useRef(new Animated.Value(0)).current;
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setUserToken(token);
            } catch (error) {
                console.error('Failed to load token from AsyncStorage', error);
            }
        };
        fetchToken();
    }, []);

    // Reload token when screen is focused
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetchToken = async () => {
                try {
                    const token = await AsyncStorage.getItem('userToken');
                    setUserToken(token);
                } catch (error) {
                    console.error('Failed to load token from AsyncStorage', error);
                }
            };
            fetchToken();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        Animated.timing(translateYValue, {
            toValue: isTabBarVisible ? 0 : 100, // 100 to hide (move down)
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isTabBarVisible]);

    const greyColor = '#737373';
    const activeColor = '#1261D7';

    const icons = {
        index: (props) => <MaterialIcons name="home-filled" size={24} color={greyColor} {...props} />,
        cursos: (props) => <MaterialCommunityIcons name="bookshelf" size={24} color={greyColor} {...props} />,
        provas: (props) => <FontAwesome6 name="sheet-plastic" size={24} color={greyColor} {...props} />,
        login: (props) => <AntDesign name="user" size={24} color={greyColor} {...props} />
    };

    const { buildHref } = useLinkBuilder();
    const { colors } = useTheme();

    return (
        <Animated.View style={[styles.tabbar, { transform: [{ translateY: translateYValue }] }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                if (['_sitemap', '+not-found'].includes(route.name)) return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        if (route.name === 'login') {
                            if (userToken) {
                                navigation.navigate('EditProfileScreen');
                            } else {
                                navigation.navigate('app/pages/main/login');
                            }
                        } else {
                            navigation.navigate(route.name, route.params);
                        }
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const Icon = icons[route.name];
                if (!Icon) {
                    console.warn(`Ícone não encontrado para a rota: ${route.name}`);
                    return null;
                }

                return (
                    <PlatformPressable
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabbarItem}
                    >
                        <Icon
                            color={isFocused ? activeColor : greyColor}
                        />
                        <Text style={{ color: isFocused ? activeColor : greyColor }}>
                            {label}
                        </Text>
                    </PlatformPressable>
                );
            })}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
