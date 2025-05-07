
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";

export default function ProductCard({product: product}){

    return (
        <Box className="w-full m-3">
            <Heading size="sm" className="mb-6"></Heading>
            <Center>
                <Card className="p-6 w-full m-3">
                    <HStack>
                        <Box className="w-full">
                            <HStack>
                                <Image
                                source={{
                                    uri: product.media[0].url,
                                    }}
                                    className="mb-6 w-[90px]"
                                    alt="image"
                                />
                                <VStack className="ml-6">
                                    <Heading size="md" className="mb-1">
                                        {product.name}
                                    </Heading>
                                    <Text size="sm">{product.brand} </Text>
                                    <Text size="sm">{product.condition} </Text>
                                    <Text size="sm">Seller: {product.seller.first_name} {product.seller.last_name} </Text>
                                </VStack>
                            </HStack>
                            
                        </Box>
                        <Box className="w-full">
                            <VStack className="ml-6">
                                <Heading size="sm" className="mb-1 text-right">
                                    {product.currency} {product.price}
                                </Heading>
                            </VStack>
                        </Box>
                    </HStack>
                </Card>
            </Center>
        </Box>
    );
}