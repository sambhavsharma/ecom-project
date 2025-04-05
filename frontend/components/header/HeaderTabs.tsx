import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Icon, SearchIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Input, InputIcon, InputSlot, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

const HeaderTabs = () => {
  const [selectedTab, setSelectedTab] = React.useState("Anywhere");
  const colorMode = "light"; // useContext(ThemeContext);
  return (
    <HStack className="h-20 items-center justify-between w-full ml-5 mr-5 max-w-[560px]">
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
      {/* <HStack className="rounded-full p-1.5 items-center border border-outline-200">
     
        <Pressable
          className={`rounded-full px-3 py-1.5 ${
            selectedTab === "Anywhere" ? "bg-background-100" : "bg-transparent"
          }`}
          onPress={() => setSelectedTab("Anywhere")}
        >
          <Text size="sm" className="font-medium">
            Anywhere
          </Text>
        </Pressable>
        <Pressable
          className={`rounded-full px-3 py-1.5 ${
            selectedTab === "Anyweek" ? "bg-background-100" : "bg-transparent"
          }`}
          onPress={() => setSelectedTab("Anyweek")}
        >
          <Text size="sm" className="font-medium">
            Anyweek
          </Text>
        </Pressable>
        <Pressable
          className={`rounded-full px-3 py-1.5 ${
            selectedTab === "Add guests"
              ? "bg-background-100"
              : "bg-transparent"
          }`}
          onPress={() => setSelectedTab("Add guests")}
        >
          <Text size="sm" className="font-medium">
            Add guests
          </Text>
        </Pressable>
        <Pressable className="ml-3 p-2 bg-primary-500 rounded-full">
          <Icon as={SearchIcon} className="w-4 h-4 text-typography-0" />
        </Pressable>
      </HStack> */}
    </HStack>
  );
};
export default HeaderTabs;
