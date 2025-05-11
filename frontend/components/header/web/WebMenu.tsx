import {useState} from "react";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Link } from "@/components/ui/link";
import { Icon, ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icon";
import DesignerMenu from "./menu/DesignerMenu";

const WebMenu = (({menu, activeTab, setActiveTab, setShowMenu}) => {

    const colorMode = "light";

    return (

        // big screen
        <Box className="px-16 w-full border-b hidden md:flex border-outline-100 min-h-2 ">
            <VStack>
                <HStack space="4xl">
                    {menu && menu.map(
                        (menuItem: any, index: number) => { 
                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => {
                                        if(menuItem.code === activeTab.code){
                                            setShowMenu(false);
                                            setActiveTab({});
                                        } else {
                                            setShowMenu(true);
                                            setActiveTab(menuItem);
                                        }
                                    }}
                                    className={`${activeTab.code === menuItem.code ? 'bg-gray-100' : ''} px-2`}
                                >
                                    <HStack space="xs">
                                        <Text
                                            size="sm"
                                            className="text-typography-900 font-medium my-4 mr-2 bg-grey-500"
                                        >
                                            {menuItem.title}
                                        </Text>
                                        <Box>
                                            
                                            <Icon className="m-auto text-typography-500 " 
                                                as={ activeTab.code === menuItem.code ? ChevronUpIcon : ChevronDownIcon} />
                                        </Box>
                                    </HStack>              
                                </Pressable>
                            )
                        }
                    )}
                </HStack>
            </VStack>
        </Box>
    );
});
export default WebMenu;