import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

export default function OrderDetails({product: product}){

    return (
        <>
        {
            product && 

            <Card size="lg" variant="outline">
                <HStack space="lg" className="w-full">
                    <VStack space="lg" className="w-full">
                        <Text size="sm" className="text-typography-500">
                            Listing Price
                        </Text>
                        <Text size="sm" className="text-typography-500">
                            Shipping
                        </Text>
                        <Text size="sm" className="text-typography-500">
                            Tax
                        </Text>
                    </VStack>
                    <VStack space="lg"  className="w-full">
                        <Text size="sm" className="text-typography-500 text-right">
                            {product.currency} {product.price}
                        </Text>
                        <Text size="sm" className="text-typography-500 text-right">
                            Free
                        </Text>
                        <Text size="sm" className="text-typography-500 text-right">
                            INR 0
                        </Text>
                    </VStack>
                </HStack>
                <Divider className="my-5"/>
                <HStack space="lg" className="w-full">
                    <Heading className="w-full">
                        Order Total
                    </Heading>
                    <Text className="w-full text-right">
                        {product.currency} {product.price}
                    </Text>
                </HStack>
                
            </Card>
        }
        </>
    );
}