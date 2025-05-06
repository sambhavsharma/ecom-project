import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
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
import { getProduct, updateProduct, deleteProduct } from "@/api/products";

import CategorySelect from "@/components/sell/CategorySelect";
import DeleteButton from "@/components/sell/DeleteButton";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

import Loader from "@/components/widgets/Loader";
import ToastMessage from "@/components/widgets/ToastMessage";

export default function SellProduct () {

    const {product_id} = useLocalSearchParams();
    const [redirectLogin, setRedirectLogin] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const {logout, user, isLoading} = useAuth();

    // Form Values

    const [formData, setFormData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});
    const [attributes, setAttributes] = useState({});

    const {data: product, isLoading: isProductLoading} = useQuery({
        queryKey: ['products',product_id ], 
        queryFn:() => getProduct(String(product_id)),
        retry: false
    });

    useEffect(
        () => {
            const updateFormData = () => {
                setFormData({
                    name: product.name,
                    description: product.description,
                    status: product.status,
                    condition: product.condition,
                    brand: product.brand,
                    currency: product.currency,
                    price: product.price,
                    category: product.category,
                    attributes: product.attributes,
                    media: product.media
                })

                setSelectedCategory(product.category);
            }

            if(product) 
                updateFormData()
        }, [product]
    )
    
    const handleSubmit = async (status: string) => {

        let media = [];

        for (let image of formData.media) {
            let imageObj = {
                fileName: image.fileName,
                mimeType: image.mimeType,
                type: "image",
                uri: image.base64
            };
            
            media.push(imageObj);
        }

        const product = {
            ...formData,
            media: media,
            status: status
        }
        
        console.log(formData);

        updateProductMutation.mutate({ media, product});
    };

    const attributesUpdate = (attribute_id: number, value: string) => {

        attributes[attribute_id] = value
        setAttributes(attributes);
    }

    const {data, isLoading: isLoadingCategories} = useQuery({queryKey: ['categories'], queryFn:() => listCategories()});

    const updateProductMutation = useMutation({
        mutationFn: (productObj: object) => {
            return updateProduct(productObj, product_id)
        },
        onSuccess: (data) => {
            setShowMessage(true);
            
            let message = "Product updated!";
            setAlertMessage(
                {
                    type: "success",
                    title: message
                }
            )
        },
        onError: async (err) => {

            if(err.status === 401){
            
                await logout();
                setRedirectLogin(true);
            
            } else {
                let message = "Could not update product!";

                setAlertMessage(
                    {
                        type: "error",
                        title: message
                    }
                )
                setShowMessage(true);
            }
        }
    })

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
            setFormData({
                ...formData,
                media: result.assets
            })
        }
    };

    const getSelectedAttribute = (attribute) => {

        let selectedValue = "";

        let matchedAttribute = formData.attributes.filter((obj) => {
            return obj.name === attribute.name
        })

        if(matchedAttribute[0]) {
            selectedValue = matchedAttribute[0].value;
        }

        return selectedValue;
    }

    if(isLoading || isProductLoading || isLoadingCategories) {
        return ( <Loader /> );
    }

    if(!user || redirectLogin){
        return <Redirect href="/login"/>
    }
    
    return (
        <ScrollView>

            <ToastMessage 
                showMessage={showMessage} 
                setShowMessage={setShowMessage}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />

            <Center>
                <VStack  space="lg" className="w-full max-w-[800px] rounded-md border-background-200 p-4">
                    <Heading>
                        Sell your product
                    </Heading>
                    <FormControl isInvalid={false} size="md" isDisabled={false} isReadOnly={false} isRequired={false} >
                    
                        {/* Item Name */}
                        <HStack className="w-full mt-[20px] z-[-1]">
                            <Box>
                                <VStack space="xs">
                                    <FormControlLabel>
                                        <FormControlLabelText>Item Name</FormControlLabelText>
                                    </FormControlLabel>
                                    <Input className="min-w-[250px]">
                                        <InputField type="text" value={formData.name} 
                                            onChangeText = {(text)=> {
                                                setFormData({
                                                    ...formData,
                                                    name: text
                                                })
                                            }} 
                                        />
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
                                    value={formData.description} onChangeText = {(text)=> 
                                        setFormData({
                                            ...formData,
                                            description: text
                                        })} 
                                />
                            </Textarea>
                        </VStack>

                        {/* Item Status */}
                        <HStack className="w-full mt-[20px] z-[-1]">
                            <Box>
                                <VStack space="xs">
                                    <FormControlLabel>
                                        <FormControlLabelText>Status</FormControlLabelText>
                                    </FormControlLabel>
                                    <Input className="min-w-[250px]" isDisabled={true}>
                                        <InputField type="text" value={formData.status} />
                                    </Input>
                                </VStack>
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
                                        <InputField type="text" value={formData.brand} 
                                        onChangeText = {(text)=> 
                                            setFormData({
                                                ...formData,
                                                brand: text
                                            })
                                        }  />
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
                                    <Select onValueChange={(value) => {
                                            setFormData({
                                                ...formData,
                                                condition: value
                                            })
                                        }}
                                        selectedValue={formData.condition}
                                    >
                                        <SelectTrigger variant="outline" size="md">
                                            <SelectInput placeholder="Select Condition" />
                                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                        </SelectTrigger>
                                        <SelectPortal>
                                            <SelectBackdrop />
                                            <SelectContent>
                                                <SelectItem label="New" value="new" />
                                                <SelectItem label="Almost New" value="almost-new" />
                                                <SelectItem label="Used" value="used" />
                                            </SelectContent>
                                        </SelectPortal>
                                    </Select>
                                </VStack>
                            </Box>
                        </HStack>
                        
                        {/* Category Select */}
                        <CategorySelect data={data} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                        
                        {/* Attributes Select */}
                        {
                            selectedCategory && selectedCategory.attributes && 
                            selectedCategory.attributes.map((attribute: any) => {
                                return (
                                    <HStack key={attribute.id} className="w-full mt-[20px] z-[-1]">
                                        <Box>
                                            <VStack space="xs">
                                                <FormControlLabel>
                                                    <FormControlLabelText>
                                                        {attribute.name}
                                                    </FormControlLabelText>
                                                </FormControlLabel>
                                                <Select onValueChange={(value) => {attributesUpdate(attribute.id, value)}}
                                                    selectedValue={ getSelectedAttribute(attribute) }
                                                >
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
                                                                        <SelectItem key={value} label={value} value={value} />
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
                                    <InputField type="text" value={formData.price} 
                                        onChangeText = {(text)=> 
                                            setFormData({
                                                ...formData,
                                                price: text.replace(/[^0-9]/g, '')
                                            })
                                        }
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
                                        formData.media && formData.media.map((img: any) => {
                                            return (
                                                <Image key={img.id} source={{ uri: img.url || img.uri }} style={styles.image} />
                                            );
                                        })
                                    }
                                </HStack>
                            </Box>
                        </HStack>                 

                    </FormControl>

                    <HStack className="mt-[20px] z-[-1]" space="md">

                        <Button className="w-fit self-end mt-4" size="sm" 
                            onPress= {() => {handleSubmit("draft")}}
                        >
                            <ButtonText>Save Draft</ButtonText>
                        </Button>

                        <Button className="w-fit self-end mt-4" size="sm" 
                            onPress= {() => {handleSubmit("live")}}
                        >
                            <ButtonText> Publish </ButtonText>
                        </Button>
                        
                        <DeleteButton setShowMessage={setShowMessage} setAlertMessage={setAlertMessage} 
                            productId={product_id} user={user} setRedirectLogin={setRedirectLogin} logout={logout}
                        />
                        
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