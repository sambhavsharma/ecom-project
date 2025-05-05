import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import Moment from 'moment';
import { ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Link } from "@/components/ui/link";
import { Center } from "@/components/ui/center";

import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar"
import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"

import Loader from "@/components/widgets/Loader";
import { useAuth } from "@/providers/AuthProvider";

import ProductList from "@/components/widgets/ProductList";

import { getUserProducts } from "@/api/products";
import { getSeller } from "@/api/users";

export default function Profile(){

    Moment.locale('en');
    const {user_id} = useLocalSearchParams();
    const { user, isLoading} = useAuth();

    const {data: closetData, isLoading: closetLoading} = useQuery({
        retry: false,
        queryKey: ["closet"], 
        queryFn:() => getUserProducts(user_id)
    });

    const {data: seller, isLoading: isLoadingSeller} = useQuery({
        retry: false,
        queryKey: ["users"], 
        queryFn:() => getSeller(user_id)
    });

    if(isLoading || isLoadingSeller || closetLoading) {
        return ( <Loader /> );
    }

    return (
        <ScrollView>
            <Center>
                <Card className="p-6 rounded-lg m-3">
                    <Box className="flex-row">
                        <Avatar className="mr-4">
                        <AvatarFallbackText>{seller.first_name}</AvatarFallbackText>
                        <AvatarImage
                            source={{
                                uri: seller.image,
                            }}
                        />
                        </Avatar>
                        <VStack>
                            <Heading size="md" className="mb-1">
                                {seller.first_name} {seller.last_name}
                            </Heading>
                            <Text size="sm" className="mt-2">Joined in { Moment( seller.created_at).format('MMM YYYY') } </Text>
                            <Text size="sm" className="mt-2">{seller.bio}</Text>
                        </VStack>
                    </Box>
                    {
                        user && (user.id === seller.id) && 
                        <Button className="py-2 px-4 mt-4">
                            <Link href="/users/profile">
                            <ButtonText size="sm">Edit</ButtonText>
                            </Link>
                        </Button>
                    }
                </Card>
            </Center>

            <Box className="mx-auto">
                <Heading className="mb-4" size="xl">Closet</Heading>
                <ProductList data={closetData}/>
            </Box>
        </ScrollView>
    );
}