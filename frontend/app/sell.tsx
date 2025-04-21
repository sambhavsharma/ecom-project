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
    SelectItem,
} from "@/components/ui/select";

import { AddIcon, ChevronDownIcon } from "@/components/ui/icon";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import * as ImagePicker from 'expo-image-picker';
import { useQuery, useMutation } from "@tanstack/react-query";
import { listCategories } from "@/api/categories";
import { createProduct } from "@/api/products";

import CategorySelect from "@/components/sell/CategorySelect";

export default function Sell () {

    const [isInvalid, setIsInvalid] = useState(false);
    const [inputValue, setInputValue] = useState('12345');
    

    // Form Values
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [attributes, setAttributes] = useState({});

    const handleSubmit = async (status: string) => {

        let media = [];

        for (let image of images) {
            let imageObj = {
                filename: image.fileName,
                mimetype: image.mimeType,
                type: "image",
                uri: image.base64
            };
            
            media.push(imageObj);
        }

        const product = {
            name: name,
            description: description,
            brand: brand,
            condition: condition,
            price: price,
            currency: "INR",
            seller_id: 1,
            category_id: selectedCategory.id,
            attributes: attributes,
            status: status,
            media: media
        }

        createProductMutation.mutate({ media, product});
    };

    const attributesUpdate = (attribute_id: number, value: string) => {

        attributes[attribute_id] = value
        setAttributes(attributes);
    }

    const {data, isLoading, err} = useQuery({queryKey: ['categories'], queryFn:() => listCategories()});

    const createProductMutation = useMutation({
        mutationFn: (productObj: object) => {
            return createProduct(productObj)
        },
        onSuccess: (data) => {
            console.log(data);
            console.log("success");
        },
        onError: (e) => {
            console.log(e);
            console.log("error");
        }
    })
    
    if(err) {
        return <Text>Explore Similar Products!</Text>;
    }

    const [images, setImages] = useState<any>([]);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images','videos'],
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
            base64: true,
        });
    
        if (!result.canceled) {
            console.log(result);
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
                                <InputField type="text" value={name} 
                                        onChangeText = {(text)=> setName(text)} />
                            </Input>
                        </VStack>
                    </Box>
                </HStack>

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
                        <TextareaInput placeholder="Your text goes here..." 
                            value={description} onChangeText = {(text)=> setDescription(text)} 
                        />
                    </Textarea>
                </VStack>

                 {/* Item Brand */}
                 <HStack className="w-full mt-[20px] z-[-1]">
                    <Box>
                        <VStack space="xs">
                            <FormControlLabel>
                                <FormControlLabelText> Brand</FormControlLabelText>
                            </FormControlLabel>
                            <Input className="min-w-[250px]">
                                <InputField type="text" value={brand} 
                                onChangeText = {(text)=> setBrand(text)}  />
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
                            <Select onValueChange={(value) => {setCondition(value)}}>
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
                
                 {/* Attributes Select */}
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
                                            <Select onValueChange={(value) => {attributesUpdate(attribute.id, value)}}>
                                                <SelectTrigger variant="outline" size="md">
                                                    <SelectInput placeholder={`Select ${attribute.name}`} />
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
                
                 {/* Item Price */}
                 <HStack className="w-full mt-[20px] z-[-1]">
                    <Box>
                        <VStack space="xs">
                        <FormControlLabel>
                            <FormControlLabelText>Price</FormControlLabelText>
                        </FormControlLabel>
                        <Input className="min-w-[250px]">
                            <InputField type="text" value={price} 
                                onChangeText = {(text)=> setPrice(text.replace(/[^0-9]/g, ''))}
                            />
                        </Input>
                        </VStack>
                    </Box>
                </HStack>   

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
                    <Button className="w-fit self-end mt-4" size="sm" 
                        onPress= {() => {handleSubmit("dratf")}}
                    >
                        <ButtonText>Save Draft</ButtonText>
                    </Button>
                    <Button className="w-fit self-end mt-4" size="sm" 
                        onPress= {() => {handleSubmit("live")}}
                    >
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