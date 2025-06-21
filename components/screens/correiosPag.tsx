import { View, Text, Image, ScrollView, Button,StyleSheet } from "react-native";
import React, { useEffect, useRef, useCallback, useMemo, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import StyleOfVestibular from "@/assets/style/vestibularPages";
import { Link } from "expo-router";
import { GestureHandlerRootView, Pressable } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import CustomBackground from '@/components/CustomBackground'; 
import MenuDrop001 from '../menuDrop/menuDrop001'
import MenuDrop002 from '../menuDrop/menuDrop002'
import MenuDrop003 from '../menuDrop/menuDrop003'
import { Stack, useRouter } from "expo-router";



SplashScreen.preventAutoHideAsync();

export default function ConcursoScreen() {
    const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '50%', '80%'], []);

  const hqandleOpenPress = () => bottomSheetRef.current?.expand();
  const hqandleClosePress = () => bottomSheetRef.current?.close();

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

    const [fontsLoaded] = useFonts({
        'Poppins_Regular': require('../../assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins_Bold': require('../../assets/fonts/poppins/Poppins-Bold.ttf'),
    });

    const [selected001, setSelected001] = useState<string>('');
    const [selected002, setSelected002] = useState<string>('');
    const [selected003, setSelected003] = useState<string>('');

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
        
        <GestureHandlerRootView style={StyleOfVestibular.background}>
            <View style={StyleOfVestibular.header}>
                <Pressable>
                    <Link href={'../'}>
                    <Image style={{width:30, height:30}} source={require('@/assets/images/Back.png')}/>
                    </Link>
                </Pressable>
                <View style={StyleOfVestibular.headerTitle}>
                    <Text style={{fontFamily:'Poppins_Bold', color:'#fff', fontSize:20}}>Correios</Text>
                    <Text style={{fontFamily:'Poppins_Regular', color:'#fff', fontSize:15}}>- Agente de Correios</Text>
                </View>
            </View>
            <ScrollView 
                style={StyleOfVestibular.background} 
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={true}
            >
                
                <View style={StyleOfVestibular.container}>
                    <Image
                        source={require("@/assets/images/logotipo-provas/correiosAzul.svg")}
                        style={StyleOfVestibular.image}
                    />
                    <Text style={StyleOfVestibular.mainTitle}>Correios</Text>
                    <Text style={StyleOfVestibular.subtitle}>Médio</Text>
                </View>

                <View style={StyleOfVestibular.container}>
                    <Text style={StyleOfVestibular.mainTitle}>Concurso público</Text>

                    <Text style={StyleOfVestibular.paragraph}>
                       E aí, futuro(a) concursado(a)? O concurso público é o caminho para o emprego dos sonhos, 
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
                        onPress={hqandleOpenPress}
                    >
                        <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins_Bold', fontSize: 20 }}>
                            Gerar
                        </Text>
                    </Pressable>
                    <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundComponent={(props) => <CustomBackground {...props} />}
        style={styles.bottomSheet} 
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Informações</Text>
            <Pressable onPress={hqandleClosePress} >
                <Image source={require('@/assets/images/icons/close.png')}/>
            </Pressable>
          </View>
          <View style={styles.containerOption}>
          <MenuDrop001 selected={selected001} setSelected={setSelected001} />
          <MenuDrop002 selected={selected002} setSelected={setSelected002} />
          <MenuDrop003 selected={selected003} setSelected={setSelected003} />
          </View>
          <Pressable onPress={() => router.push('../../telaloading')}>
            <View style={styles.buttonGo}>
               <Image source={require('@/assets/images/go.png')}/>
          </View>
          </Pressable>
          
          
        </BottomSheetView>
      </BottomSheet>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
        
        
    );
}

const styles = StyleSheet.create({
   
    contentContainer: {
      flex: 1,
      padding: 36,
      alignItems: 'center',
      gap:25
    },
    title: {
      fontSize: 30,
      fontFamily: 'Poppins_Bold',
      color:'#fff'
    },
    bottomSheet: {
      borderTopLeftRadius: 40, 
      borderTopRightRadius: 40, 
      overflow: 'hidden', 
    },
    containerTitle:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      width:'100%'
    },
    containerOption:{
      width:'100%',
      gap:18
    },
    buttonGo:{
      backgroundColor:'#1261D7',
      padding:13,
      width:160,
      borderRadius:20,
      alignItems:'center',
      cursor:'pointer'
    }
  });