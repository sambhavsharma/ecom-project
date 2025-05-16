
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { Link } from "@/components/ui/link";
import { Pressable } from "@/components/ui/pressable";

export default function ProductCard({product}){

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
                                    <Text size="sm">{product.brand?.name} </Text>
                                    <Text size="sm" className="capitalize">
                                        {product.condition.split('_').join(' ')} 
                                    </Text>
                                    

                                    {/* <Link href={`/profile/${product.seller.id}`}>
                                        <Pressable className="flex-row flex-wrap items-center">
                                            <Text size="sm"> All Orders</Text>
                                        </Pressable>
                                    </Link> */}
                                    <HStack>
                                        <Text size="sm">Sold by:  </Text>
                                        <Link className="underline" href={`/profile/${product.seller.id}`}>
                                            <Text size="sm"> 
                                                {product.seller.first_name} {product.seller.last_name} 
                                            </Text>
                                        </Link>
                                    </HStack>
                                    
                                </VStack>
                            </HStack>
                            
                        </Box>
                        <Box className="w-full">
                            <VStack className="ml-6">
                                <Heading size="sm" className="mb-1 text-right">
                                    {product.amount_formatted}
                                </Heading>
                            </VStack>
                        </Box>
                    </HStack>
                </Card>
            </Center>
        </Box>
    );
}