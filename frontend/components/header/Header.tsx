import React from "react";
import WebHeader from "@/components/header/web/WebHeader";
import MobileHeader from "@/components/header/mobile/MobileHeader";

const Header = (() => {
  const colorMode = "light"; // useContext(ThemeContext);
  const tabs = [
    {
      title: "Designer",
    },
    {
      title: "Menswear",
    },
    {
      title: "Womenswear",
    },
    {
      title: "Sneakers",
    },
    {
      title: "Staff Picks",
    },
    {
      title: "Collections",
    },
    {
      title: "Editorial",
    }
  ];

  return (
    <>
      {/* big screen */}
      < WebHeader tabs={tabs}/>

      {/* small screen */}
      < MobileHeader tabs={tabs}/>
    </>
  );
});
export default Header;