import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Icon } from "@/components/ui/icon";
import {ShoppingCart, User} from "lucide-react-native";
import { Link } from "expo-router";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import { Pressable } from "react-native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {Image} from "@/components/ui/image";

import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input"

import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { SearchIcon } from "@/components/ui/icon";

import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";

import HomestayPage from "@/components/HomestayPage";

import Header from "@/components/Header";
import LowerHeader from "@/components/LowerHeader";

const cartItemNumber = useCart(state => state.items.length);
const queryClient = new QueryClient();

export default function RootLayout() {

    return (
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider>
                <Header/>
                <LowerHeader/>
                {/* <HomestayPage /> */}
           

                {/* <Center className="mt-5">
                    
                    <Text className="font-semibold">Easy</Text>
                    <Divider className="my-0.5" />
                    <Text className="font-semibold">Difficult</Text>
                    <Divider className="my-0.5" />
                </Center> */}

                <Stack
                    screenOptions={{headerShown: false}}
                >
                   
                </Stack>
                {/* <Stack>
                    <Stack.Screen name="index" options={{ title: "Shop"}}/>
                    <Stack.Screen name="product/[id]" options={{ title: "Product"}}/>
                </Stack> */}
                {/* <Stack
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
                </Stack> */}
            </GluestackUIProvider>
        </QueryClientProvider>
    )
}