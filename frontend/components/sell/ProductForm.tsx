import { StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { getCategoryMap } from "@/api/util";

import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { FormControl, 
    FormControlLabel, 
    FormControlLabelText, 
 } from "@/components/ui/form-control";

 import { Box } from "@/components/ui/box";
 import { ChevronDownIcon } from "@/components/ui/icon";
 import { Input, InputField } from "@/components/ui/input";
 import { Textarea, TextareaInput } from "@/components/ui/textarea";
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
 
import DepartmentSelect from "@/components/sell/formsections/DepartmentSelect";
import CategorySelect from "@/components/sell/formsections/CategorySelect";
import SubcategorySelect from "@/components/sell/formsections/SubcategorySelect";
import BrandSelect from "@/components/sell/formsections/BrandSelect";
import ImageSection from "@/components/sell/formsections/ImageSection";
import Loader from "@/components/widgets/Loader";

export default function ProductForm({ formData, setFormData}){

    const {data: categoryMap, isLoading} = useQuery({
        queryKey: ['categoryMap' ], 
        queryFn: getCategoryMap,
        retry: false
    });

    if(isLoading)
        return <Loader/>

    return (
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
                        value={formData.description} 
                        onChangeText = {(text)=> 
                            setFormData({
                                ...formData,
                                description: text
                            })
                        } 
                    />
                </Textarea>
            </VStack>

            {/* Item Brand Select */}
            <BrandSelect 
                formData={formData} 
                setFormData={setFormData} 
            />

            {/* Condition Select */}
            <HStack className="w-full mt-[20px] z-[-1]">
                <Box>
                    <VStack space="xs">
                        <FormControlLabel>
                            <FormControlLabelText>Condition</FormControlLabelText>
                        </FormControlLabel>
                        <Select 
                            selectedValue={formData.condition}
                            onValueChange={(value) => {
                                setFormData({
                                    ...formData,
                                    condition: value
                                })
                            }}
                        >
                            <SelectTrigger variant="outline" size="md">
                                <SelectInput placeholder="Select Condition" />
                                <SelectIcon className="mr-3" as={ChevronDownIcon} />
                            </SelectTrigger>
                            <SelectPortal>
                                <SelectBackdrop />
                                <SelectContent>
                                    <SelectItem label="New" value="new" />
                                    <SelectItem label="Like New" value="like_new" />
                                    <SelectItem label="Used" value="used" />
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                    </VStack>
                </Box>
            </HStack>
            
            <DepartmentSelect categoryMap={categoryMap} formData={formData} setFormData={setFormData} />

            <CategorySelect categoryMap={categoryMap} formData={formData} setFormData={setFormData} />

            <SubcategorySelect categoryMap={categoryMap} formData={formData} setFormData={setFormData} />
            
            {/* Attributes Select */}
            {/* {
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
            } */}
            
            {/* Item Price */}
            <HStack className="w-full mt-[20px] z-[-1]">
                <Box>
                    <VStack space="xs">
                    <FormControlLabel>
                        <FormControlLabelText>Price (₹)</FormControlLabelText>
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
            <ImageSection formData={formData} setFormData={setFormData}/>
        
        </FormControl>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 800,
        height: 800,
    },
});