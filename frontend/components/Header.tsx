import React, { useContext } from "react";

import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Input, InputIcon, InputSlot, InputField } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";

import HeaderTabs from "@/components/header/HeaderTabs";
import HomestayLogo from "@/components/header/HomestayLogo";
import ToggleMode from "@/components/header/ToggleMode";
import UserProfile from "@/components/header/UserProfile";
//import { ThemeContext } from "@/App";
import { Link } from "expo-router";

const Header = React.memo(() => {
  const colorMode = "light"; // useContext(ThemeContext);
  return (
    <>
      {/* big screen */}
      <Box className="px-16 w-full border-b hidden md:flex border-outline-100 min-h-20 ">
        <HStack className="items-center justify-between mx-auto w-full">
          <Link href='/'>
            <HomestayLogo />
          </Link>
          <HeaderTabs />
          <HStack space="lg" className="items-center pr-1.5">
            {/* <ToggleMode /> */}
            <UserProfile />
          </HStack>
        </HStack>
      </Box>
      {/* small screen */}
      <Box className="p-5 md:hidden w-full">
        <Input variant="rounded" size="sm" className="w-full h-10">
          <InputField placeholder="Anywhere • Any week • Add guests" />
          <InputSlot className="bg-primary-500 rounded-full h-6 w-6 m-1.5">
            <InputIcon
              as={SearchIcon}
              color={colorMode === "light" ? "#FEFEFF" : "#171717"
            }
            />
          </InputSlot>
        </Input>
      </Box>
    </>
  );
});
export default Header;