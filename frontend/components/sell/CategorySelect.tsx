import React, { useEffect, useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon
} from "@/components/ui/select";

import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Pressable } from "@/components/ui/pressable";
import { Center } from "@/components/ui/center";

import { Icon, ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon } from "@/components/ui/icon";

import {
    FormControlLabel, 
    FormControlLabelText, 
} from "@/components/ui/form-control";

export default function CategorySelect({
    data: data, 
    selectedCategory: selectedCategory, 
    setSelectedCategory: setSelectedCategory
}){

    const [showCategoryMenu, setShowCategoryMenu] = React.useState(false);
    const [prevCategory, setPreviousCategory] = React.useState(null);
    const [currentCategoryMenu, setCurrentCategoryMenu] = React.useState([]);

    useEffect(() => {
        if(data)
            resetMenu();
    }, [data]);

    const handleClick = () => {
        setShowCategoryMenu( showCategoryMenu ? false: true);
        resetMenu();
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
                    setSelectedCategory(selectedCategory);
                    setPreviousCategory(null);
                    setShowCategoryMenu(false);
                } 
            }
        }
    };

    const resetMenu = () => {
        setPreviousCategory(null);
        setCurrentCategoryMenu(data["main"]);
    }

    return (
        <HStack className="w-full mt-[20px]">
            <Box>     
                <FormControlLabel>
                    <FormControlLabelText>Category</FormControlLabelText>
                </FormControlLabel>
            
                <Select>
                    <SelectTrigger variant="outline" size="md" onPress={handleClick}>
                        <SelectInput placeholder={selectedCategory ? selectedCategory.name : "Select Category"} />
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
        </HStack>
    );
}