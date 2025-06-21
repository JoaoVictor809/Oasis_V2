import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Pressable, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const EditProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentName, setCurrentName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        console.log("EditProfileScreen: loadData started.");
        setIsLoadingAuth(true);
        let token = null;
        try {
          token = await AsyncStorage.getItem('userToken');
          console.log("EditProfileScreen: Token from AsyncStorage -", token ? "Exists" : "Not Found");

          if (token) {
            setIsAuthenticated(true); // Optimistic: assume token is valid for now.
            console.log("EditProfileScreen: Token found. Attempting to fetch profile data.");
            // API_BASE_URL is accessible from component scope
            const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data) {
              console.log("EditProfileScreen: Profile data fetched successfully.");
              const userData = response.data.user || response.data;
              setName(userData.name || userData.username || '');
              setCurrentName(userData.name || userData.username || '');
              setEmail(userData.email || '');
              setCurrentEmail(userData.email || '');
              // setIsAuthenticated(true); // Already set optimistically
            } else {
              console.warn("EditProfileScreen: Profile data not found in API response (response.data is falsy), but token was initially valid. Clearing fields.");
              setName(''); setCurrentName(''); setEmail(''); setCurrentEmail('');
              // Keep isAuthenticated = true as token was present. User will see empty fields.
              // Consider if this state (valid token, no profile data) should lead to different UI or error message.
            }
          } else {
            console.log("EditProfileScreen: No token found. Setting unauthenticated and redirecting to login.");
            setIsAuthenticated(false);
            setName(''); setCurrentName(''); setEmail(''); setCurrentEmail('');
            router.replace('/pages/main/login');
            setIsLoadingAuth(false); // Ensure loading is stopped before returning
            return;
          }
        } catch (error) {
          console.error("EditProfileScreen: Error during API call to /api/user/profile or AsyncStorage:", error);
          // If error is from AsyncStorage.getItem itself, token would be null, handled above.
          // This catch is primarily for axios errors now if token was present.
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log("EditProfileScreen: API call returned 401. Invalid/expired token. Logging out and redirecting.");
            Alert.alert("Sessão expirada", "Por favor, faça login novamente.");
            try { await AsyncStorage.removeItem('userToken'); } catch (e) { console.error("Failed to remove token after 401", e); }
          } else {
            console.log("EditProfileScreen: API call failed (non-401) or other error. Keeping user authenticated status as true (since token was present), showing error alert.");
            Alert.alert("Erro", "Não foi possível carregar seus dados. Verifique sua conexão ou tente mais tarde.");
          }
          // For any error after a token was initially assumed valid, clear fields and redirect.
          // If it was a 401, user is logged out. If other API error, they are still "logged in" but data failed to load.
          // The decision to redirect here depends on desired UX for non-401 API errors.
          // Forcing redirect on ANY error after token presence might be too aggressive.
          // Let's refine: only redirect on 401 or if token was never there.
          // For other API errors, they stay on screen but see an error + cleared fields.
          setName(''); setCurrentName(''); setEmail(''); setCurrentEmail('');
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            setIsAuthenticated(false); // Only set to false for 401, otherwise keep optimistic true
            router.replace('/pages/main/login');
          } else if (!token) { // Should have been caught by the if(!token) block earlier, but as a safeguard
            setIsAuthenticated(false);
            router.replace('/pages/main/login');
          }
          // If it's another API error (not 401) and token was present, user remains authenticated but with no data.
        } finally {
          setIsLoadingAuth(false);
          console.log("EditProfileScreen: loadData finished.");
        }
      };

      loadData();

      return () => {
        // Optional: Cleanup logic when the screen loses focus
      };
    }, [])
  );

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
            console.log("LOGOUT_DEBUG: Logout confirmed by user. Starting logout process...");
            try {
              console.log("LOGOUT_DEBUG: Attempting to remove userToken from AsyncStorage...");
              await AsyncStorage.removeItem('userToken');
              console.log("LOGOUT_DEBUG: AsyncStorage.removeItem('userToken') call completed.");
            } catch (error) {
              console.error("LOGOUT_DEBUG: Error removing userToken from AsyncStorage:", error);
            }

            console.log("LOGOUT_DEBUG: Setting isAuthenticated state to false...");
            setIsAuthenticated(false);
            console.log("LOGOUT_DEBUG: isAuthenticated state update initiated.");

            console.log("LOGOUT_DEBUG: Attempting to navigate to /pages/main/login using router.replace()...");
            router.replace('/pages/main/login');
            console.log("LOGOUT_DEBUG: router.replace('/pages/main/login') call initiated."); // This log might not always show if navigation is immediate.
          },
        },
      ]
    );
  };

  const isSaveDisabledLogic = () => {
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

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.centeredLoader}>
        <Text>Redirecionando para o login...</Text>
      </SafeAreaView>
    );
  }

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
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default EditProfileScreen;
