import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useFonts } from "expo-font";
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ScreenContainer } from 'react-native-screens';

export default function bdbList() {
    const [fontsLoaded] = useFonts({
        'Poppins_Regular': require('@/assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins_Bold': require('@/assets/fonts/poppins/Poppins-Bold.ttf')
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
            <Text style={styles.title}>Tecnologia da informação <br /> e informtica</Text>
            <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
                <View style={styles.containerCurso}>
                                <View style={styles.descriCurso}>
                                    <View style={styles.boxTitle001}>
                                        <Text style={styles.regular}>Tecnologia da Informação e Informática</Text>
                                    </View>
                                    <View style={styles.boxTitle002}>
                                        <Text style={styles.regular}>Cursos Livres</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.bold}>ADMINISTRADOR DE SERVIDORES<br />LINUX</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.regular}>O Curso de Especialização Profissional
                                            <br />Administrador de Servidores Linux tem
                                            <br />por objeti...</Text>
                                    </View>
                                    <View>
                                        <View style={styles.timerCurso001}>
                                            <Image source={require('@/assets/images/clock.png')} />
                                            <Text style={styles.regular}>Carga horária: 60 horas</Text>
                                        </View>
                                    </View>
                                    <Pressable style={{ alignItems: 'center' }}>
                                        <View style={styles.buttonCurso}>
                                            <Text style={[styles.regular, {color:'#1261D7'}]}>Saiba mais</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                
                            <View style={styles.containerCurso}>
                                <View style={styles.descriCurso}>
                                    <View style={styles.boxTitle001}>
                                        <Text style={styles.regular}>Tecnologia da Informação e Informática</Text>
                                    </View>
                                    <View style={styles.boxTitle002}>
                                        <Text style={styles.regular}>Cursos Livres</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.bold}>ADOBE ILLUSTRADOR</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.regular}>O curso de Aperfeiçoamento
                                            <br />Profissional de Adobe Illustrator tem 
                                            <br />por objetivo o desenvo...</Text>
                                    </View>
                                    <View>
                                        <View style={styles.timerCurso001}>
                                            <Image source={require('@/assets/images/clock.png')} />
                                            <Text style={styles.regular}>Carga horária: 60 horas</Text>
                                        </View>
                                    </View>
                                    <Pressable style={{ alignItems: 'center' }}>
                                        <View style={styles.buttonCurso}>
                                            <Text style={[styles.regular, {color:'#1261D7'}]}>Saiba mais</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                
                            <View style={styles.containerCurso}>
                                <View style={styles.descriCurso}>
                                    <View style={styles.boxTitle001}>
                                        <Text style={styles.regular}>Tecnologia da Informação e Informática</Text>
                                    </View>
                                    <View style={styles.boxTitle002}>
                                        <Text style={styles.regular}>Cursos Livres</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.bold}>ARTE 3D PARA GAMES</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.regular}>O curso de Aperfeiçoamento 
                                            <br />Profissional de Arte 3D para Games tem 
                                            <br />por objetivo o desenv...</Text>
                                    </View>
                                    <View>
                                        <View style={styles.timerCurso001}>
                                            <Image source={require('@/assets/images/clock.png')} />
                                            <Text style={styles.regular}>Carga horária: 60 horas</Text>
                                        </View>
                                    </View>
                                    <Pressable style={{ alignItems: 'center' }}>
                                        <View style={styles.buttonCurso}>
                                            <Text style={[styles.regular, {color:'#1261D7'}]}>Saiba mais</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                
                            <View style={styles.containerCurso}>
                                <View style={styles.descriCurso}>
                                    <View style={styles.boxTitle001}>
                                        <Text style={styles.regular}>Tecnologia da Informação e Informática</Text>
                                    </View>
                                    <View style={styles.boxTitle002}>
                                        <Text style={styles.regular}>Cursos Livres</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.bold}>ADOBE PHOTOSHOP</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.regular}>O curso de Aperfeiçoamento 
                                            <br />Profissional de Arte 3D para Games tem 
                                            <br />por objetivo o desenv...</Text>
                                    </View>
                                    <View>
                                        <View style={styles.timerCurso001}>
                                            <Image source={require('@/assets/images/clock.png')} />
                                            <Text style={styles.regular}>Carga horária: 60 horas</Text>
                                        </View>
                                    </View>
                                    <Pressable style={{ alignItems: 'center' }}>
                                        <View style={styles.buttonCurso}>
                                            <Text style={[styles.regular, {color:'#1261D7'}]}>Saiba mais</Text>
                                        </View>
                                    </Pressable>
                                </View>
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
    },
    imageContainer: {
        marginRight: 16,
    },
    containerCurso: {
        width: 330,
        height: 360,
        borderWidth: 3,
        borderColor: '#1261D7',
        borderRadius: 20,
        alignItems: 'center',
        marginRight: 16,
    },
    descriCurso: {
        paddingTop: 20,
        gap: 20,
    },
    boxTitle001: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 20,
        width: 'auto',
        alignItems: 'center',
        height: 30,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center'
    },
    boxTitle002: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 20,
        width: 110,
        height: 30,
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timerCurso001: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    buttonCurso: {
        width: 100,
        borderWidth: 2,
        borderColor: '#1261D7',
        borderRadius: 20,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bold: {
        fontFamily: 'Poppins_Bold',
        fontSize: 15
    },
    regular: {
        fontFamily: 'Poppins_Regular',
    }
})