import NavBar from "@/components/NavBar"; // Importe sua NavBar aqui
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <NavBar />

      <Stack screenOptions={{ 
        headerShown: false, 
        contentStyle: { backgroundColor: '#051C2C' } 
      }}>
        <Stack.Screen name="index" />
      </Stack>
      
    </GluestackUIProvider>
  );
}