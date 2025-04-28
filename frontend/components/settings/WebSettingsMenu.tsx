//import {useState} from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

const WebSettingsMenu = ({activeTab, setActiveTab}) => {

    const options = [
        {
            value: "Profile Details",
            key: "profile"
        },
        {
            value: "Manage Address",
            key: "addresses"
        },
    ]

    return (
        <Box className="flex-1 md:flex md:web:max-h-[calc(100vh-144px)] max-w-[340px] w-full pl-12 hidden">
            <ScrollView className="w-full" scrollEnabled={true}>
                <VStack space="xl" className="py-6 px-8">
                    <Heading className="px-2" size="lg">Settings</Heading>

                    {
                        options.map(
                            (option) => {
                                return (
                                    <Pressable key={option.key} className="hover:bg-gray-200 p-2" 
                                        onPress={ () => {setActiveTab(option.key)}}>
                                        <Text>
                                            {option.value}
                                        </Text>
                                    </Pressable>
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