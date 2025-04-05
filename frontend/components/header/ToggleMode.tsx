import React, { useContext } from "react";
// import { Icon, SearchIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Icon, MoonIcon, SunIcon } from "@/components/ui/icon";
//import { ThemeContext } from "../../App";

const ToggleMode = () => {
  // const { colorMode, toggleColorMode } = useContext(ThemeContext);
  const colorMode =  "light";
  const toggleColorMode = "";
  return (
    <Pressable onPress={toggleColorMode}>
      <Icon
        as={colorMode === "dark" ? SunIcon : MoonIcon}
        size="xl"
        className="stroke-background-700 fill-background-700"
      />
    </Pressable>
  );
};

export default ToggleMode;
