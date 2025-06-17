import { Text, View, SafeAreaView, ImageBackground,Image, Pressable } from "react-native";
import { Link } from "expo-router";
import Estilo from '../assets/style/indexSplash'

export default function Index() {
  return (
    <SafeAreaView style={Estilo.fundo}>
      <View style={Estilo.container}>
        <ImageBackground 
          source={require('../assets/images/forma001.png')} 
          style={Estilo.forma001} 
          resizeMode="contain" 
        />
      </View>
      <View style={Estilo.title}>
        <Image source={require('../assets/images/titulo.png')}/>
      </View>
      <View style={Estilo.container002}>
        <ImageBackground 
          source={require('../assets/images/forma002.png')} 
          style={Estilo.forma002} 
          resizeMode="contain" 
        />
      </View>
      <View style={Estilo.botao}>
        <Pressable>
        <Link href={'./pages/splashInfo001'}>
        <Image source={require('../assets/images/botao001.png')}/>
        </Link>
        </Pressable>
      </View>
      
    </SafeAreaView>
  );
}
