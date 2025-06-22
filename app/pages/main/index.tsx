import { View, Text, Pressable, Image, ScrollView, ActivityIndicator, ImageBackground, Animated, Easing } from "react-native";

import React, { useEffect, useState, useRef } from "react";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import ColorList from "../../../components/ColorList";
import StyleOfIndex from "../../../assets/style/home";
import Icon from 'react-native-vector-icons/FontAwesome6'; 

SplashScreen.preventAutoHideAsync();

export default function Index() {
    // Animated text state
    const animatedTexts = ["Vestibulares?", "Concursos?", "Cursos?"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const translateY = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current; // Added for fade effect

    const [fontsLoaded] = useFonts({
        'Poppins_Regular': require('../../../assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins_Bold': require('../../../assets/fonts/poppins/Poppins-Bold.ttf'),
        'Poppins_Light': require('../../../assets/fonts/poppins/Poppins-Light.ttf')
    });

    const router = useRouter(); // Moved line

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        const animateText = () => {
            // Reset opacity to 1 for the current text before animating out (if it was faded out)
            // This is important if the animation was interrupted or for the very first run.
            opacityAnim.setValue(1);

            Animated.sequence([
                // Fade out and move up
                Animated.parallel([
                    Animated.timing(translateY, {
                        toValue: -20,
                        duration: 300,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0,
                        duration: 300,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
                Animated.delay(100), // Short pause
                // Prepare for next text: move to bottom, set opacity to 0, then update index
                Animated.timing(translateY, { // This timing is just to use its complete callback
                    toValue: 20,
                    duration: 0, // Instant
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // setCurrentIndex will trigger re-render, new text will be at translateY: 20, opacity: 0
                setCurrentIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % animatedTexts.length;
                    // Reset for the new text that's about to animate in
                    translateY.setValue(20); // Start from bottom
                    opacityAnim.setValue(0);   // Start transparent

                    // Animate new text in (fade in and move to center)
                    Animated.parallel([
                        Animated.timing(translateY, {
                            toValue: 0,
                            duration: 300,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                        Animated.timing(opacityAnim, {
                            toValue: 1,
                            duration: 300,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                    ]).start();
                    return nextIndex;
                });
            });
        };

        const intervalId = setInterval(animateText, 2000); // Interval for full cycle

        return () => clearInterval(intervalId);
    }, []); // Empty array: effect runs once on mount, cleans up on unmount.

    if (!fontsLoaded) {
        return null;
    }

    // const router = useRouter(); // Line removed from here

    const buttonsData = [
        { image: require("@/assets/images/logotipo-provas/enem.svg"), route: "/pages/main/pagesRoot/vestibularPageEnem" },
        { image: require("@/assets/images/logotipo-provas/vunesp.svg"), route: "/pages/main/pagesRoot/vestibularPageVunesp" },
        { image: require("@/assets/images/logotipo-provas/usp.svg"), route: "/pages/main/pagesRoot/vestibularPageUsp" },
    ];

    const buttonDataConcursos = [
        { image: require("@/assets/images/logotipo-provas/correios.svg"), route: "/pages/main/provas" },
        { image: require("@/assets/images/logotipo-provas/bancodobrasil.svg"), route: "/pages/main/provas" },
        { image: require("@/assets/images/logotipo-provas/caixaeconomica.svg"), route: "/pages/main/provas" },
        { image: require("@/assets/images/logotipo-provas/policiamilitar.svg"), route: "/pages/main/provas" },
    ];

    const renderButtons = () => (
        <ScrollView horizontal={true} style={StyleOfIndex.scrollViewContent} showsHorizontalScrollIndicator={false}>
            <View style={StyleOfIndex.infoTestBottons}>
                {buttonsData.map((button, index) => (
                    <Pressable
                        key={index}
                        style={StyleOfIndex.button}
                        onPress={() => router.push(button.route)}
                    >
                        <Image
                            source={button.image}
                            style={StyleOfIndex.buttonImage}
                        />
                    </Pressable>
                ))}
            </View>
        </ScrollView>

    );

    return (
        <ScrollView style={StyleOfIndex.background} contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={StyleOfIndex.containerBack}>
                <ImageBackground
                    source={require('@/assets/images/forma001.png')}
                    style={StyleOfIndex.forma001Back}
                    resizeMode="contain"
                />
            </View>
            <View style={StyleOfIndex.titlePage}>
                <View>
                    <Text style={StyleOfIndex.styletitle}>Deseja</Text>
                    <Text style={StyleOfIndex.styletitle}>estudar para</Text>
                    <Animated.View style={[StyleOfIndex.animatedTextContainer, { opacity: opacityAnim, transform: [{ translateY }] }]}>
                        <Text style={StyleOfIndex.styletitle}>{animatedTexts[currentIndex]}</Text>
                    </Animated.View>
                </View>

            </View>
            <View style={StyleOfIndex.containerBack002}>
                <ImageBackground
                    source={require('@/assets/images/forma002.png')}
                    style={StyleOfIndex.forma002Back}
                    resizeMode="contain"
                />
            </View>
            <View style={StyleOfIndex.container}>
                <View style={StyleOfIndex.imageHome}>
                <Image source={require('@/assets/images/imgHome.svg')} />
                </View>
                <Text style={StyleOfIndex.mainTitle}>Vestibulares</Text>
                <Text style={StyleOfIndex.subtitle}>Os vestibulares mais concorridos</Text>

                {renderButtons()}

                <View style={StyleOfIndex.courseBox}>
                <Text style={StyleOfIndex.courseTitle}>Seus cursos</Text>
                <Text style={StyleOfIndex.subtitle}>Clique para ver todos os cursos</Text>
                <Image style={StyleOfIndex.bookCourse} source={require('../../../assets/images/book.svg')} />
                <Pressable onPress={() => router.push('/pages/main/empty')}>
                <View style={StyleOfIndex.buttonCourse}>
                    <Icon name="arrow-right" color={"#fff"} solid size={25}/>
                </View>
                </Pressable>
                </View>

                <Text style={StyleOfIndex.subtitlePrincipal}>Os concursos mais concorridos</Text>
                <ScrollView horizontal={true} style={StyleOfIndex.scrollViewContentWithPadding} showsHorizontalScrollIndicator={false}>
                    <View style={StyleOfIndex.infoTestBottons}>
                        {buttonDataConcursos.map((button, index) => (
                            <Pressable
                                key={index}
                                style={StyleOfIndex.button}
                                onPress={() => router.push(button.route)}
                            >
                                <Image
                                    source={button.image}
                                    style={StyleOfIndex.buttonImage}
                                />
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
}
