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
import {
    Popover,
    PopoverBackdrop,
    PopoverBody,
    PopoverContent,
  } from "@/components/ui/popover";
  import { Input, InputField } from "@/components/ui/input";

export default function OrderDetails(){

    return (
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
                        INR 699
                    </Text>
                    <Text size="sm" className="text-typography-500 text-right">
                        INR 30
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
                    INR 729
                </Text>
            </HStack>
            
        </Card>
    );
}