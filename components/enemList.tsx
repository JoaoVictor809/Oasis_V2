import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import React from 'react'
import { useFonts } from "expo-font";
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ScreenContainer } from 'react-native-screens';

export default function enemList(){
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
    return(
        <View>
            <Text style={styles.title}>Enem</Text>
            <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/enem/enem2023.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/enem/enem2022.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/enem/enem2021.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/enem/enem2020.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/enem/enem2019.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/enem/enem2017.png')} />
                </View>
            </ScrollView>
        </View>
    )
}

const  styles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontFamily: 'Poppins_Bold',
        color: '#000',
        paddingLeft:20
    },
    container:{
        padding:8,
        margin: 10,
    },
    imageContainer: {
        marginRight: 16, 
    },
})