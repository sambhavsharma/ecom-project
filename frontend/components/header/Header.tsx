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
  {/* big screen */}
  {/* <Box className="px-16 w-full border-b hidden md:flex border-outline-100 min-h-15 mt-4 ">
        <HStack className="items-center justify-between mx-auto w-full">
          <Link href='/'>
            <HomestayLogo />
          </Link>
          <HeaderTabs />
          <HStack space="lg" className="items-center pr-1.5">
            <UserProfile />
          </HStack>
        </HStack>
      </Box>
      <LowerHeader/> */}
      {/* small screen */}
      {/* <Box className="p-2 md:hidden w-full">
        <HStack className="items-center justify-between mx-auto w-full">
          <HeaderTabs actionsheetVisible={actionsheetVisible}
                    setActionsheetVisible={setActionsheetVisible} />
          <Link href='/'>
            <HomestayLogo />
          </Link>
          <HStack space="lg" className="items-center pr-1.5">
            <UserProfile />
          </HStack>
        </HStack>
      </Box> */}
      
    </>
  );
});
export default Header;