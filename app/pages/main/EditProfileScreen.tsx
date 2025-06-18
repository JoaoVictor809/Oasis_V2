import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EditProfileScreen = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false); // New state for save operation

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingAuth(true);
      let token = null;
      try {
        token = await AsyncStorage.getItem('userToken');
        if (token) {
          setIsAuthenticated(true);
          try {
            const API_BASE_URL = 'http://localhost:3000/api';
            const response = await axios.get(`${API_BASE_URL}/user/profile`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data && response.data.username) {
              setUsername(response.data.username);
              setCurrentUsername(response.data.username);
            } else {
              console.warn('Username not found in API response:', response.data);
              Alert.alert("Erro", "Não foi possível carregar o nome de usuário.");
            }
          } catch (apiError) {
            console.error("Error fetching user profile:", apiError);
            if (axios.isAxiosError(apiError) && apiError.response?.status === 401) {
              Alert.alert("Sessão expirada", "Por favor, faça login novamente.");
              await AsyncStorage.removeItem('userToken');
              setIsAuthenticated(false);
              router.replace('/pages/main/login');
            } else {
              Alert.alert("Erro de Rede", "Não foi possível conectar ao servidor para buscar seu perfil.");
            }
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during initial data load:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    loadData();
  }, [router]);

  const handleSave = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      Alert.alert('Erro', 'O nome de usuário não pode estar vazio.');
      return;
    }
    if (trimmedUsername === currentUsername) {
      Alert.alert('Atenção', 'O novo nome de usuário é igual ao atual.');
      return;
    }

    setIsSaving(true);
    let token = null;
    try {
      token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert("Erro de Autenticação", "Token não encontrado. Por favor, faça login novamente.");
        setIsAuthenticated(false); // This should trigger redirect via the main conditional rendering
        // router.replace might be redundant if !isAuthenticated handles it, but good for explicit action
        if (router.canGoBack()) router.back(); else router.replace('/pages/main/login');
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
      console.error("Error updating username:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          Alert.alert("Sessão expirada", "Sua sessão expirou. Por favor, faça login novamente.");
          await AsyncStorage.removeItem('userToken');
          setIsAuthenticated(false);
          router.replace('/pages/main/login');
        } else if (error.response?.data?.message) {
          Alert.alert('Erro ao Atualizar', error.response.data.message);
        } else {
          Alert.alert('Erro ao Atualizar', 'Não foi possível atualizar o nome de usuário. Tente novamente.');
        }
      } else {
        Alert.alert('Erro Desconhecido', 'Ocorreu um erro inesperado durante a atualização.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const isSaveDisabled = username.trim() === '' || username.trim() === currentUsername;

  if (isLoadingAuth) {
    return (
      <SafeAreaView style={styles.centeredLoader}>
        <ActivityIndicator size="large" color="#1261D7" />
        <Text>Carregando perfil...</Text>
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
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton} disabled={isSaving}>
          <Ionicons name="arrow-back" size={24} color="#1261D7" />
        </Pressable>
        <Text style={styles.headerTitle}>Editar Nome de Usuário</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Novo Nome de Usuário:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Digite seu novo nome de usuário"
          autoCapitalize="none"
          editable={!isSaving} // Disable input while saving
        />
        <Button
          title={isSaving ? "Salvando..." : "Salvar Alterações"}
          onPress={handleSave}
          disabled={isSaveDisabled || isSaving} // Disable button if no changes, empty, or already saving
          color="#1261D7"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  centeredLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  authMessage: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  authSuggestion: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default EditProfileScreen;
