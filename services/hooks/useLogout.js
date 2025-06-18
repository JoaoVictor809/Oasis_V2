import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export function useLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      router.replace('/pages/main/login');
    } catch (error) {
      console.error('Failed to logout:', error);
      // Optionally, display an error message to the user
      // Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return handleLogout;
}
