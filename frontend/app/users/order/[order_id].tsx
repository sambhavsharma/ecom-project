import {useState, useEffect} from "react";
import { View } from "react-native";
import Moment from 'moment';

import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { Card } from "@/components/ui/card";
import { useCart } from "@/store/cartStore";
import { useQuery, useMutation } from "@tanstack/react-query";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";
import { Icon, StarIcon, FavouriteIcon } from "@/components/ui/icon";
import { Link, LinkText }from "@/components/ui/link";
import ProductList from "@/components/widgets/ProductList";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import ToastMessage from "@/components/widgets/ToastMessage";
import Loader from "@/components/widgets/Loader";

import { getUserOrder } from "@/api/orders";

export default function OrderDetailsScreen(){

    Moment.locale('en');
    const {order_id} = useLocalSearchParams();
    const {user, logout} = useAuth();
    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [redirectLogin, setRedirectLogin] = useState(false);
    
    const {data: order, isLoading, error} = useQuery({
        queryKey: ['orders',order_id ], 
        queryFn:() => getUserOrder(String(order_id)),
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
                <Heading size="lg">Your Order</Heading>
                {
                    order &&
                    <VStack space="lg" className="py-6 px-2 min-w-[400px]">
                        <Box className="px-1">
                            <Text className="text-md font-normal text-typography-700">
                                Ordered on { Moment( order.created_at).format('d MMM YYYY') }
                            </Text>
                            <Text className="text-md font-normal text-typography-700">
                                Order Number: #{order.id}
                            </Text>
                            <Text className="text-md font-normal text-typography-700">
                                Order Status: {order.status}
                            </Text>
                        </Box>
                        {
                            order.products.map(
                                (product) => {
                                    return (
                                        <Card className="p-4 rounded-lg" >
                                            <VStack>
                                                <HStack space="lg">
                                                    <Box className="w-full">
                                                        <VStack className="mt-auto">
                                                            <Heading size="lg" className="mb-2">
                                                                {product.brand}
                                                            </Heading>
                                                            <Heading size="md" className="mb-2">
                                                                {product.name}
                                                            </Heading>
                                                            <Text className="text-md font-normal mb-2 text-typography-700">
                                                                {product.currency} {product.price}
                                                            </Text>
                                                            <Text className="text-md font-normal mb-2 text-typography-700">
                                                                You bought {product.quantity} item(s)
                                                            </Text>
                                                            <HStack>
                                                                <Text className="text-md font-normal mb-2 text-typography-700">
                                                                    Sold By                                                     
                                                                </Text>
                                                                <Link href="/profile" className="ml-2">
                                                                    <LinkText>
                                                                        {product.seller.first_name} {product.seller.last_name}
                                                                    </LinkText>
                                                                </Link>
                                                            </HStack>
                                                            
                                                        </VStack>
                                                    </Box>
                                                    <Box className="w-full items-center">
                                                        <Pressable>
                                                            <Link href={`/product/${product.id}`}>
                                                                <Image
                                                                    source={{
                                                                        uri: product.media[0].url                                                         
                                                                    }}
                                                                    size="xl"
                                                                    //className="max-w-[300px] w-full rounded-md h-auto"
                                                                    alt="image"
                                                                />
                                                            </Link>
                                                        </Pressable>
                                                    </Box>
                                                </HStack>
                                            </VStack>
                                        </Card>
                                    )
                                }
                            )
                        }      
                    </VStack>
                }           
            </VStack>
            </View>
        </Box>
    );
}