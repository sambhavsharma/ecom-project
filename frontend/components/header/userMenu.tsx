import { Pressable } from "@/components/ui/pressable";
import {
  Menu,
  MenuItem,
  MenuItemLabel
} from "@/components/ui/menu"

import { Redirect } from "expo-router";
import { Link } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

import React from "react"

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
  } from "@/components/ui/avatar"

const UserMenu = (user: object) => {

    const { logout} = useAuth();

    return (
        <Menu
            placement="bottom left"
            selectionMode="single"
            offset={5}
            className="p-1.5"
            closeOnSelect={true}
            trigger={({ ...triggerProps }) => {
                return (
                    <Pressable {...triggerProps}>
                        <Avatar  {...triggerProps} size="sm">
                            <AvatarFallbackText>{user.first_name} {user.last_name}</AvatarFallbackText>
                            <AvatarImage
                                source={{
                                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                                }}
                            />
                        </Avatar>
                    </Pressable>
                )
            }}
        >       
            <MenuItem
                key="profile"
                textValue="profile"
                className="p-2 w-full"
            >
                <Link  href="/profile">
                    <MenuItemLabel className="w-full" size="sm">Profile</MenuItemLabel>
                </Link>
            </MenuItem>
            <MenuItem
                key="settings"
                textValue="settings"
                className="p-2"
            >
                <Link  href="/settings">
                    <MenuItemLabel className="w-full" size="sm">Settings</MenuItemLabel>
                </Link>
            </MenuItem>

            <MenuItem
                key="favorites"
                textValue="favorites"
                className="p-2"
            >
                <Link  href="/wishlist">
                    <MenuItemLabel className="w-full" size="sm">Favorites</MenuItemLabel>
                </Link>
            </MenuItem>

            <MenuItem
                key="orders"
                textValue="orders"
                className="p-2"
            >
                <MenuItemLabel size="sm">Orders</MenuItemLabel>
            </MenuItem>

            <MenuItem
                key="logout"
                textValue="logout"
                className="p-2"
                onPress={ () => {logout()}}
            >
                <MenuItemLabel size="sm">Logout</MenuItemLabel>
            </MenuItem>
        </Menu>
    );
};

export default UserMenu;
