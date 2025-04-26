import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import {
  Menu,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
} from "@/components/ui/menu"
import {
  Icon,
  HelpCircleIcon,
  MessageCircleIcon,
  SettingsIcon,
} from "@/components/ui/icon"
import { Redirect } from "expo-router";

import { useAuth } from "@/providers/AuthProvider";

import React, {useState} from "react"

import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
  } from "@/components/ui/avatar"

const UserMenu = (user: object) => {

    const [selected, setSelected] = useState(new Set([]));
    const [redirect, setRedirect] = useState(null);
    const { logout} = useAuth();

    const onSelect = (value: string) => {
        if(value === "profile")
            setRedirect("/profile");
        if(value === "settings")
            setRedirect("/settings");
        if(value === "favorites")
            setRedirect("/wishlist");
        if(value === "logout")
            logout();
    };

    if(redirect)
        return <Redirect href={redirect}/>


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
                className="p-2"
                onPress={ () => { onSelect("profile")}}
            >
                <MenuItemLabel size="sm">Profile</MenuItemLabel>
            </MenuItem>

            <MenuItem
                key="settings"
                textValue="settings"
                className="p-2"
                onPress={ () => { onSelect("settings")}}
            >
                <MenuItemLabel size="sm">Settings</MenuItemLabel>
            </MenuItem>

            <MenuItem
                key="favorites"
                textValue="favorites"
                className="p-2"
                onPress={ () => { onSelect("favorites")}}
            >
                <MenuItemLabel size="sm">Favorites</MenuItemLabel>
            </MenuItem>

            <MenuItem
                key="orders"
                textValue="orders"
                className="p-2"
                onPress={ () => { onSelect("orders")}}
            >
                <MenuItemLabel size="sm">Orders</MenuItemLabel>
            </MenuItem>

            <MenuItem
                key="logout"
                textValue="logout"
                className="p-2"
                onPress={ () => { onSelect("logout")}}
            >
                <MenuItemLabel size="sm">Logout</MenuItemLabel>
            </MenuItem>
        </Menu>
    );
};

export default UserMenu;
