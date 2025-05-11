import React from "react";
import WebHeader from "@/components/header/web/WebHeader";
import WebMenu from "@/components/header/web/WebMenu";
import WebSubMenu from "@/components/header/web/WebSubMenu";
import MobileHeader from "@/components/header/mobile/MobileHeader";


import { useQuery } from "@tanstack/react-query";

import { getMenu } from "@/api/util";

const Header = (() => {
  const colorMode = "light"; // useContext(ThemeContext);
  const tabs = [
    {
      code: 'designer',
      title: "Designer",
    },
    {
      code: 'menswear',
      title: "Menswear",
    },
    {
      code: 'womenswear',
      title: "Womenswear",
    },
    {
      code: 'sneakers',
      title: "Sneakers",
    },
    {
      code: 'accessories',
      title: "Accessories",
    }
  ];

  const {data: menu} = useQuery(
    {queryKey: ['menu'], 
    queryFn:() => getMenu()
  });

  return (
    <>
      {/* big screen */}
      < WebHeader tabs={tabs} menu={menu}/>
      {/* <WebMenu tabs={tabs} menu={menu}/>
      <WebSubMenu tabs={tabs} menu={menu}/> */}

      {/* small screen */}
      < MobileHeader tabs={tabs} menu={menu}/>
    </>
  );
});
export default Header;