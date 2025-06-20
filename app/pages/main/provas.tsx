import { View, Text, TextInput, Pressable, Image, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react"; // useEffect removed
// useFonts, SplashScreen imports removed
import Estilo from '../../../assets/style/provas';
import EnemLista from '../../../components/enemList';
import UnicampLista from '../../../components/unicampList';
import BdbLista from '../../../components/bdbList';
import Icon from 'react-native-vector-icons/FontAwesome6';

const { height } = Dimensions.get('window');

export default function prova() {
    const [text, onChangeText] = React.useState('');
    // useFonts call removed
    // useEffect for SplashScreen removed
    // if (!fontsLoaded) removed

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Estilo.main}>
                <View style={Estilo.header}>
                    <View>
                        <Text style={Estilo.title}><h1>Provas</h1></Text>
                    </View>
                    <View style={Estilo.boxSearch}>
                        <TextInput
                            style={[Estilo.input, { outlineWidth: 0 }]}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Pesquise o nome da prova"
                            keyboardType="default" />
                        <View style={Estilo.imgSearch}>
                            <Pressable>
                                <Icon name="magnifying-glass" solid color={'#7F8FAF'} size={27}/>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={[Estilo.containerMain, {height}]}>
                   <View style={Estilo.containerEenm}>
                    <ScrollView><EnemLista /></ScrollView>
                   </View>
                   <View>
                    <ScrollView><UnicampLista /></ScrollView>
                   </View>
                   <View>
                    <ScrollView><BdbLista /></ScrollView>
                   </View>
                </View>
            </View>
        </ScrollView>
    );
}
