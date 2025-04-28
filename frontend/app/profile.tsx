import { ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Link } from "@/components/ui/link";
import { Center } from "@/components/ui/center";

import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar"
import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Divider } from "@/components/ui/divider"
import { Heading } from "@/components/ui/heading"
import { Image } from "@/components/ui/image"
import { Text } from "@/components/ui/text"

import Loader from "@/components/widgets/Loader";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

import ProductList from "@/components/widgets/ProductList";

export default function Profile(){

    const { user, isLoading} = useAuth();

    if(isLoading) {
        return ( <Loader /> );
    }

    if(!user){
        return <Redirect href="/login"/>
    }

    return (
        <ScrollView>
            <Center>
            <Card className="p-6 rounded-lg m-3">
                <Box className="flex-row">
                    <Avatar className="mr-4">
                    <AvatarFallbackText>{user.first_name[0]}</AvatarFallbackText>
                    <AvatarImage
                        source={{
                            uri: user.image,
                        }}
                    />
                    </Avatar>
                    <VStack>
                    <Heading size="md" className="mb-1">
                        {user.first_name} {user.last_name}
                    </Heading>
                    <Text size="sm">{user.email}</Text>
                    <Text size="sm" className="mt-2">Joined in May, 2025</Text>
                    <Text size="sm" className="mt-2">I am a new Seller at Evergrail!</Text>
                    </VStack>
                </Box>
                <Button className="py-2 px-4 mt-4">
                    <Link href="/settings">
                    <ButtonText size="sm">Edit</ButtonText>
                    </Link>
                </Button>
            </Card>
            </Center>

            <Box className="mx-auto">
                <Heading className="mb-4" size="xl">Closet</Heading>
                <ProductList/>
            </Box>
        </ScrollView>
    );
}