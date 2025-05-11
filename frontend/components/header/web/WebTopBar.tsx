import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";

import HomestayLogo from "@/components/header/HomestayLogo";
import AuthenticatedUserHeader from "@/components/header/AuthenticatedUserHeader";
import { Input, InputIcon, InputSlot, InputField } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import { Link } from "expo-router";
import WebMenu from "@/components/header/web/WebMenu";

const WebTopBar = ((
) => {

    const colorMode = "light";

    return (
        // Big Screen
        <Box className="px-16 w-full border-b hidden md:flex border-outline-100 min-h-15 mt-4 ">
            <HStack className="items-center justify-between mx-auto w-full">
                <Link href='/'>
                    <HomestayLogo />
                </Link>
         
                <HStack className="h-12 items-center justify-between w-full ml-5 mr-5 max-w-[560px] hidden md:flex">
                    <Input size="sm" className="w-full h-10">
                        <InputField placeholder="Search for anything..." />
                        <InputSlot className="bg-primary-500 rounded-full h-6 w-6 m-1.5">
                        <InputIcon
                            as={SearchIcon}
                            color={colorMode === "light" ? "#FEFEFF" : "#171717"
                        }
                        />
                        </InputSlot>
                    </Input>
                </HStack>

                <HStack space="lg" className="items-center pr-1.5 text-right">
                    <AuthenticatedUserHeader />
                </HStack>
            </HStack>
        </Box>
    );
});
export default WebTopBar;