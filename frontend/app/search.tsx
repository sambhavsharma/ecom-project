import { ScrollView } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import {ImageBackground } from '@/components/ui/image-background';
import {Center } from '@/components/ui/center';
import {StyleSheet} from 'react-native';
import ProductList from "@/components/widgets/ProductList";
import IndexContent from "@/components/index/IndexContent";
import WebSidebar from "@/components/search/WebSidebar";

export default function Search() {

    return (
        <ScrollView>
            <HStack className="w-full md:flex flex-1">
                
                <WebSidebar />
                <Center>
                    <ProductList page="search"/>
                </Center>
            </HStack>
            
        </ScrollView>
    )
}