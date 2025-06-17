import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { ImageSliderType } from '@/data/SliderData'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { Animated } from 'react-native'


type Props = {
    item: ImageSliderType;
    index: number;
    scrollX: SharedValue<number>
}

const { width } = Dimensions.get('screen');

const SliderItem = ({ item, index, scrollX }: Props) => {
    const rnAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [-width * 0.25, 0, width * 0.25],
                        Extrapolation.CLAMP
                    ), 
                },
                {
                    scale:interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [0.9, 1, 0.9],
                        Extrapolation.CLAMP
                    ),
                }
            ]
        }
    });
    return (
        <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
            <Image source={item.image} style={styles.image} />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.background}
            >
                <View style={{ alignItems: 'flex-end', paddingEnd: 20, paddingTop: 20 }}>
                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name='heart-outline' size={24} color={'#fff'} />
                    </TouchableOpacity>
                </View>
                <View style={{ gap: 10, alignItems: 'center', paddingBottom: 30 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </LinearGradient>

        </Animated.View>
    )
}

export default SliderItem

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: width 
    },
    background: {
        position: 'absolute',
        height: 300,
        width: 320,
        borderRadius: 30,
        justifyContent: 'space-between'
    },
    image: {
        width: 320,
        height: 300,
        borderRadius: 30
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 1.5,
    },
    description: {
        color: "#fff",
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 1.2,
        textAlign: 'center'
    },
    icon: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 5,
        borderRadius: 30
    }
})