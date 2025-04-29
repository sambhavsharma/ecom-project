import {useState, useEffect} from "react";
import { useQuery } from "@tanstack/react-query";
import { listFavorites } from "@/api/favorites";
import { Box } from "@/components/ui/box";
import {Heading } from '@/components/ui/heading';
import {Center } from '@/components/ui/center';
import ProductList from "@/components/widgets/ProductList";

import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import Loader from "@/components/widgets/Loader";

export default function WishlistContent() {

    const {data, error} = useQuery({
        queryKey: ["favorites"], 
        queryFn: listFavorites,
        retry: false
    });

    const {logout, isLoading} = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // Auth Check Begins
    useEffect(
        () => {
            const checkError = async () =>{
                if(error && error.status === 401){
                    await logout();
                    setIsAuthenticated(false);
                }
            }
            checkError()
            console.log(error);
        }, [error]
    )

    if(!isAuthenticated) {
        return (<Redirect href="/login" />)
    }

    // Auth Check Ends

    if(isLoading) {
        return ( <Loader /> );
    }

    return (

        <Box className="mx-auto">
            <Center>
                <Heading className="mb-4" size="xl">Favorites</Heading>
            </Center>
            
            <ProductList data={data}/>
        </Box>
    )
}