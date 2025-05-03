import { Pressable } from "@/components/ui/pressable";
import {
  Menu,
  MenuItem,
  MenuItemLabel
} from "@/components/ui/menu"

import { Link } from "expo-router";

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
  } from "@/components/ui/avatar"

const UserMenu = ({user, logout}) => {

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
                                    uri: user.image
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
            >
                <Link className="w-full" href="/profile?">
                    <MenuItemLabel className="w-full" size="sm">Profile</MenuItemLabel>
                </Link>
            </MenuItem>

            <MenuItem
                key="settings"
                textValue="settings"
                className="p-2"
            >
                <Link className="w-full" href="/settings">
                    <MenuItemLabel className="w-full" size="sm">Settings</MenuItemLabel>
                </Link>
            </MenuItem>

            <MenuItem
                key="favorites"
                textValue="favorites"
                className="p-2"
            >
                <Link  href="/wishlist" className="w-full">
                    <MenuItemLabel className="w-full" size="sm">Favorites</MenuItemLabel>
                </Link>
            </MenuItem>

            <MenuItem
                key="orders"
                textValue="orders"
                className="p-2"
            >
                <Link  href="/settings?t=profile" className="w-full">
                    <MenuItemLabel size="sm">Orders</MenuItemLabel>
                </Link>
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
