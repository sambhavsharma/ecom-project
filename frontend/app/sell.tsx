import { useEffect, useState } from "react";
import {  ScrollView, StyleSheet } from "react-native";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { FormControl, 
    FormControlError, 
    FormControlErrorText, 
    FormControlErrorIcon, 
    FormControlLabel, 
    FormControlLabelText, 
    FormControlHelper, 
    FormControlHelperText } from "@/components/ui/form-control";
    
import { Input, InputField } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Pressable } from "@/components/ui/pressable";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Icon, GlobeIcon, PlayIcon, SettingsIcon, ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icon";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";

import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectItem,
} from "@/components/ui/select";

import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu"

import { AddIcon, ChevronDownIcon } from "@/components/ui/icon";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import * as ImagePicker from 'expo-image-picker';
import { useQuery } from "@tanstack/react-query";
import { listCategories } from "@/api/categories";

export default function Sell () {

    const [isInvalid, setIsInvalid] = React.useState(false);
    const [showCategoryMenu, setShowCategoryMenu] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('12345');
    const handleSubmit = () => {
        if (inputValue.length < 6) {
        setIsInvalid(true);
        } else {
        setIsInvalid(false);
        }
    };

    const [prevCategory, setPreviousCategory] = React.useState(null);
    const [currentCategoryMenu, setCurrentCategoryMenu] = React.useState([]);

    const {data, isLoading, err} = useQuery({queryKey: ['categories'], queryFn:() => listCategories()});

    // if(isLoading) {
    //     return <ActivityIndicator/>;
    // } 

    useEffect(() => {
        if(data)
            setCurrentCategoryMenu(data["main"]);
    }, [data]);
    

    // if(data) {
    //     setCurrentCategoryMenu(data);
    //     //alert(JSON.stringify(data));
    // }

    if(err) {
        return <Text>Explore Similar Products!</Text>;
    }

    const [images, setImages] = useState<any>([]);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true
        });
    
        if (!result.canceled) {

            setImages(result.assets);
        }
    };

    const handleClick = () => {
        setShowCategoryMenu( showCategoryMenu ? false: true);
    };

    const categorySelect = (category_id: number) => {

        let selectedCategory;

        // handle previous category
        if(prevCategory && category_id == prevCategory.id) {

            if(prevCategory.parent_category_id){
                let parentCategory = data["list"][prevCategory.parent_category_id];
                setPreviousCategory(parentCategory);
                setCurrentCategoryMenu(parentCategory.children);
            } else {
                setPreviousCategory(null);
                setCurrentCategoryMenu(data["main"]);
            }

        } else {
            if(data["list"] && data["list"][category_id]) {
                selectedCategory = data["list"][category_id];

                if(selectedCategory["children"].length){
                    
                    setCurrentCategoryMenu(selectedCategory["children"]);
                    setPreviousCategory(selectedCategory);

                } else {

                    setPreviousCategory(null);
                    setShowCategoryMenu(false);
                } 
            }
        }
    };

    return (
        <ScrollView>
        <Center>
            <VStack  space="lg" className="w-full max-w-[800px] rounded-md border-background-200 p-4">
                <Heading>
                    Sell your product
                </Heading>
                <FormControl isInvalid={isInvalid} size="md" isDisabled={false} isReadOnly={false} isRequired={false} >
                <HStack className="w-full mt-[20px]">
                    <Box>
                    
                        <FormControlLabel>
                            <FormControlLabelText>Category</FormControlLabelText>
                        </FormControlLabel>
                    
                        <Select>
                            <SelectTrigger variant="outline" size="md" onPress={handleClick}>
                                <SelectInput placeholder="Select Category" />
                                <SelectIcon className="mr-3" as={ChevronDownIcon} />
                            </SelectTrigger>
                        </Select>
                        <Card size="md" variant="elevated" 
                            className="shadow-lg p-0 w-full absolute top-full">
                            
                            {
                                (prevCategory) &&  
                                <>
                                    <Pressable onPress={() => {categorySelect(prevCategory.id)}} className="w-full">
                                    <HStack className="w-full cursor-pointer hover:bg-gray-50">
                                        <Center className="pl-3">
                                            <Icon className="text-typography-500" as={ArrowLeftIcon} />
                                        </Center>
                                        <Heading size="sm" className="w-full mb-1 p-3 "> 
                                            {prevCategory.name}
                                        </Heading>
                                    </HStack>
                                    <Divider/>
                                    </Pressable>
                                </>
                            }

                            {
                                showCategoryMenu && currentCategoryMenu && currentCategoryMenu.map((category: any) => {
                                    return (
                                        <>
                                            <Pressable onPress={() => {categorySelect(category.id)}} className="w-full">
                                                <HStack className="w-full cursor-pointer hover:bg-gray-50">
                                                    <Heading size="sm" className="w-full mb-1 p-3"> 
                                                        {category.name}
                                                    </Heading>
                                                    {
                                                        (category.children.length > 0) && 
                                                        <Center className="pr-3">
                                                            <Icon className="text-typography-500 text-right" as={ArrowRightIcon} />
                                                        </Center>
                                                    }
                                                </HStack>
                                            </Pressable>
                                            <Divider/>
                                        </>
                                    );
                                })
                            }
                            
                        </Card>
                    </Box>
                    <Box>
                        
                    </Box>
                </HStack>
                
                <HStack className="w-full mt-[20px] z-[-1]">
                    <Box>
                    <VStack space="xs">
                    <FormControlLabel>
                        <FormControlLabelText>Item Name</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="min-w-[250px]">
                        <InputField type="text" />
                    </Input>
                </VStack>
                    </Box>
                    <Box>
                    </Box>
                </HStack>
                

                <HStack className="w-full mt-[20px] z-[-1]">
                    <Box>
                    <VStack space="xs">
                    <FormControlLabel>
                        <FormControlLabelText>Color</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="min-w-[250px]">
                        <InputField type="text" />
                    </Input>
                </VStack>
                    </Box>
                    <Box>
                    </Box>
                </HStack>
                

                <HStack className="w-full mt-[20px] z-[-1]">
                    <Box>
                    <VStack space="xs">
                        <FormControlLabel>
                            <FormControlLabelText>Condition</FormControlLabelText>
                        </FormControlLabel>
                        <Input className="min-w-[250px]">
                            <InputField type="text" />
                        </Input>
                    </VStack>
                    </Box>
                    <Box>
                    </Box>
                </HStack>
                

                <VStack space="xs" className="mt-[20px]">
                    <FormControlLabel>
                        <FormControlLabelText>Description</FormControlLabelText>
                    </FormControlLabel>
                    <Textarea
                    size="md"
                    isReadOnly={false}
                    isInvalid={false}
                    isDisabled={false}
                    className="w-full"
                    >
                    <TextareaInput placeholder="Your text goes here..." />
                    </Textarea>
                </VStack>

                <HStack space="lg" className="w-full mt-[20px] z-[-1]">
                    <Box>
                        <Button className="mt-2" onPress={pickImage}>
                            <ButtonText>Add Image</ButtonText>
                            <ButtonIcon as={AddIcon} className="ml-2" />
                        </Button>
                    </Box>
                    <Box>
                        <HStack space="md">
                            {
                                images.map((img: any) => {
                                    return (
                                        <Image source={{ uri: img.uri }} style={styles.image} />
                                    );
                                })
                            }
                        </HStack>
                    </Box>
                </HStack>
                

                </FormControl>

                <HStack className="mt-[20px]" space="md">
                    <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
                        <ButtonText>Save Draft</ButtonText>
                    </Button>
                    <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
                        <ButtonText> Publish </ButtonText>
                    </Button>
                </HStack>
                
            </VStack>
        </Center>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 400,
        height: 400,
    },
});