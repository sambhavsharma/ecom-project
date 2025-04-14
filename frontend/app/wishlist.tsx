import { View, ScrollView, StyleSheet } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import {ImageBackground } from '@/components/ui/image-background';
import {Center } from '@/components/ui/center';
import ProductList from "@/components/widgets/ProductList";
import WishlistContent from "@/components/wishlist/WishlistContent";
import { Link } from "expo-router";

export default function HomeScreen() {

    return (
        <ScrollView>
            <View className="mx-auto mt-8">
                <WishlistContent/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    testClass: {
      height: 300,
      maxWidth: "100%",
    },
    bannerContent: {
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: "center"
    }
})