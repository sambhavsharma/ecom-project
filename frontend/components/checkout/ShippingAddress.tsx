import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Icon, EditIcon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Pressable } from "@/components/ui/pressable";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";

import { Box } from "@/components/ui/box";

import { useQuery } from "@tanstack/react-query";

import { getUserAddress } from "@/api/addresses";

import Loader from "@/components/widgets/Loader";

export default function ShippingAddress({user}){

    const {data: address, isLoading} = useQuery({
        queryKey: ['address' ], 
        queryFn:() => getUserAddress(user.id),
        retry: false
    });

    if(isLoading){
        return <Loader/>
    }

    return (
        <Card size="sm" variant="outline">
            {
                (!address || !address.id) && 
                <Center>
                    <VStack space="sm">
                        <Heading size="md">
                            We do not have your address yet.
                        </Heading>
                        <HStack>
                            <Text className="mr-1">
                                Add your address 
                            </Text>
                            <Link className="underline" href={`/users/addresses`}>here</Link>
                        </HStack>
                    </VStack>
                </Center>
            }

            {
                address && address.id && 
                <VStack space="sm">
                    <HStack className="justify-between">
                        <Text className="font-semibold text-typography-900">
                            {user?.first_name} {user?.last_name}
                        </Text>
                        <HStack space="md" className="justify-between align-middle">
                            <Link href="/users/addresses">
                            <Pressable className="flex-wrap flex-row">
                                <Text className="mr-2">
                                    Edit
                                </Text>
                                <Icon as={EditIcon}></Icon>
                            </Pressable>
                            </Link>
                        </HStack>
                        
                    </HStack>
                    
                    <Text size="md"> {address?.address1} </Text>
                    <Text size="md"> {address?.address2} </Text>

                    {
                        address?.address3 && <Text size="md"> {address.address3} </Text>
                    }

                    <Text size="sm" className="text-typography-500">
                        {address?.city}
                    </Text>

                    <Text size="sm" className="text-typography-500">
                        {address?.state} {address?.postcode}
                    </Text>
                </VStack>
            }
            
        </Card>
    );
}