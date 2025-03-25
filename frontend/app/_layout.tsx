import { Stack } from "expo-router";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import "@/global.css";

export default function RootLayout() {
    return (
        <GluestackUIProvider>
            <Stack screenOptions={{contentStyle: {flex: 1}}} >
                <Stack.Screen name="index" options={{ title: "Shop"}}/>
                <Stack.Screen name="product/[id]" options={{ title: "Product"}}/>
            </Stack>
        </GluestackUIProvider>
    )
}