import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listProducts } from "@/api/products";
import { ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import {Center } from '@/components/ui/center';
import ProductList from "@/components/widgets/ProductList";
import WebSidebar from "@/components/search/WebSidebar";
import Loader from "@/components/widgets/Loader";

export default function Search() {

    const [filterQuery, setFilterQuery] = useState({
        brand: [],
        condition: []
    });

    const listProductsCall = async () => {
        
        return listProducts({queryFilters: filterQuery});
    }

    const {data, isLoading, refetch} = useQuery({
        retry: false,
        queryKey: ["products"], 
        //notifyOnChangeProps: [],
        queryFn: ({ queryKey }) => listProductsCall()
    });

    

    if(isLoading) {
        return ( <Loader /> );
    }

    return (
        <ScrollView className="px-12">
            <HStack className="w-full md:flex flex-1">
                <Box className="max-w-[300px] w-full">
                    <WebSidebar refetch={refetch} filterQuery={filterQuery} setFilterQuery={setFilterQuery} filters={data["filters"]}/>
                </Box>
                <Box>
                    <Center>
                        <ProductList data={data["products"]} page="search"/>
                    </Center>
                </Box>
            </HStack>
            
        </ScrollView>
    )
}