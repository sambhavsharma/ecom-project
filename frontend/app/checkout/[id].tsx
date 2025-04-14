import { ScrollView } from "react-native";
import { getProduct } from "@/api/products";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Stack } from "expo-router";
import { Center } from "@/components/ui/center";
import { useCart } from "@/store/cartStore";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";
import { Icon, StarIcon } from "@/components/ui/icon";
import ProductList from "@/components/widgets/ProductList";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import ProductCard from "@/components/checkout/ProductCard";
import OrderDetails from "@/components/checkout/OrderDetails";
import {
    Popover,
    PopoverBackdrop,
    PopoverBody,
    PopoverContent,
  } from "@/components/ui/popover";
  import { Input, InputField } from "@/components/ui/input";

export default function CheckoutScreen(){

    const {id} = useLocalSearchParams();
    
    const addProduct = useCart((state: any) => state.addProduct);
    const addToCart = () => {
        addProduct(data);
    }

    const {data, isLoading, err} = useQuery({queryKey: ['products',id ], queryFn:() => getProduct(String(id))});

    if(isLoading) {
        return <ActivityIndicator/>;
    } 

    if(err) {
        return <Text>Explore Similar Products!</Text>;
    }

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
                            <ProductCard product={data}/>
                            <Box className="w-full m-3">
                                <Heading size="sm" className="mb-3">
                                    Order Details
                                </Heading>
                                <OrderDetails/>
                            </Box>
                            <Box className="my-5">
                                <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
                                    onPress={addToCart}>
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
                            <ProductCard product={data}/>
                            <Box className="w-full m-3">
                                <Heading size="sm" className="mb-3">
                                    Order Details
                                </Heading>
                                <OrderDetails/>
                            </Box>
                            <Box className="my-5">
                                <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
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