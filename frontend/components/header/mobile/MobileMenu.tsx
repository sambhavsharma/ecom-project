import React from "react";
import { Button, ButtonText } from "@/components/ui/button"
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { Icon, CloseIcon } from "@/components/ui/icon";

const MobileMenu = ({
    showMobileMenu,
    setShowMobileMenu,
    tabs
}: any) => {
  const handleClose = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      <Drawer
        isOpen={showMobileMenu}
        onClose={() => {
            setShowMobileMenu(false)
        }}
        size="lg"
        anchor="left"
        className="flex md:hidden"
      >
        <DrawerBackdrop />
        <DrawerContent className="ios:pb-20 android:pb-10 min-w-{335px}">
            <DrawerHeader>
                <Pressable
                    onPress={() => {
                        setShowMobileMenu(false);
                    }}
                    >
                    <VStack className="items-center">
                        <Icon
                            as={CloseIcon}
                            className= "text-typography-900"
                        />
                    </VStack>
                </Pressable>
          </DrawerHeader>

          <DrawerBody>
            <VStack space="lg" className="mx-0.5 xl:gap-5 2xl:gap-6">
                {tabs.map(
                    (tab: any, index: number) => { 
                        return (
                            <Pressable
                                key={index}
                                onPress={() => {}}
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
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </>
  );
};
export default MobileMenu;
