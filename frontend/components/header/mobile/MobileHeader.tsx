import React, {useState} from "react";

import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import HomestayLogo from "@/components/header/HomestayLogo";
import UserProfile from "@/components/header/UserProfile";
import { Link } from "expo-router";

import { Icon, MenuIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import MobileMenu from "@/components/header/mobile/MobileMenu";

const MobileHeader =(({
    tabs
}: any) => {
  
    const colorMode = "light"; // useContext(ThemeContext);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    return (
    <>

        {/* small screen */}
        <Box className="p-2 md:hidden w-full">
            <HStack className="items-center justify-between mx-auto w-full">

                 {/* small screen */}
                <HStack className="h-12 items-center justify-between w-full ml-5 mr-5 max-w-[60px] md:hidden">
                    <Pressable
                        onPress={() => {
                            setShowMobileMenu(true);
                        }}
                        >
                        <VStack className="items-center">
                            <Icon
                                as={MenuIcon}
                                className= "text-typography-900"
                            />
                        </VStack>
                    </Pressable>
                </HStack>
                
                <Link href='/'>
                    <HomestayLogo />
                </Link>
            
                <HStack space="lg" className="justify-end pr-1.5 text-right">
                    <UserProfile />
                </HStack>
            </HStack>
        </Box>
        
        <MobileMenu tabs={tabs } showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu}/>
    </>
  );
});
export default MobileHeader;