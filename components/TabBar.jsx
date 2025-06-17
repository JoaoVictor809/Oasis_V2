import { View, Platform, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';

export default function TabBar({ state, descriptors, navigation }) {
    const greyColor = '#737373';
    const activeColor = '#1261D7';

    // Definindo os ícones
    const icons = {
        index: (props) => <MaterialIcons name="home-filled" size={24} color={greyColor} {...props} />,
        cursos: (props) => <MaterialCommunityIcons name="bookshelf" size={24} color={greyColor} {...props} />,
        provas: (props) => <FontAwesome6 name="sheet-plastic" size={24} color={greyColor} {...props} />,
        login: (props) => <AntDesign name="user" size={24} color={greyColor} {...props} />
    };

    const { buildHref } = useLinkBuilder();
    const { colors } = useTheme();

    return (
        <View style={styles.tabbar}>
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
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                // Garantir que o ícone exista e seja uma função
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
                        {/*Renderizando o ícone*/}
                        <Icon
                            color={isFocused ? activeColor : greyColor}
                        />
                        <Text style={{ color: isFocused ? activeColor : greyColor }}>
                            {label}
                        </Text>
                    </PlatformPressable>
                );
            })}
        </View>
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
