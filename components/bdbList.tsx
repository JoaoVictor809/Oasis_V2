import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { useFonts } from "expo-font";
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ScreenContainer } from 'react-native-screens';

export default function bdbList() {
    const [fontsLoaded] = useFonts({
        'Poppins_Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins_Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf')
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View>
            <Text style={styles.title}>Banco do brasil</Text>
            <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image source={require('@/assets/images/banco do brasil/bdb2020.png')} />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('@/assets/images/banco do brasil/bdb2018.png')} />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('@/assets/images/banco do brasil/bdb2016.png')} />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('@/assets/images/banco do brasil/bdb2014.png')} />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('@/assets/images/banco do brasil/bdb2012.png')} />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('@/assets/images/banco do brasil/bdb2010.png')} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'Poppins_Bold',
        color: '#000',
        paddingLeft: 20
    },
    container: {
        padding: 8,
        margin: 10,
        borderWidth:0
    },
    imageContainer: {
        marginRight: 16,
    },
})