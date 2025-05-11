import {useState} from "react";
import WebTopBar from "@/components/header/web/WebTopBar";
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

  const [activeTab, setActiveTab] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  const {data: menu} = useQuery(
    {queryKey: ['menu'], 
    queryFn:() => getMenu()
  });

  return (
    <>
      {/* big screen */}
      <WebTopBar/>
      <WebMenu activeTab={activeTab} setActiveTab={setActiveTab} setShowMenu={setShowMenu} menu={menu}/>
      <WebSubMenu activeTab={activeTab} showMenu={showMenu}/>
    </>
  );
});
export default Header;