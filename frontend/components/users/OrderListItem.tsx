import Moment from 'moment';

import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";

import { Divider } from "@/components/ui/divider";
import { Link } from "expo-router";


export default function OrderListItem({order}){

    Moment.locale('en');

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
                                                        {product.quantity} x {product.amount_formatted}
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                            <Divider orientation="horizontal" className="mt-2 bg-gray-300" />
                                            <Box>
                                                <Text className="text-md mt-2 font-normal text-typography-700 px-auto capitalize">
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
    );
}