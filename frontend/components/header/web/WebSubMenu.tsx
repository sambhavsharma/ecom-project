import {useEffect, useRef} from "react";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import DesignerMenu from "./menu/DesignerMenu";
import CategoryMenu from "./menu/CategoryMenu";

// export function useOutsideClick(ref: any, onClickOut: () => void, deps = []){
//     useEffect(() => {
//         const onClick = ({target}: any) => {
//             !ref?.contains(target) && onClickOut?.();
//         }
//         document.addEventListener("click", onClick);
//         return () => document.removeEventListener("click", onClick);
//     }, deps);
// }

const Header = (({activeTab, setActiveTab, showMenu, setShowMenu}) => {

    const colorMode = "light";
    const ref: any = useRef();

    const onClickOut = (() => {
        //alert('clicked inside');
        setShowMenu(false);
        setActiveTab({});
    });

    useEffect(() => {

        const onClick = ({target}: any) => {
            !ref.current?.contains(target) && onClickOut?.();
        }
        document.addEventListener("click", onClick);
        
        return () => document.removeEventListener("click", onClick);

    }, [ref.current]);
    
    return (
        
        // big screen
        <Box ref={ref}
        className="shadow-lg px-16 w-full border-b hidden md:flex border-outline-100 bg-white z-10 absolute top-[116px]">
            <VStack>
                <HStack space="lg" className={`mt-4 mb-4 px-2 ${ showMenu ? '' : 'hidden' }`}>
                    <VStack space="xl">
                        <Heading size="sm" className="mb-4">
                            Shop by {activeTab.title}
                        </Heading>

                        {
                            activeTab && activeTab.code === "designer" && activeTab.children &&
                                <DesignerMenu designers={activeTab.children} setShowMenu={setShowMenu} setActiveTab={setActiveTab}/>
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