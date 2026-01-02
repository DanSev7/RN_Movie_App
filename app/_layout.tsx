import { Stack } from "expo-router";
// // Temporarily disabled due to Node.js v22 + Expo metro config incompatibility
import './globals.css' 
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />

      <Stack>
      <Stack.Screen
      name="(tabs)"
      options={{headerShown: false}}
      />
      <Stack.Screen
      name="movies/[id]"
      options={{headerShown: false}}
      />
      </Stack>
    </>
  )
}
