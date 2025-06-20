import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins_Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins_Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf'),
    // Add other fonts if needed, e.g., 'SpaceMono-Regular'
    // 'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
    if (fontError) {
      console.error("Font loading error in RootLayout:", fontError);
      // It might be useful to alert the user or have fallback fonts
    }
  }, [fontsLoaded, fontError]);

  // If fonts are not loaded and there's no error yet, show nothing or a loading screen.
  // If there's a font error, we might still try to render the app with system fonts,
  // or show an error message. For now, if fontsLoaded is false, we return null.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // If fonts are loaded or there was an error (and we decided to proceed), render the app structure
  return (
    <Stack screenOptions={{ headerShown: false, title: " " }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      {/* Add other Stack.Screen configurations if they were originally present
          or if they should be part of the root layout.
          The original file had an incomplete Stack closing tag, so I'm ensuring it's correct.
      */}
    </Stack>
  );
}
