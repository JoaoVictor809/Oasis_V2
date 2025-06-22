import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native'; // Add this import
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../../assets/style/EditProfile'

const EditProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const router = useRouter();
  const isFocused = useIsFocused(); // Add this line

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingAuth(true);
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setIsAuthenticated(true);
          try {
            const API_BASE_URL = 'http://localhost:3000/api';
            const response = await axios.get(`${API_BASE_URL}/user/profile`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data?.username) {
              setUsername(response.data.username);
              setCurrentUsername(response.data.username);
              // Se quiser carregar imagem do backend, adicione aqui
            } else {
              Alert.alert("Erro", "Não foi possível carregar o nome de usuário.");
            }
          } catch (apiError) {
            console.error("Erro ao buscar perfil:", apiError);
            if (axios.isAxiosError(apiError) && apiError.response?.status === 401) {
              await AsyncStorage.removeItem('userToken');
              setIsAuthenticated(false);
              router.replace('/pages/main/login');
            } else {
              Alert.alert("Erro", "Falha ao conectar com o servidor.");
            }
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    if (isFocused) { // Only run loadData if the screen is focused
      loadData();
    }
  }, [isFocused, router]); // Add isFocused to the dependency array

  const handleSave = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      Alert.alert('Erro', 'O nome de usuário não pode estar vazio.');
      return;
    }

    if (trimmedUsername === currentUsername) {
      Alert.alert('Atenção', 'O novo nome é igual ao atual.');
      return;
    }

    setIsSaving(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
        setIsAuthenticated(false);
        router.replace('/pages/main/login');
        return;
      }

      const API_BASE_URL = 'http://localhost:3000/api';
      await axios.put(
        `${API_BASE_URL}/user/profile`,
        { username: trimmedUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCurrentUsername(trimmedUsername);
      Alert.alert('Sucesso', 'Nome de usuário atualizado com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          await AsyncStorage.removeItem('userToken');
          setIsAuthenticated(false);
          router.replace('/pages/main/login');
        } else {
          Alert.alert('Erro', error.response?.data?.message || 'Erro ao atualizar perfil.');
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permita acesso à galeria para escolher uma foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleLogout = async () => {
    // Set loading state true if you have a visual indicator for logout process
    // setIsLoadingAuth(true); 
    try {
      await AsyncStorage.removeItem('userToken');
      setIsAuthenticated(false); // Update auth state
      router.replace('/pages/main/login'); // Redirect to login
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Erro", "Não foi possível fazer logout. Tente novamente.");
    } finally {
      // Ensure loading state is reset if it was used
      // setIsLoadingAuth(false);
    }
  };

  const isSaveDisabled = username.trim() === '' || username.trim() === currentUsername;

  if (isLoadingAuth && !isAuthenticated) { // Adjusted condition to show loader primarily on initial auth check
    return (
      <SafeAreaView style={styles.centeredLoader}>
        <ActivityIndicator size="large" color="#1261D7" />
        <Text>Carregando...</Text> 
      </SafeAreaView>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.centeredContent]}>
          <Text style={styles.authMessage}>Você não está autenticado.</Text>
          <Text style={styles.authSuggestion}>Por favor, faça login para editar seu perfil.</Text>
          <Button
            title="Ir para Login"
            onPress={() => router.replace('/pages/main/login')}
            color="#1261D7"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.boxImg01}><Image source={require('../../../assets/images/shape01.png')}/></View>

    <View style={styles.boxImg02}><Image source={require('../../../assets/images/shape02.png')}/></View>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton} disabled={isSaving || isLoadingAuth}>
          <Ionicons name="arrow-back" size={24} color="#1261D7" />
        </Pressable>
      </View>

      {isLoadingAuth ? (
        <View style={styles.centeredLoader}>
          <ActivityIndicator size="large" color="#1261D7" />
          <Text>Carregando perfil...</Text>
        </View>
      ) : (
        <>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={pickImage} disabled={isSaving || isLoadingAuth}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person-circle-outline" size={100} color="#ccc" />
                  <Text style={styles.changePhotoText}>Adicionar Foto</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Nome de Usuário:</Text> 
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Digite seu novo nome de usuário"
              autoCapitalize="none"
              editable={!isSaving && !isLoadingAuth}
            />
            <Button
              title={isSaving ? "Salvando..." : "Salvar Alterações"}
              onPress={handleSave}
              disabled={isSaveDisabled || isSaving || isLoadingAuth}
              color="#1261D7"
            />
            <View style={styles.logoutButtonContainer}>
              <Button
                title="Logout"
                onPress={handleLogout}
                color="#D32F2F" 
                disabled={isSaving || isLoadingAuth}
              />
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};


export default EditProfileScreen;
