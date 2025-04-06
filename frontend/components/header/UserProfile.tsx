import React, { useState } from "react";

import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Icon, SearchIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";


import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";

import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar"

import { Pressable } from "@/components/ui/pressable";
// import LogoutAlertDialog from "../LogoutAlertDialog";
import { Link } from "expo-router";

const userMenuItems = [
  {
    title: "Messages",
  },
  {
    title: "Notifications",
  },
  {
    title: "Trips",
  },
  {
    title: "Wishlists",
  },
  {
    title: "Post your home",
  },
  {
    title: "Host an experience",
  },
  {
    title: "Accounts",
  },
  {
    title: "Help",
  },
  {
    title: "Log out",
  },
];

const [selectedTab, setSelectedTab] = React.useState("Anywhere");

const UserProfile = () => {
  const [openLogoutAlertDialog, setOpenLogoutAlertDialog] = useState(false);
  return (
    <>
       <HStack className="p-1.5 items-center min-w-[240px]">
     
        <Button size="sm" className="font-medium hidden md:flex">
          <ButtonText className="text-typography-0">Sell</ButtonText>
        </Button>

        <Link href="/login">
          <Button size="sm" className="font-medium ml-5">
            <ButtonText className="text-typography-0">Log In | Sign Up</ButtonText>
          </Button>
        </Link>
      </HStack>
      {/* <Menu
        offset={10}
        placement="bottom right"
        selectionMode="single"
        // @ts-ignore
        onSelectionChange={(e: any) => {
          if (e.currentKey === "Log out") {
            setOpenLogoutAlertDialog(true);
          }
        }}
        trigger={({ ...triggerProps }) => {
          return (
            <Pressable {...triggerProps}>
              <Avatar size="sm">
                <AvatarFallbackText>Henry Stan</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                  }}
                />
                <AvatarBadge className="bg-primary-500 border-background-0" />
              </Avatar>
            </Pressable>
          );
        }}
      >
        {userMenuItems.map((item) => (
          <MenuItem key={item.title} textValue={item.title}>
            <MenuItemLabel>{item.title}</MenuItemLabel>
          </MenuItem>
        ))}
      </Menu> */}
      {/* <LogoutAlertDialog
        openLogoutAlertDialog={openLogoutAlertDialog}
        setOpenLogoutAlertDialog={setOpenLogoutAlertDialog}
      /> */}
    </>
  );
};

export default UserProfile;
