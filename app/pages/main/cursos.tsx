import { View, Text, TextInput, Pressable, Image, ScrollView, Dimensions, ImageBackground, StyleSheet } from "react-native"
import React, { useState } from "react";
import Estilo from '../../../assets/style/curso'
import Slider from "@/components/Slider";
import { ImageSlider } from '@/data/SliderData'
import ListCurso001 from '@/components/curso/curso001'
import Icon from 'react-native-vector-icons/FontAwesome6'; 

//pega a altura 
const { height } = Dimensions.get('window');
export default function curso() {

    const [text, onChangeText] = React.useState('');
    const [fontsLoaded] = useFonts({
        'Poppins_Regular': require('../../../assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins_Bold': require('../../../assets/fonts/poppins/Poppins-Bold.ttf')
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

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Estilo.formaImg}>
                <ImageBackground
                    source={require('@/assets/images/formas/formaCurso001.png')} />
            </View>
            <View style={Estilo.main}>
                <View style={Estilo.header}>
                    <View>
                        <Text style={Estilo.title}><h1>Cursos</h1></Text>
                    </View>
                    <View style={Estilo.boxSearch}>
                        <TextInput
                            style={[Estilo.input, { outlineWidth: 0 }]} 
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Pesquise o nome do curso"
                            keyboardType="email-address"  
                        />
                        <View style={Estilo.imgSearch}>
                            <Pressable>
                               <Icon name="magnifying-glass" solid color={'#7F8FAF'} size={27}/>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={[Estilo.containerMain, { height }]}>

                    <View style={styles.Container}>
                        <Slider itemList={ImageSlider} />
                    </View>

                    <View>
                        <ListCurso001 />
                    </View>


                </View>

            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    Container: {

        paddingTop: 60
    }
})