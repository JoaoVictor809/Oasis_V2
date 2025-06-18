import React, { useEffect, useState } from 'react';
import { View, Text } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          router.replace('/pages/main');
        } else {
          router.replace('/pages/main/login');
        }
      } catch (e) {
        console.error("Failed to load token", e);
        // Fallback to login on error, ensuring the user isn't stuck.
        router.replace('/pages/main/login');
      } finally {
        // Optional: Set a timeout to ensure loading screen is visible
        // setTimeout(() => setIsLoading(false), 500);
        setIsLoading(false);
      }
    })();
  }, [router]); // Added router to dependency array as it's used in useEffect

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  // When not loading, render nothing as redirection has already occurred.
  return null;
}
