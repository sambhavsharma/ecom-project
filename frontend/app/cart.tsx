import { FlatList } from "react-native";
import { Box } from "../components/ui/box";
import { HStack } from "../components/ui/hstack";
import { VStack } from "../components/ui/vstack";
import { useCart } from "../store/cartStore";
import { Text } from "../components/ui/text";
import { Button, ButtonText } from "../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api/orders";

export default function CartScreen() {

    const items = useCart((state) => state.items);
    const resetCart = useCart((state) => state.resetCart);
    // const onCheckout = async () => {
    //     resetCart();
    // }

    const createOrderMutation = useMutation({
        mutationFn: () => createOrder(items),
        onSuccess: (data) => {
            resetCart();
            console.log("success");
        },
        onError: () => {
            console.log("error");
        }
    })
    
    return (
        <FlatList 
            data = {items}
            contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto"
            renderItem = {
                ({item}) => (
                    <HStack className="bg-white p-3">
                        <VStack space="sm">
                            <Text>{item.product.name}</Text>
                            <Text>{item.product.price}</Text>
                        </VStack>
                        <Text className="ml-auto">{item.quantity}</Text>
                    </HStack>
                )
            }
            ListFooterComponent = {() => (
                <Button onPress={() => createOrderMutation.mutate()}>
                    <ButtonText>
                        Checkout
                    </ButtonText>
                </Button>
            )}
        />
        
    )
}