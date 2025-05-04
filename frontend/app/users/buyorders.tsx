import {useState, useEffect} from "react";
import { View } from "react-native";
import Moment from 'moment';

import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { Card } from "@/components/ui/card";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { useCart } from "@/store/cartStore";
import { useQuery, useMutation } from "@tanstack/react-query";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";
import { Icon, StarIcon, FavouriteIcon } from "@/components/ui/icon";
import { Link } from "expo-router";
import ProductList from "@/components/widgets/ProductList";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import ToastMessage from "@/components/widgets/ToastMessage";
import Loader from "@/components/widgets/Loader";

import { getUserOrders } from "@/api/orders";

export default function BuyOrders(){

    Moment.locale('en');
    const [filterQuery, setFilterQuery] = useState({
    });

    //const {order_id} = useLocalSearchParams();
    const {user, logout} = useAuth();
    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [redirectLogin, setRedirectLogin] = useState(false);
    
    const {data: orders, error, isLoading} = useQuery({
        queryKey: ['orders' ], 
        queryFn:() => getUserOrders({queryFilters: filterQuery}),
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
                    <Heading size="lg">Buy Orders</Heading>
                    {
                        orders && orders.map(
                            (order) => {
                                return (
                                    <VStack space="lg" className="py-6 px-2 min-w-[400px]" key={order.id}>
                                        <Box className="px-1">
                                            <Text className="text-sm font-normal text-typography-700">
                                                { Moment( order.created_at).format('d MMM YYYY') } - Order Number: #{order.id}
                                            </Text>
                                        </Box>
                                        {
                                            order.products.map(
                                                (product) => {
                                                    return (
                                                        <Pressable key={product.id}>
                                                            <Link href={`/users/order/${order.id}`}>
                                                                <Card className="p-4 rounded-lg" >
                                                                    <VStack>
                                                                        <HStack space="lg">
                                                                            <Image
                                                                                source={{
                                                                                    uri: product.media[0].url                                                         
                                                                                }}
                                                                                className="max-w-[80px] w-full rounded-md"
                                                                                alt="image"
                                                                            />
                                                                            <VStack className="mt-auto">
                                                                            
                                                                                <Heading size="md" className="mb-2">
                                                                                    {product.name}
                                                                                </Heading>
                                                                                <Text className="text-sm font-normal mb-2 text-typography-700">
                                                                                    {product.quantity} x {product.currency} {product.price}
                                                                                </Text>
                                                                            </VStack>
                                                                        </HStack>
                                                                        <Divider orientation="horizontal" className="mt-2 bg-gray-300" />
                                                                        <Box>
                                                                            <Text className="text-md mt-2 font-normal text-typography-700 px-auto">
                                                                                {order.status}
                                                                            </Text>
                                                                        </Box>
                                                                    </VStack>
                                                                </Card>
                                                            </Link>
                                                        </Pressable>
                                                    )
                                                }
                                            )
                                        }
                                    </VStack>
                                )
                            }
                        )
                    }

                    
                </VStack>
            </View>
        </Box>
    );
}