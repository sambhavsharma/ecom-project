import { useState } from "react";
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
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import React from "react";
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

export default function Sell () {

    const [isInvalid, setIsInvalid] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('12345');
    const handleSubmit = () => {
        if (inputValue.length < 6) {
        setIsInvalid(true);
        } else {
        setIsInvalid(false);
        }
    };

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
                <HStack className="w-full mt-[20px]">
                    <Box>
                    
                        <FormControlLabel>
                        <FormControlLabelText>Category</FormControlLabelText>
                        </FormControlLabel>
                    
                    <Select>
                        <SelectTrigger variant="outline" size="md">
                            <SelectInput placeholder="Select option" />
                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label="Electronics" value="Electronics" />
                            <SelectItem label="Watches" value="watches" />
                            <SelectItem
                                label="Apparel"
                                value="CApparel"
                            />
                            <SelectItem label="Shoes" value="shoes" isDisabled={true} />
                            <SelectItem label="Hats" value="hats" />
                            </SelectContent>
                        </SelectPortal>
                    </Select>
                    </Box>
                    <Box>
                    </Box>
                </HStack>
                
                <HStack className="w-full mt-[20px]">
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
                

                <HStack className="w-full mt-[20px]">
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
                

                <HStack className="w-full mt-[20px]">
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

                <HStack space="lg" className="w-full mt-[20px]">
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