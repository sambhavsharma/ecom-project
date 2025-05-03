import {useState, useEffect} from "react";
import { ScrollView } from "react-native";

import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { useCart } from "@/store/cartStore";
import { useQuery, useMutation } from "@tanstack/react-query";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";
import { Icon, StarIcon, FavouriteIcon } from "@/components/ui/icon";
import { Link } from "expo-router";
import ProductList from "@/components/widgets/ProductList";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import ToastMessage from "@/components/widgets/ToastMessage";
import Loader from "@/components/widgets/Loader";

import { getUserOrder } from "@/api/orders";

export default function ProductDetailsScreen(){

    const {order_id} = useLocalSearchParams();
    const {user, logout} = useAuth();
    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [redirectLogin, setRedirectLogin] = useState(false);
    
    const {data, isLoading} = useQuery({
        queryKey: ['orders',order_id ], 
        queryFn:() => getUserOrder(String(order_id)),
        retry: false
    });

    if(isLoading) {
        return <Loader/>;
    }

    if(redirectLogin)
        return <Redirect href="/login" />

    return (
        <ScrollView>
            <Center>
                <VStack>
                    <Center>
                        <Heading className="mb-4" size="xl">
                            View Order!
                        </Heading>
                    </Center>
                </VStack>
            </Center>
        </ScrollView>
    );
}