import React, { useState } from "react";

import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Icon, FavouriteIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";


import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";

import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar"

import { Pressable } from "@/components/ui/pressable";
import { Link } from "expo-router";

const [selectedTab, setSelectedTab] = React.useState("Anywhere");

const UserProfile = () => {
  const [openLogoutAlertDialog, setOpenLogoutAlertDialog] = useState(false);
  return (
    <>
       <HStack space="lg" className="p-1.5 items-center min-w-[240px]">

       <Link href='/wishlist'>
        <Icon
              as={FavouriteIcon}
              className= "text-typography-900"
          />
        </Link>

       <Link href='/sell'>
        <Button size="sm" className="font-medium hidden md:flex">
          <ButtonText className="text-typography-0">Sell</ButtonText>
        </Button>
        </Link>

        <Link href="/login">
          <Button size="sm" className="font-medium ml-1">
            <ButtonText className="text-typography-0">Log In | Sign Up</ButtonText>
          </Button>
        </Link>
      </HStack>
    
    </>
  );
};

export default UserProfile;
