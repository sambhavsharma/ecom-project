import {useEffect, useRef} from "react";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Link } from "@/components/ui/link";
import { Icon, ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icon";
import DesignerMenu from "./menu/DesignerMenu";
import CategoryMenu from "./menu/CategoryMenu";

function useOutsideAlerter(ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            alert("You clicked outside of me!");
        }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    }

const Header = (({activeTab, showMenu}) => {

    const colorMode = "light";



    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);


    return (
        
        // big screen
        <Box className="shadow-lg px-16 w-full border-b hidden md:flex border-outline-100 bg-white z-10 absolute top-[116px]">
            <VStack>
                <HStack space="lg" className={`mt-4 mb-4 px-2 ${ showMenu ? '' : 'hidden' }`}>
                    <VStack space="xl px-4">
                        <Heading size="sm" className="mb-4">
                            Shop by {activeTab.title}
                        </Heading>

                        {
                            activeTab && activeTab.code === "designer" && activeTab.children &&
                                <DesignerMenu designers={activeTab.children}/>
                        }

                        {
                            activeTab && activeTab.code !== "designer" && activeTab.children &&
                                <CategoryMenu category={activeTab.children}/>
                        }
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    );
});
export default Header;