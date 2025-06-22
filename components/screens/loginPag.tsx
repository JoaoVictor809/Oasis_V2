import React, { useState } from 'react';
import { View, Text, Image, Pressable, SafeAreaView, ImageBackground, TextInput, Alert, TouchableOpacity } from 'react-native';
import Estilo from '../../assets/style/login';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../services/hooks/useLogin';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (params?.fromRegister === 'true' && !hasShownToast) {
      Toast.show({
        type: 'success',
        text1: 'Usuário cadastrado!',
        text2: 'Faça login para continuar.',
        position: 'top',
      });
      setHasShownToast(true);
    }
  }, [params, hasShownToast]);

  const handleLogin = async () => {
    if(!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Campos vazios',
        text2: 'Preencha todos os campos.',
        position: 'top',
      });
      return; // Return here to prevent further execution
    }

    try {
      const data = await loginUser({ email, password: password });

      if (!data.token) {
        // This case might indicate a server-side issue not caught by typical error statuses
        Toast.show({
            type: 'error',
            text1: 'Erro de Login',
            text2: 'Token não recebido do servidor.',
            position: 'top',
        });
        return;
      }

      await AsyncStorage.setItem('userToken', data.token);

      console.log('Login realizado com sucesso!');
      // This is the redirect that needs to be preserved:
      router.replace('/pages/main/EditProfileScreen'); 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
          Toast.show({
            type: 'error',
            text1: 'Senha incorreta',
            text2: 'Informe a senha correta.',
            position: 'top',
          });
        } else if (status === 404) {
          Toast.show({
            type: 'error',
            text1: 'Usuário não encontrado',
            text2: 'Verifique o e-mail informado.',
            position: 'top',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Erro ao realizar o login',
            text2: error.response?.data?.message || 'Tente novamente mais tarde.',
            position: 'top',
          });
        }        

        console.error('Erro no login:', error.message);
      } else {
        Toast.show({
            type: 'error',
            text1: 'Erro Desconhecido',
            text2: 'Ocorreu um erro inesperado.',
            position: 'top',
        });
        console.error('Erro desconhecido:', error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1261D7" }}>
      <Toast />
      <View style={Estilo.container}>
        <ImageBackground
          source={require('../../assets/images/forma001.png')}
          style={Estilo.forma001}
          resizeMode="contain"
        />
      </View>

      <View style={Estilo.title}>
        <Text style={Estilo.txt}>Bem vindo Novamente</Text>
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
            placeholderTextColor="#rgba(255,255,255,0.7)" // Added placeholder text color for consistency
          />
          <View style={Estilo.boxInput}>
            <TextInput
              style={Estilo.inputPassword}
              onChangeText={setPassword}
              value={password}
              placeholder="Senha"
              secureTextEntry={!showPassword}
              keyboardType="default"
              placeholderTextColor="#rgba(255,255,255,0.7)" // Added placeholder text color
            />
            {/* Ensure password state is used for length check */}
            {password.length > 0 && ( 
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 10, top: 10 }} // Adjust styling as needed from Estilo.icon
              >
                <Icon name={showPassword ? 'eye-slash' : 'eye'} size={24} color="#FFF" />
              </TouchableOpacity>
            )}
          </View>

          {/* Changed Pressable to TouchableOpacity for consistency if desired, or keep Pressable */}
          <TouchableOpacity onPress={handleLogin}> 
            <View style={Estilo.enter}>
              <Text style={{ fontFamily: "Poppins_Bold", color: "#fff", fontSize: 20 }}>Entrar</Text>
            </View>
          </TouchableOpacity>

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
