import { Text, View, SafeAreaView, ImageBackground, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import Estilo from '../../assets/style/splashInfo';
import React, { useState, useEffect } from 'react';
import { useFonts } from "expo-font";

// Mantenha a tela de splash visível até que as fontes tenham carregado
SplashScreen.preventAutoHideAsync();

export default function pag3() {
    const [fontsLoaded] = useFonts({
        'MinhaFonte-Regular': require('../../assets/fonts/superOcean.ttf'),
        'Fonte-texto': require('../../assets/fonts/TitilliumWeb-Regular.ttf')
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
            <View style={{ flex: 1 }}>
                <ImageBackground>
                    <View style={Estilo.fundo001}>
                        <ImageBackground source={require('../../assets/images/forma004.png')} />
                    </View>

                    <View style={Estilo.fundo002}>
                        <ImageBackground style={Estilo.forma002} source={require('../../assets/images/forma003.png')} />
                    </View>
                </ImageBackground>

                <View style={Estilo.containerMain}>
                    <Image source={require('../../assets/images/cronograma.png')} />
                    <Text style={Estilo.txt}>Cronograma único</Text>
                    <Text style={Estilo.txt002}>
                        Alcance seus objetivos de estudo com mais<br />
                        facilidade. Nosso app gera um cronograma sob<br />
                        medida, otimizando o seu tempo e<br />
                        maximizando seus resultados.
                    </Text>
                </View>
                <View style={Estilo.container002}>
                    <Pressable>
                        <Link href={'./splashInfo001'}>
                            <Text style={Estilo.back}>Voltar</Text>
                        </Link>
                    </Pressable>
                    <Pressable>
                        <Link href={'./main'}>
                            <Text style={Estilo.next}>Próximo</Text>
                        </Link>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}