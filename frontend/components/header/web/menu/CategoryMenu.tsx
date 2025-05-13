
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from 'expo-router';

export default function CategoryMenu({categories, setShowMenu, setActiveTab}){

    const router = useRouter();
    const handleClick = (category: any) => {
        setShowMenu(false);
        setActiveTab({});
        const url = `/search?${category.category_type.toLowerCase()}=${category.code}`;
        router.replace(url);
    }

    return (
        <HStack space="4xl">
            {
                categories.map(
                    (categoryObj) => {
                        return(
                            <VStack space="2xl" className="mr-4">
                                <Pressable
                                    onPress={() => {handleClick(categoryObj)}}
                                    key={categoryObj.code}
                                    className="text-typography-600 mr-4"
                                >
                                    <Heading
                                        size="sm"
                                        key={categoryObj.code}
                                        className="text-typography-600 mr-4 cursor-pointer"
                                    >
                                        {categoryObj.title || categoryObj.name}
                                    </Heading>
                                </Pressable>
                                
                                {
                                    categoryObj.children.map(
                                        (childCategory) => {
                                            return (
                                                <Pressable
                                                    onPress={() => {handleClick(childCategory)}}
                                                    key={childCategory.code}
                                                    className="text-typography-600 mr-4"
                                                >
                                                    <Text className="">
                                                        {childCategory.title || childCategory.name}
                                                    </Text>
                                                </Pressable>
                                            )
                                        }
                                    )
                                }
                            </VStack>
                        )
                    }
                )
            }
        </HStack>
    );
}