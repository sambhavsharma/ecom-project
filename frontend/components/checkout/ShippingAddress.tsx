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

export default function ShippingAddress(){

    return (
        <Card size="sm" variant="outline">
            <VStack space="sm">
                <Text className="font-semibold text-typography-900">
                Sambhav Sharma
                </Text>
                
                <Text size="md">A-87 </Text>
                <Text size="md">Patel Nagar II</Text>

                <Text size="sm" className="text-typography-500">
                    Delhi
                </Text>
                <Text size="sm" className="text-typography-500">
                    Delhi 110011
                </Text>
            </VStack>
        </Card>
    );
}