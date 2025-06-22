import { Text, View, SafeAreaView, ImageBackground, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import Estilo from '../../assets/style/splashInfo';
import React, { useState, useEffect } from 'react';
import { useFonts } from "expo-font";

// Mantenha a tela de splash visível até que as fontes tenham carregado
SplashScreen.preventAutoHideAsync();

export default function pag2() {
    const [fontsLoaded] = useFonts({
        'Poppins_Regular': require('../../assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins_Bold': require('../../assets/fonts/poppins/Poppins-Bold.ttf')

    });

    // Oculta a tela de splash quando as fontes são carregadas
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        // Retorna null ou qualquer outra coisa enquanto a tela de splash ainda está visível.
        return null
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{flex:1}}>
            <ImageBackground>
                <View style={Estilo.fundo001}>
                    <ImageBackground source={require('../../assets/images/forma004.png')} />
                </View>

                <View style={Estilo.fundo002}>
                    <ImageBackground style={Estilo.forma002} source={require('../../assets/images/forma003.png')} />
                </View>
            </ImageBackground>

            <View style={Estilo.containerMain}>
                <Image source={require('../../assets/images/pratico.png')} />
                <Text style={Estilo.txt}>Estudos práticos</Text>
                <Text style={Estilo.txt002}>
                Eficiência e praticidade em um só lugar. <br />
                Nosso app te prepara para qualquer prova <br />
                com conteúdos concisos e exercícios <br />
                direcionados.
                </Text>
            </View>
            <View style={Estilo.container002}>
                <Pressable>
                <Link href={'/'}>
                <Text style={Estilo.back}>Voltar</Text>
                </Link>
                </Pressable>
                <Pressable>
                <Link href={'./splashInfo002'}>
                <Text style={Estilo.next}>Próximo</Text>
                </Link>
                </Pressable>
            </View>
            </View>
        </SafeAreaView>
    )
}