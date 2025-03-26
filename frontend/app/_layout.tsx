import { Stack } from "expo-router";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import "@/global.css";
import { Icon } from "../components/ui/icon";
import {ShoppingCart, User} from "lucide-react-native";
import { Link } from "expo-router";
import { useCart } from "../store/cartStore";
import { Text } from "../components/ui/text";
import { Pressable } from "react-native";

export default function RootLayout() {

    const cartItemNumber = useCart(state => state.items.length);

    return (
        <GluestackUIProvider>
            <Stack
                screenOptions={{
                contentStyle: {flex: 1}, 
                headerRight: () => (
                    <Link href="/cart">
                        <Pressable className="flex-row gap-2">
                            <Icon as={ShoppingCart}/>
                            {cartItemNumber > 0 && (<Text>{cartItemNumber}</Text>)}
                        </Pressable>
                    </Link>
                ),
                headerLeft: () => (
                    <Link href="/login">
                        <Pressable className="flex-row gap-2">
                            <Icon as={User}/>
                        </Pressable>
                    </Link>
                )
                    
            }} >
                <Stack.Screen name="index" options={{ title: "Shop"}}/>
                <Stack.Screen name="product/[id]" options={{ title: "Product"}}/>
            </Stack>
        </GluestackUIProvider>
    )
}