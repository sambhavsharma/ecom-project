import React, { useContext } from "react";

import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

const Header = (({tabs}: any) => {
  const colorMode = "light"; // useContext(ThemeContext);
  
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <>
      {/* big screen */}
      <Box className="px-16 w-full border-b hidden md:flex border-outline-100 min-h-2 ">
        <VStack>
            <HStack space="lg" className="mx-0.5 xl:gap-5 2xl:gap-6">
                {tabs.map(
                    (tab: any, index: number) => { 
                        return (
                            <Pressable
                                key={index}
                                onPress={() => setShowMenu( showMenu ? false : true)}
                            >
                                <Text
                                    size="sm"
                                    className="text-typography-900 font-medium my-4 mr-4"
                                >
                                    {tab.title}
                                </Text>
                            </Pressable>
                        )
                    }
                )}
            </HStack>
            <HStack space="lg" className={`mx-0.5 xl:gap-5 2xl:gap-6 ${ showMenu ? '' : 'hidden' }`}>
                {tabs.map(
                        (tab: any, index: number) => { 
                            return (
                                <Pressable key={index}>
                                    <Text
                                        size="sm"
                                        className="text-typography-900 font-medium my-4 mr-4 pointer"
                                    >
                                        {tab.title}
                                    </Text>
                                </Pressable>
                            )
                        }
                    )}
                
            </HStack>
        </VStack>
      </Box>
    </>
  );
});
export default Header;