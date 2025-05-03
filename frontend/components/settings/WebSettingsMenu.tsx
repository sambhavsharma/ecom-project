//import {useState} from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { Link } from "@/components/ui/link";

const WebSettingsMenu = ({activeTab, setActiveTab}) => {

    const options = [
        {
            value: "Profile Details",
            key: "profile"
        },
        {
            value: "My Buy Orders",
            key: "buy_orders"
        },
        {
            value: "My Sale Orders",
            key: "sale_orders"
        },
        {
            value: "Messages",
            key: "messages"
        },
        {
            value: "Addresses",
            key: "addresses"
        },
    ]

    return (
        <Box className="flex-1 md:flex md:web:max-h-[calc(100vh-144px)] max-w-[340px] w-full pl-12 hidden">
            <ScrollView className="w-full" scrollEnabled={true}>
                <VStack space="xl" className="py-6 px-8">
                    <Heading className="px-2" size="lg">My Grailed</Heading>

                    {
                        options.map(
                            (option) => {
                                return (
                                    <Link href={`/users/${option.key}`}>
                                        <Pressable key={option.key} 
                                            className={`hover:bg-gray-200 p-2 ${activeTab == option.key ? 'bg-gray-200' : ''}`}
                                            onPress={ () => {setActiveTab(option.key)}}>
                                            <Text>
                                                {option.value}
                                            </Text>
                                        </Pressable>
                                    </Link>
                                )
                            }
                        )
                    }
                </VStack>
            </ScrollView>
        </Box>
    );
};
export default WebSettingsMenu;