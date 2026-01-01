import { Stack } from "expo-router";
// // Temporarily disabled due to Node.js v22 + Expo metro config incompatibility
import './globals.css' 

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
    name="(tabs)"
    options={{headerShown: false}}
    />
    <Stack.Screen
    name="movies/[id]"
    options={{headerShown: false}}
    />
    </Stack>
}
