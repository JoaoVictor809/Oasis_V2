import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Pressable, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; // Link removed as it's not used
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const EditProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // Password state removed
  const router = useRouter();

  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  // isAuthenticated state is still useful to manage showing loader vs content,
  // or potentially redirecting if auth fails mid-session.
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume authenticated initially, useEffect will verify
  const [currentName, setCurrentName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingAuth(true);
      let token = null;
      try {
        token = await AsyncStorage.getItem('userToken');
        if (token) {
          // setIsAuthenticated(true); // Already assumed true, or set after successful fetch
          try {
            const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data) {
              const userData = response.data.user || response.data;
              setName(userData.name || userData.username || '');
              setCurrentName(userData.name || userData.username || '');
              setEmail(userData.email || '');
              setCurrentEmail(userData.email || '');
              setIsAuthenticated(true); // Confirm authentication
            } else {
              console.warn('No data received in API response for user profile. Response:', response);
              Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
              setIsAuthenticated(false); // Failed to get data, consider unauthenticated
              router.replace('/pages/main/login');
            }
          } catch (apiError) {
            console.error("Error fetching user profile:", apiError);
            if (axios.isAxiosError(apiError) && apiError.response?.status === 401) {
              Alert.alert("Sessão expirada", "Por favor, faça login novamente.");
              try { await AsyncStorage.removeItem('userToken'); } catch (e) { console.error("Failed to remove token after 401", e); }
            } else {
              Alert.alert("Erro de Rede", "Não foi possível conectar ao servidor.");
            }
            setIsAuthenticated(false); // Set to false on any API error
            router.replace('/pages/main/login');
          }
        } else {
          // No token found, definitely not authenticated
          setIsAuthenticated(false);
          setName(''); // Clear fields
          setCurrentName('');
          setEmail('');
          setCurrentEmail('');
          router.replace('/pages/main/login');
        }
      } catch (error) {
        console.error("Error during initial data load or token retrieval:", error);
        setIsAuthenticated(false);
        setName('');
        setCurrentName('');
        setEmail('');
        setCurrentEmail('');
        router.replace('/pages/main/login');
      } finally {
        setIsLoadingAuth(false);
      }
    };
    loadData();
  }, []);

  const handleSave = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      Alert.alert('Erro', 'O nome não pode estar vazio.');
      return;
    }
    if (trimmedEmail && !trimmedEmail.includes('@')) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    if (trimmedName === currentName && trimmedEmail === currentEmail) {
      Alert.alert('Atenção', 'Nenhuma alteração detectada nos dados.');
      return;
    }

    setIsSaving(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert("Erro de Autenticação", "Token não encontrado. Por favor, faça login novamente.");
        setIsAuthenticated(false);
        router.replace('/pages/main/login');
        return;
      }

      const payload = {};
      if (trimmedName !== currentName) payload.name = trimmedName;
      if (trimmedEmail !== currentEmail) payload.email = trimmedEmail;

      if (Object.keys(payload).length === 0) {
           Alert.alert('Atenção', 'Nenhuma alteração detectada para salvar.');
           setIsSaving(false);
           return;
      }

      await axios.put(`${API_BASE_URL}/api/user/update`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (payload.name) setCurrentName(payload.name);
      if (payload.email) setCurrentEmail(payload.email);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');

    } catch (error) {
      console.error("Error updating profile:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        Alert.alert("Sessão expirada", "Sua sessão expirou. Por favor, faça login novamente.");
        try { await AsyncStorage.removeItem('userToken'); } catch (e) { console.error("Failed to remove token after 401", e); }
        setIsAuthenticated(false);
        router.replace('/pages/main/login');
      } else {
        const message = axios.isAxiosError(error) && error.response?.data?.message
                        ? error.response.data.message
                        : 'Não foi possível atualizar o perfil. Tente novamente.';
        Alert.alert('Erro ao Atualizar', message);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Você tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
            } catch (error) {
              console.error("Failed to remove token during logout:", error);
            }
            setIsAuthenticated(false);
            router.replace('/pages/main/login');
          },
        },
      ]
    );
  };

  const isSaveDisabledLogic = () => {
    // Simplified for editing only
    return (name.trim() === currentName && email.trim() === currentEmail) || name.trim() === '' || isSaving;
  };

  if (isLoadingAuth) {
    return (
      <SafeAreaView style={styles.centeredLoader}>
        <ActivityIndicator size="large" color="#1261D7" />
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  // If, after loading, not authenticated, this screen shouldn't render its form.
  // The useEffect should have redirected to login.
  // This is a fallback or can be a brief "redirecting..." message if desired.
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.centeredLoader}>
        <Text>Redirecionando para o login...</Text>
      </SafeAreaView>
    );
  }

  // Authenticated view
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton} disabled={isSaving}>
          <Ionicons name="arrow-back" size={24} color="#1261D7" />
        </Pressable>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileIconContainer}>
          <Ionicons name="person-circle-outline" size={100} color="#CCCCCC" style={styles.profileIcon} />
        </View>

        <Text style={styles.label}>Nome:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Digite seu nome" autoCapitalize="words" editable={!isSaving} />

        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Digite seu email" keyboardType="email-address" autoCapitalize="none" editable={!isSaving} />

        {/* Password input removed */}

        <View style={styles.buttonContainer}>
          <Button
            title={isSaving ? "Salvando..." : "Salvar Alterações"}
            onPress={handleSave}
            disabled={isSaveDisabledLogic()}
            color="#1261D7" />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Logout" onPress={handleLogout} color="#FF3B30" disabled={isSaving} />
        </View>
      </ScrollView>
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
    marginRight: 30,
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  profileIconContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileIcon: {
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    alignSelf: 'flex-start',
    width: '100%',
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
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  // Removed loginPromptContainer, loginPromptText, loginPromptLink as they were for registration
  centeredContent: { // This style was for the unauthenticated message block, which is now just a loader/redirect message
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default EditProfileScreen;
