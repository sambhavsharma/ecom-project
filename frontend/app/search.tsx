import { useQuery } from "@tanstack/react-query";
import { listProducts } from "@/api/products";
import { ScrollView } from "react-native";
import { HStack } from "@/components/ui/hstack";
import {Center } from '@/components/ui/center';
import ProductList from "@/components/widgets/ProductList";
import WebSidebar from "@/components/search/WebSidebar";

export default function Search() {

    const {data} = useQuery({queryKey: ["products"], queryFn: listProducts});

    return (
        <ScrollView>
            <HStack className="w-full md:flex flex-1">
                
                <WebSidebar />
                <Center>
                    <ProductList data={data} page="search"/>
                </Center>
            </HStack>
            
        </ScrollView>
    )
}