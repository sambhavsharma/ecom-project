import {useState, useEffect} from "react";
import { View } from "react-native";
import Moment from 'moment';

import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { useQuery } from "@tanstack/react-query";

import { Link } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import Loader from "@/components/widgets/Loader";

import { getUserSaleOrders } from "@/api/orders";
import OrderListItem from "@/components/users/OrderListItem";

export default function BuyOrders(){

    Moment.locale('en');
    const [filterQuery, setFilterQuery] = useState({
    });

    const {user, logout} = useAuth();
    const [redirectLogin, setRedirectLogin] = useState(false);
    
    const {data: orders, error, isLoading} = useQuery({
        queryKey: ['saleorders' ], 
        queryFn:() => getUserSaleOrders({queryFilters: filterQuery}),
        retry: false
    });

    useEffect(
        () => {
            const checkAuth = async () => {
                if(error && error.status === 401) {
                    console.log('logout');
                    await logout();
                    setRedirectLogin(true);
                }
            }
            
            checkAuth();
        }, [error]
    );

    if(isLoading) {
        return <Loader/>;
    }

    if(redirectLogin)
        return <Redirect href="/login" />

    return (
        <Box className="flex-1 md:flex hidden pr-12">            
            <View className="w-full">
                <VStack space="md" className="py-6 px-2 min-w-[400px]">
                    <Heading size="xl">Sale Orders</Heading>
                    {
                        orders && !orders.error && orders.map(
                            (order) => {
                                return (
                                    <OrderListItem order={order}/>
                                )
                            }
                        )
                    }
                    {
                         ((orders || []).length == 0 ) &&
                        <VStack space="lg" className="mt-4">
                            <Heading size="md">
                                You have not sold anything on Evergrail yet. 
                            </Heading>
                            <Text>
                                Let's review your <Link className="underline" href={`/profile/${user.id}`}>closet</Link> !
                            </Text>
                        </VStack>
                        
                    }
                    
                </VStack>
            </View>
        </Box>
    );
}