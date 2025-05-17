import React, { useContext } from "react";
import { Image } from "@/components/ui/image";


const HomestayLogo = () => {
  const colorMode = "light"
  return (
    <Image
      source={
        colorMode === "light"
          ? require("@/assets/logo.webp")
          : require("@/assets/dark-logo.svg")
      }
      alt="homestaylogo"
      className="h-[42px] w-[142px]"
    />
  );
};

export default HomestayLogo;
