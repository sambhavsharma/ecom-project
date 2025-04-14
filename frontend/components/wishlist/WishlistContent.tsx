import { listProducts } from "@/api/products";
import { View, FlatList, ScrollView, useWindowDimensions, ActivityIndicator } from "react-native";
//import ProductListItem from "@/components/ProductListItem";
import { Button, ButtonText } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import {Heading } from '@/components/ui/heading';
import {Center } from '@/components/ui/center';
import {StyleSheet} from 'react-native';
import ProductList from "@/components/widgets/ProductList";

export default function WishlistContent() {

    return (

        <Box className="mx-auto">
            <Center>
                <Heading className="mb-4" size="xl">Favorites</Heading>
            </Center>
            
            <ProductList/>
        </Box>
    )
}