import React, { useContext } from "react";

import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Input, InputIcon, InputSlot, InputField } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

import HeaderTabs from "@/components/header/HeaderTabs";
import HomestayLogo from "@/components/header/HomestayLogo";
import ToggleMode from "@/components/header/ToggleMode";
import UserProfile from "@/components/header/UserProfile";
//import { ThemeContext } from "@/App";
import { Link, LinkText } from "@/components/ui/link";

// const tabsData = [
//     {
//       name: "tropical",
//       data: [
//         {
//           title: "ImageView Inn",
//           src: require("../../assets/display/image16.png"),
//           location: "401 Platte River Rd, Gothenburg, United States",
//           price: "$1,481",
//           rating: 4.9,
//         },
//         {
//           title: "Spinner Resort",
//           src: require("../../assets/display/image17.png"),
//           location: "1502 Silica Ave, Sacramento California",
//           price: "$1,381",
//           rating: 4.89,
//         },
//         {
//           title: "DropDown Den",
//           src: require("../../assets/display/image18.png"),
//           location: "2945 Entry Point Blvd, Kissimmee, Florida",
//           price: "$2,481",
//           rating: 4.6,
//         },
//       ],
//     },
//     {
//       name: "amazing views",
//       data: [
//         {
//           title: "ImageView Inn",
//           src: require("../../assets/display/image19.png"),
//           location: "401 Platte River Rd, Gothenburg, United States",
//           price: "$1,481",
//           rating: 4.9,
//         },
//         {
//           title: "Spinner Resort",
//           src: require("../../assets/display/image20.png"),
//           location: "1502 Silica Ave, Sacramento California",
//           price: "$1,381",
//           rating: 4.89,
//         },
//         {
//           title: "DropDown Den",
//           src: require("../../assets/display/image21.png"),
//           location: "2945 Entry Point Blvd, Kissimmee, Florida",
//           price: "$2,481",
//           rating: 4.6,
//         },
//       ],
//     },
//     {
//       name: "caves",
//       data: [
//         {
//           title: "ImageView Inn",
//           src: require("../../assets/display/image22.png"),
//           location: "401 Platte River Rd, Gothenburg, United States",
//           price: "$1,481",
//           rating: 4.9,
//         },
//         {
//           title: "Spinner Resort",
//           src: require("../../assets/display/image23.png"),
//           location: "1502 Silica Ave, Sacramento California",
//           price: "$1,381",
//           rating: 4.89,
//         },
//         {
//           title: "DropDown Den",
//           src: require("../../assets/display/image24.png"),
//           location: "2945 Entry Point Blvd, Kissimmee, Florida",
//           price: "$2,481",
//           rating: 4.6,
//         },
//       ],
//     },
//     {
//       name: "mansions",
//       data: [
//         {
//           title: "ImageView Inn",
//           src: require("../../assets/display/image25.png"),
//           location: "401 Platte River Rd, Gothenburg, United States",
//           price: "$1,481",
//           rating: 4.9,
//         },
//         {
//           title: "Spinner Resort",
//           src: require("../../assets/display/image26.png"),
//           location: "1502 Silica Ave, Sacramento California",
//           price: "$1,381",
//           rating: 4.89,
//         },
//         {
//           title: "DropDown Den",
//           src: require("../../assets/display/image27.png"),
//           location: "2945 Entry Point Blvd, Kissimmee, Florida",
//           price: "$2,481",
//           rating: 4.6,
//         },
//       ],
//     },
//     {
//       name: "amazing pools",
//       data: [
//         {
//           title: "ImageView Inn",
//           src: require("../../assets/display/image28.png"),
//           location: "401 Platte River Rd, Gothenburg, United States",
//           price: "$1,481",
//           rating: 4.9,
//         },
//         {
//           title: "Spinner Resort",
//           src: require("../../assets/display/image29.png"),
//           location: "1502 Silica Ave, Sacramento California",
//           price: "$1,381",
//           rating: 4.89,
//         },
//         {
//           title: "DropDown Den",
//           src: require("../../assets/display/image30.png"),
//           location: "2945 Entry Point Blvd, Kissimmee, Florida",
//           price: "$2,481",
//           rating: 4.6,
//         },
//       ],
//     },
//     {
//       name: "cabins",
//       data: [
//         {
//           title: "ImageView Inn",
//           src: require("../../assets/display/image31.png"),
//           location: "401 Platte River Rd, Gothenburg, United States",
//           price: "$1,481",
//           rating: 4.9,
//         },
//         {
//           title: "Spinner Resort",
//           src: require("../../assets/display/image32.png"),
//           location: "1502 Silica Ave, Sacramento California",
//           price: "$1,381",
//           rating: 4.89,
//         },
//         {
//           title: "DropDown Den",
//           src: require("../../assets/display/image33.png"),
//           location: "2945 Entry Point Blvd, Kissimmee, Florida",
//           price: "$2,481",
//           rating: 4.6,
//         },
//       ],
//     },
//     {
//       name: "beachfront",
//       data: [
//         {
//           title: "ImageView Inn",
//           src: require("../../assets/display/image16.png"),
//           location: "401 Platte River Rd, Gothenburg, United States",
//           price: "$1,481",
//           rating: 4.9,
//         },
//         {
//           title: "Spinner Resort",
//           src: require("../../assets/display/image17.png"),
//           location: "1502 Silica Ave, Sacramento California",
//           price: "$1,381",
//           rating: 4.89,
//         },
//         {
//           title: "DropDown Den",
//           src: require("../../assets/display/image18.png"),
//           location: "2945 Entry Point Blvd, Kissimmee, Florida",
//           price: "$2,481",
//           rating: 4.6,
//         },
//       ],
//     },
//     {
//       name: "countryside",
//       data: [
//         {
//           title: "ImageView Inn",
//           src: require("../../assets/display/image16.png"),
//           location: "401 Platte River Rd, Gothenburg, United States",
//           price: "$1,481",
//           rating: 4.9,
//         },
//         {
//           title: "Spinner Resort",
//           src: require("../../assets/display/image17.png"),
//           location: "1502 Silica Ave, Sacramento California",
//           price: "$1,381",
//           rating: 4.89,
//         },
//         {
//           title: "DropDown Den",
//           src: require("../../assets/display/image18.png"),
//           location: "2945 Entry Point Blvd, Kissimmee, Florida",
//           price: "$2,481",
//           rating: 4.6,
//         },
//       ],
//     },
//     {
//       name: "tiny homes",
//       data: [
//         {
//           title: "ImageView Inn",
//           src: require("../../assets/display/image16.png"),
//           location: "401 Platte River Rd, Gothenburg, United States",
//           price: "$1,481",
//           rating: 4.9,
//         },
//         {
//           title: "Spinner Resort",
//           src: require("../../assets/display/image17.png"),
//           location: "1502 Silica Ave, Sacramento California",
//           price: "$1,381",
//           rating: 4.89,
//         },
//         {
//           title: "DropDown Den",
//           src: require("../../assets/display/image18.png"),
//           location: "2945 Entry Point Blvd, Kissimmee, Florida",
//           price: "$2,481",
//           rating: 4.6,
//         },
//       ],
//     },
//     {
//       name: "national parks",
//       data: [
//         {
//           title: "ImageView Inn",
//           src: require("../../assets/display/image16.png"),
//           location: "401 Platte River Rd, Gothenburg, United States",
//           price: "$1,481",
//           rating: 4.9,
//         },
//         {
//           title: "Spinner Resort",
//           src: require("../../assets/display/image17.png"),
//           location: "1502 Silica Ave, Sacramento California",
//           price: "$1,381",
//           rating: 4.89,
//         },
//         {
//           title: "DropDown Den",
//           src: require("../../assets/display/image18.png"),
//           location: "2945 Entry Point Blvd, Kissimmee, Florida",
//           price: "$2,481",
//           rating: 4.6,
//         },
//       ],
//     },
//   ];
  
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

const Header = React.memo(() => {
  const colorMode = "light"; // useContext(ThemeContext);
  
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <>
      {/* big screen */}
      <Box className="px-16 w-full border-b hidden md:flex border-outline-100 min-h-2 ">
        <VStack>
            <HStack space="lg" className="mx-0.5 xl:gap-5 2xl:gap-6">
                {tabs.map(
                    (tab: any) => { 
                        return (
                            <Pressable
                                onPress={() => setShowMenu( showMenu ? false : true)}
                            >
                                <Text
                                    size="sm"
                                    className="text-typography-900 font-medium my-4 mr-4"
                                >
                                    {tab.title}
                                </Text>
                            </Pressable>
                        )
                    }
                )}
            </HStack>
            <HStack space="lg" className={`mx-0.5 xl:gap-5 2xl:gap-6 ${ showMenu ? '' : 'hidden' }`}>
                {tabs.map(
                        (tab: any) => { 
                            return (
                                <Pressable>
                                    <Text
                                        size="sm"
                                        className="text-typography-900 font-medium my-4 mr-4 pointer"
                                    >
                                        {tab.title}
                                    </Text>
                                </Pressable>
                            )
                        }
                    )}
                
            </HStack>
        </VStack>
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