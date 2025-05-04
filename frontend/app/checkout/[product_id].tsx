import {useState, useEffect} from "react";
import { ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery, useMutation } from "@tanstack/react-query";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import ProductCard from "@/components/checkout/ProductCard";
import OrderDetails from "@/components/checkout/OrderDetails";
import { Redirect } from "expo-router";
import Loader from "@/components/widgets/Loader";

import { authCheck } from "@/api/auth";
import { getProduct } from "@/api/products";
import { createOrder } from "@/api/orders";
import { getUserAddress } from "@/api/addresses";

export default function CheckoutScreen(){
    
    const [createdOrder, setCreatedOrder] = useState(null);
    const {product_id} = useLocalSearchParams();
    const {user, logout} = useAuth();
    const [redirectLogin, setRedirectLogin] = useState(false);

    const {data: product, isLoading, err} = useQuery({queryKey: ['products',product_id ], queryFn:() => getProduct(String(product_id))});
    
    const {data: address} = useQuery({
        queryKey: ['addresses',user.id ], 
        queryFn: async () => getUserAddress(String(user.id)),
        retry: false
    });

    const {data: authCheckData, error: authCheckError, refetch} = useQuery({
        queryKey: ['auth' ], 
        queryFn: authCheck,
        retry: false
    });

    const createOrderMutation = useMutation({
        mutationFn: (orderObj: object) => {
            return createOrder(orderObj)
        },
        onSuccess: (data) => {
            console.log(data);
            setCreatedOrder(data);
            return <Redirect href={`/user/order/${data.id}`}/>;
        },
        onError: async (err) => {
            if(err.status === 401){
                await logout();
                return <Redirect href="/login"/>;
            }
        }
    })

    useEffect(
        () => {
            const handleAuthCheckError = async () => {

                if(authCheckError && authCheckError.status === 401){
                    await logout();
                    return <Redirect href="/login"/>;
                }
            }

            handleAuthCheckError();
        }, [authCheckError]
    )

    const handleConfirmPurchaseClick = async () => {
        let order = {
            address: {
                address1: address.address1,
                address2: address.address2,
                address3: address.address3 || "",
                city: address.city,
                state: address.state,
                country: address.country,
                postcode: address.postcode,
            },
            products: [
                {
                    product_id: product.id,
                    price: product.price,
                    currency: product.currency,
                    quantity: 1
                }
            ]
        }
        
        createOrderMutation.mutate(order);
    }

    if(isLoading) {
        return ( <Loader /> );
    }

    if(redirectLogin || !user){
        return <Redirect href="/login"/>
    }

    if(createdOrder)
        return <Redirect href={`/users/order/${createdOrder.id}`}/>;

    return (
        <>
         {/* big screen */}
        <ScrollView className="hidden md:flex">
            <Center>
                <Heading className="mt-5">
                    Product Checkout
                </Heading>
            </Center>
            <Center> 
                <HStack space="lg" className="max-w-[1300px] w-[100%]">
                    <VStack className="w-full pr-4">
                        <Center>
                            <Box className="w-full m-3">
                                <Heading size="sm" className="mb-3">
                                    Shipping Address
                                </Heading>
                                <ShippingAddress/>
                            </Box>
                            <Box className="w-full m-3">
                                <Heading size="sm" className="mb-3">
                                    Payment
                                </Heading>
                            </Box>
                        </Center>
                    </VStack>
                    <VStack className="w-full pr-4">
                        <Center>
                            <ProductCard product={product}/>
                            <Box className="w-full m-3">
                                <Heading size="sm" className="mb-3">
                                    Order Details
                                </Heading>
                                <OrderDetails product={product}/>
                            </Box>
                            <Box className="my-5">
                                <Button onPress={handleConfirmPurchaseClick} 
                                    className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
                                    {/* <Link href={`checkout/${data.id}`}> */}
                                        <ButtonText size="sm">Confirm Purchase</ButtonText>
                                    {/* </Link> */}
                                </Button>
                            </Box>
                        </Center>
                    </VStack>
                </HStack>
            </Center>
        </ScrollView>

        {/* small screen */}
        <ScrollView className="md:hidden w-full">
            <Center>
                <Heading className="mt-5">
                    Product Checkout
                </Heading>
            </Center>
            <Center> 
                <VStack space="lg" className="">
                    <VStack className="w-full pr-4">
                        <Center>
                            <Box className="w-full m-3">
                                <Heading size="sm" className="mb-3">
                                    Shipping Address
                                </Heading>
                                <ShippingAddress/>
                            </Box>
                            <Box className="w-full m-3">
                                <Heading size="sm" className="mb-3">
                                    Payment
                                </Heading>
                            </Box>
                        </Center>
                    </VStack>
                    <VStack className="w-full pr-4">
                        <Center>
                            <ProductCard product={product}/>
                            <Box className="w-full m-3">
                                <Heading size="sm" className="mb-3">
                                    Order Details
                                </Heading>
                                <OrderDetails product={product}/>
                            </Box>
                            <Box className="my-5">
                                <Button onPress={handleConfirmPurchaseClick} 
                                    className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
                                    <ButtonText size="sm">Confirm Purchase</ButtonText>
                                </Button>
                            </Box>
                        </Center>
                    </VStack>
                </VStack>
            </Center>
        </ScrollView>
        </>
    );
}