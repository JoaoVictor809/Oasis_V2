import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
  screenOptions={{ headerShown: false, title: " " }}>;
  <Stack.Screen 
  name='splashInfo001'
                options={{
                    headerShown: false
                }}
  />
  </Stack>
}
