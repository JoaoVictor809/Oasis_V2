import { View, Text, Pressable, Image, ScrollView, ActivityIndicator, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import ColorList from "../../../components/ColorList";
import StyleOfIndex from "../../../assets/style/home";
import Icon from 'react-native-vector-icons/FontAwesome6'; 

SplashScreen.preventAutoHideAsync();

export default function Index() {
    const [fontsLoaded] = useFonts({
        'Poppins_Regular': require('../../../assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins_Bold': require('../../../assets/fonts/poppins/Poppins-Bold.ttf'),
        'Poppins_Light': require('../../../assets/fonts/poppins/Poppins-Light.ttf')
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const router = useRouter();

    const buttonsData = [
        { image: require("@/assets/images/logotipo-provas/enem.svg"), route: "/pages/main/pagesRoot/vestibularPageEnem" },
        { image: require("@/assets/images/logotipo-provas/vunesp.svg"), route: "/pages/main/pagesRoot/vestibularPageVunesp" },
        { image: require("@/assets/images/logotipo-provas/usp.svg"), route: "/pages/main/pagesRoot/vestibularPageUsp" },
    ];

    const buttonDataConcursos = [
        { image: require("@/assets/images/logotipo-provas/correios.svg"), route: "/pages/main/pagesRoot/correiosPage" },
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
                    <Text style={StyleOfIndex.styletitle}>Vestibulares?</Text>
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
