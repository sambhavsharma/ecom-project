
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Icon, AddIcon, RemoveIcon } from "@/components/ui/icon";

const SectionHeader = ({title, viewOptions, setViewOprions }) => {
  
    const toggleSetViewOptions = () => {
        setViewOprions(viewOptions? false : true);
    }

    return (
        <HStack className="justify-between">
            <Heading size="sm">{title}</Heading>

            <Pressable
            onPress={toggleSetViewOptions}
            >
            <Icon as={viewOptions ? RemoveIcon : AddIcon} size="sm" />
            </Pressable>
            
        </HStack>
    );
};
export default SectionHeader;