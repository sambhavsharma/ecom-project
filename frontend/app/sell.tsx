import React, { useEffect, useState } from "react";
import {  ScrollView, StyleSheet } from "react-native";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { FormControl, 
    FormControlLabel, 
    FormControlLabelText, 
 } from "@/components/ui/form-control";
    
import { Input, InputField } from "@/components/ui/input";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";

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

import { AddIcon, ChevronDownIcon } from "@/components/ui/icon";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import * as ImagePicker from 'expo-image-picker';
import { useQuery } from "@tanstack/react-query";
import { listCategories } from "@/api/categories";

import CategorySelect from "@/components/sell/CategorySelect";

export default function Sell () {

    const [isInvalid, setIsInvalid] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('12345');
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [attributes, setAttributes] = React.useState([]);

    const handleSubmit = () => {
        if (inputValue.length < 6) {
        setIsInvalid(true);
        } else {
        setIsInvalid(false);
        }
    };

    const {data, isLoading, err} = useQuery({queryKey: ['categories'], queryFn:() => listCategories()});
    
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

    return (
        <ScrollView>
        <Center>
            <VStack  space="lg" className="w-full max-w-[800px] rounded-md border-background-200 p-4">
                <Heading>
                    Sell your product
                </Heading>
                <FormControl isInvalid={isInvalid} size="md" isDisabled={false} isReadOnly={false} isRequired={false} >
                
                 {/* Item Name */}
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

                 {/* Item Brand */}
                 <HStack className="w-full mt-[20px] z-[-1]">
                    <Box>
                        <VStack space="xs">
                            <FormControlLabel>
                                <FormControlLabelText> Brand</FormControlLabelText>
                            </FormControlLabel>
                            <Input className="min-w-[250px]">
                                <InputField type="text" />
                            </Input>
                        </VStack>
                    </Box>
                </HStack>

                 {/* Condition Select */}
                 <HStack className="w-full mt-[20px] z-[-1]">
                    <Box>
                        <VStack space="xs">
                            <FormControlLabel>
                                <FormControlLabelText>Condition</FormControlLabelText>
                            </FormControlLabel>
                            <Select>
                                <SelectTrigger variant="outline" size="md">
                                    <SelectInput placeholder="Select Condition" />
                                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectBackdrop />
                                    <SelectContent>
                                        {/* <SelectDragIndicatorWrapper>
                                            <SelectDragIndicator />
                                        </SelectDragIndicatorWrapper> */}
                                        <SelectItem label="New" value="new" />
                                        <SelectItem label="Almost New" value="almost-new" />
                                        <SelectItem label="Used" value="used" />
                                    </SelectContent>
                                </SelectPortal>
                            </Select>
                        </VStack>
                    </Box>
                </HStack>

                <CategorySelect data={data} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                
                {
                    selectedCategory && selectedCategory.attributes && 
                    selectedCategory.attributes.map((attribute: any) => {
                        return (
                            <>
                                <HStack className="w-full mt-[20px] z-[-1]">
                                    <Box>
                                        <VStack space="xs">
                                            <FormControlLabel>
                                                <FormControlLabelText>
                                                    {attribute.name}
                                                </FormControlLabelText>
                                            </FormControlLabel>
                                            <Select>
                                                <SelectTrigger variant="outline" size="md">
                                                    <SelectInput placeholder="Select Condition" />
                                                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                                </SelectTrigger>
                                                <SelectPortal>
                                                    <SelectBackdrop />
                                                    <SelectContent>
                                                        {
                                                            attribute.values.map((value) => {
                                                                return (
                                                                    <SelectItem label={value} value={value} />
                                                                );
                                                            })
                                                        }
                                                        {/* <SelectDragIndicatorWrapper>
                                                            <SelectDragIndicator />
                                                        </SelectDragIndicatorWrapper> */}
                                                        {/* <SelectItem label="New" value="new" />
                                                        <SelectItem label="Almost New" value="almost-new" />
                                                        <SelectItem label="Used" value="used" /> */}
                                                    </SelectContent>
                                                </SelectPortal>
                                            </Select>
                                        </VStack>
                                    </Box>
                                    <Box>
                                    </Box>
                                </HStack>
                            </>
                        );
                    })
                }

                 {/* Item Description */}
                <VStack space="xs" className="mt-[20px] z-[-1]">
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

                {/* Image Upload */}
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

                <HStack className="mt-[20px] z-[-1]" space="md">
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