import {useState, useEffect} from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { useAuth } from "@/providers/AuthProvider";


import ShippingAddress from "@/components/checkout/ShippingAddress";
import ProductCard from "@/components/checkout/ProductCard";
import OrderDetails from "@/components/checkout/OrderDetails";
import { Redirect } from "expo-router";

import Loader from "@/components/widgets/Loader";
import ToastMessage from "@/components/widgets/ToastMessage";

import { authCheck } from "@/api/auth";
import { getProduct } from "@/api/products";
import { createOrder } from "@/api/orders";
import { getUserAddress } from "@/api/addresses";

export default function CheckoutScreen(){
    
    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const [createdOrder, setCreatedOrder] = useState(null);
    const {product_id} = useLocalSearchParams();
    const {user, logout} = useAuth();
    const [redirectLogin, setRedirectLogin] = useState(false);

    const {data: product, isLoading, err} = useQuery({queryKey: ['products',product_id ], queryFn:() => getProduct(String(product_id))});
    
    const {data: address} = useQuery({
        queryKey: ['addresses',user?.id ], 
        queryFn: async () => getUserAddress(String(user?.id)),
        retry: false
    });

    const {data: authCheckData, error: authCheckError} = useQuery({
        queryKey: ['auth' ], 
        queryFn: authCheck,
        retry: false
    });

    const createOrderMutation = useMutation({
        mutationFn: (orderObj: object) => {
            return createOrder(orderObj)
        },
        onSuccess: (data) => {

            setCreatedOrder(data);
            return <Redirect href={`/user/order/${data.id}`}/>;
        },
        onError: async (err) => {
            if(err.status === 401){
                await logout();
                return <Redirect href="/login"/>;
            } else {
                let message = "Could not complete purchase! Please try again...";

                setAlertMessage(
                    {
                        type: "error",
                        title: message
                    }
                )
                setShowMessage(true);
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
            seller_id: product.seller.id,
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
                    seller_id: product.seller.id,
                    price: product.price,
                    currency: product.currency,
                    quantity: 1
                }
            ]
        }

        console.log(product);
        
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
            <ToastMessage 
                showMessage={showMessage} 
                setShowMessage={setShowMessage}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />

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
                                <ShippingAddress user={user}/>
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