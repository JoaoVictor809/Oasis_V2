import React, { useState } from 'react';
import { View, Text, Image, Pressable, SafeAreaView, ImageBackground, TextInput, Alert } from 'react-native';
import Estilo from '../../assets/style/login';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../services/hooks/useLogin';
import axios from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const data = await loginUser({ email, password: senha });

      if (!data.token) {
        Alert.alert('Erro', 'Token não recebido.');
        return;
      }

      await AsyncStorage.setItem('userToken', data.token);

      console.log('Login realizado com sucesso!');
      router.push('./'); 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
          Alert.alert('Erro', 'Senha incorreta.');
        } else if (status === 404) {
          Alert.alert('Erro', 'Usuário não encontrado.');
        } else {
          Alert.alert('Erro', 'Erro ao realizar login.');
        }

        console.error('Erro no login:', error.message);
      } else {
        Alert.alert('Erro', 'Erro inesperado.');
        console.error('Erro desconhecido:', error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1261D7" }}>
      <View style={Estilo.container}>
        <ImageBackground
          source={require('../../assets/images/forma001.png')}
          style={Estilo.forma001}
          resizeMode="contain"
        />
      </View>

      <View style={Estilo.title}>
        <Text style={Estilo.txt}>Bem vindo{'\n'}Novamente</Text>
        <Text style={{ fontFamily: "Fonte-texto", color: "#fff", textAlign: "center" }}>
          Seu estudo personalizado está pronto. Faça{'\n'}
          login para uma experiência de aprendizado adaptada!
        </Text>

        <View style={Estilo.containerInput}>
          <TextInput
            style={Estilo.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={Estilo.input}
            onChangeText={setSenha}
            value={senha}
            placeholder="Senha"
            secureTextEntry={true}
          />

          <Pressable onPress={handleLogin}>
            <View style={Estilo.enter}>
              <Text style={{ fontFamily: "Poppins_Bold", color: "#fff", fontSize: 20 }}>Entrar</Text>
            </View>
          </Pressable>
        </View>

        <View style={Estilo.containerRegister}>
          <Text style={Estilo.textRegister}>Não possui conta ainda?</Text>
          <Pressable onPress={() => router.push('../../pages/register')}>
            <Text style={[Estilo.textRegister, { borderBottomWidth: 2, borderColor: '#fff' }]}>Registrar</Text>
          </Pressable>
        </View>
      </View>

      <View style={Estilo.container002}>
        <ImageBackground
          source={require('../../assets/images/forma002.png')}
          style={Estilo.forma002}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}
