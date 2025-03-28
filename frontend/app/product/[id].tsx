import { getProduct } from "@/api/products";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Stack } from "expo-router";
import { useCart } from "@/store/cartStore";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";

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
        return <Text>Error Fetching Products!</Text>;
    }

    return (
        <Box className="items-center p-3 flex-1">
            <Stack.Screen options={{ title: data.name}}/>
            <Card className=" mx-auto p-5 rounded-lg max-w-[360px] m-3 flex-1">
                <Image
                    source={{
                    uri: data.image,
                    }}
                    className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
                    alt="image"
                />
                <Text className="text-sm font-normal mb-2 text-typography-700">
                    {data.name}
                </Text>
                <VStack className="mb-6">
                    <Heading size="md" className="mb-4">
                    ${data.price}
                    </Heading>
                    { <Text size="sm">
                    {data.description}
                    </Text>}
                </VStack>
                <Box className="flex-col sm:flex-row">
                    <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
                        onPress={addToCart}>
                    <ButtonText size="sm">Add to cart</ButtonText>
                    </Button>
                    <Button
                    variant="outline"
                    className="px-4 py-2 border-outline-300 sm:flex-1"
                    >
                    <ButtonText size="sm" className="text-typography-600">
                        Wishlist
                    </ButtonText>
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}