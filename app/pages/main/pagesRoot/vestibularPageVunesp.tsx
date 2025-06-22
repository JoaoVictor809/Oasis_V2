import { View, Text, Pressable, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Link } from "expo-router";
import StyleOfVestibular from "@/assets/style/vestibularPages";
import { Stack, useRouter } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function VestibularScreen() {
    const [fontsLoaded] = useFonts({
        'Poppins_Regular': require('../../../../assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins_Bold': require('../../../../assets/fonts/poppins/Poppins-Bold.ttf'),
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

    return (
        <View style={StyleOfVestibular.background}>
            <View style={StyleOfVestibular.header}>
                <Pressable>
                    <Link href={'../'}>
                    <Image style={{width:30, height:30}} source={require('@/assets/images/Back.png')}/>
                    </Link>
                </Pressable>
                <View style={StyleOfVestibular.headerTitle}>
                    <Text style={{fontFamily:'Poppins_Bold', color:'#fff', fontSize:20}}>Vunesp</Text>
                    <Text style={{fontFamily:'Poppins_Regular', color:'#fff', fontSize:15}}>-Fundação para o Vestibular da Universidade Estadual Paulista</Text>
                </View>
            </View>
            <ScrollView 
                style={StyleOfVestibular.background} 
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={true}
            >
                <View style={StyleOfVestibular.container}>
                    <Image
                        source={require("@/assets/images/logotipo-provas/image3.png")}
                        style={StyleOfVestibular.image}
                    />
                    <Text style={StyleOfVestibular.mainTitle}>  Vunesp</Text>
                    <Text style={StyleOfVestibular.subtitle}>Médio</Text>
                </View>

                <View style={StyleOfVestibular.container}>
                    <Text style={StyleOfVestibular.mainTitle}>Vestibular do Enem</Text>

                    <Text style={StyleOfVestibular.paragraph}>
                        E aí, futuro(a) universitário(a)? O Enem é o caminho para a faculdade dos sonhos, 
                        mas a preparação pode ser um desafio. Com o Oasis, você vai ter a força que precisa! 
                        Criado para te ajudar a superar as dificuldades, nosso app é a sua chave para o sucesso.
                    </Text>

                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={StyleOfVestibular.subtitle}>
                            Conteúdo Personalizado: Aprende no seu ritmo, focado no que precisa!
                        </Text>
                        <Text style={StyleOfVestibular.subtitle}>
                            Material Divertido: Videoaulas, exercícios, tudo para tornar o aprendizado uma aventura!
                        </Text>
                        <Text style={StyleOfVestibular.subtitle}>
                            Simulados Realistas: Treine com provas que imitam o Enem, para você chegar confiante no dia do exame.
                        </Text>
                    </View>

                    <Text style={StyleOfVestibular.paragraph}>
                        No Oasis, você não está sozinho! Estamos aqui para te ajudar a conquistar a vaga que você tanto deseja.
                    </Text>

                    <Text style={StyleOfVestibular.secondaryText}>Gere agora e comece a sua jornada!</Text>
                    <Pressable 
                        style={{ 
                            backgroundColor: '#1261D7', 
                            paddingVertical: 10, 
                            paddingHorizontal: 50, 
                            borderRadius: 20, 
                            alignItems: 'center', 
                            marginTop: 30 
                        }}
                        onPress={() => router.push('../../telaloading')}
                    >
                        <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins_Bold', fontSize: 20 }}>
                            Gerar
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}
