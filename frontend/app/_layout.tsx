import React from "react";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

import { useCart } from "@/store/cartStore";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";



import Header from "@/components/header/Header";

//const cartItemNumber = useCart(state => state.items.length);
const queryClient = new QueryClient();

export default function RootLayout() {

    return (
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider>
                <Header/>
                <Stack
                    screenOptions={{headerShown: false}}
                >
                   
                </Stack>
            </GluestackUIProvider>
        </QueryClientProvider>
    )
}