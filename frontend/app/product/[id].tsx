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
import { Link } from "expo-router";
import ProductList from "@/components/widgets/ProductList";

export default function ProductDetailsScreen(){

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
        <ScrollView>
            <Center>
                <VStack>
                    <HStack className="max-w-[1300px]">
                        <Box className="items-center p-3 flex-1">
                            <Center>
                                <Box className=" mx-auto p-5 rounded-lg m-3 flex-1">
                                    <Image
                                        source={{
                                        uri: data.media[0] ? data.media[0].url : 
                                            "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png",
                                        }}
                                        className="mb-6 h-auto w-[500px] rounded-md aspect-[4/3]"
                                        alt="image"
                                    />
                                </Box>
                            </Center>
                        </Box>
                        <Box className="items-center p-3 flex-1">
                            <Box className=" mx-auto p-5 rounded-lg max-w-[360px] m-3 flex-1">
                                <VStack space="lg" className="mb-6">
                                    <Text className="text-lg font-normal mb-2 text-typography-700">
                                        {data.name}
                                    </Text>

                                    <VStack space="sm" className="mb-2">
                                        <Text size="sm">
                                        Size: L
                                        </Text>

                                        <Text size="sm">
                                        Color: Black
                                        </Text>

                                        <Text size="sm">
                                        Condition: Good
                                        </Text>
                                    </VStack>

                                    <Heading size="md" className="mb-1">
                                    ${data.price}
                                    </Heading>
                                    

                                    { <Text size="md">
                                    {data.description}
                                    </Text>}

                                    <VStack space="sm" className="mb-6">
                                        
                                            <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
                                                onPress={addToCart}>
                                                <Link href={`checkout/${data.id}`}>
                                                    <ButtonText size="sm">Purchase</ButtonText>
                                                </Link>
                                            </Button>
                                        <Button
                                        variant="outline"
                                        className="px-4 py-2 border-outline-300 sm:flex-1"
                                        >
                                            <ButtonText size="sm" className="text-typography-600">
                                                Offer
                                            </ButtonText>
                                        </Button>
                                        <Button
                                        variant="outline"
                                        className="px-4 py-2 border-outline-300 sm:flex-1"
                                        >
                                            <ButtonText size="sm" className="text-typography-600">
                                                Message
                                            </ButtonText>
                                        </Button>
                                    </VStack>

                                    <Box className="p-6 rounded-lg max-w-[360px] m-3">
                                        <Box className="flex-row">
                                            <Avatar className="mr-4">
                                            <AvatarFallbackText>JD</AvatarFallbackText>
                                            <AvatarImage
                                                source={{
                                                uri: data.seller.media.length ? data.seller.media[0].url : "https://gluestack.github.io/public-blog-video-assets/camera.png",
                                                }}
                                            />
                                            </Avatar>
                                            <VStack>
                                            <Heading size="md" className="mb-1">
                                                {data.seller.first_name} {data.seller.last_name} 
                                            </Heading>
                                            <HStack className="items-center flex-start">
                                    <Icon
                                    as={StarIcon}
                                    size="2xs"
                                    className="stroke-typography-900 fill-typography-900"
                                    />
                                    <Text
                                    size="sm"
                                    className="pl-1 text-typography-900"
                                    >
                                    4.7
                                    </Text>
                                </HStack>
                                            </VStack>
                                        </Box>
                                        <Box className="my-5 flex-col sm:flex-row">
                                            <VStack className="items-center pb-2 sm:flex-1 sm:pb-0 sm:border-r sm:border-outline-300">
                                            <Heading size="xs">81</Heading>
                                            <Text size="xs">products</Text>
                                            </VStack>
                                            <Divider
                                            orientation="horizontal"
                                            className="w-[40%] self-center bg-background-300 flex sm:hidden"
                                            />
                                            <VStack className="items-center py-2 sm:flex-1 sm:py-0 sm:border-r sm:border-outline-300">
                                            <Heading size="xs">5,281</Heading>
                                            <Text size="xs">followers</Text>
                                            </VStack>
                                            <Divider
                                            orientation="horizontal"
                                            className="w-[40%] self-center bg-background-300 flex sm:hidden"
                                            />
                                            {/* <VStack className="items-center pt-2 sm:flex-1 sm:pt-0">
                                            <Heading size="xs">281</Heading>
                                            <Text size="xs">following</Text>
                                            </VStack> */}
                                        </Box>
                                        <Button className="py-2 px-4">
                                            <ButtonText size="sm">Follow</ButtonText>
                                        </Button>
                                        </Box>
                                </VStack>
                            </Box>
                        </Box>
                    </HStack>
                    <Center>
                        <Heading className="mb-4" size="xl">Expore Similar Products!</Heading>
                        <ProductList/>
                    </Center>
                </VStack>
            </Center>
        </ScrollView>
    );
}