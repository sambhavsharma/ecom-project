import {useEffect} from "react";
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

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";

import { ChevronDownIcon } from "@/components/ui/icon";

import {
    FormControlLabel, 
    FormControlLabelText, 
} from "@/components/ui/form-control";

export default function SubcategorySelect({categoryMap, setFormData, formData}){

    return (
        <HStack className="w-full mt-[20px] z-[-1]">
            <Box>
                <VStack space="xs">
                    <FormControlLabel>
                        <FormControlLabelText>Select Sub Category</FormControlLabelText>
                    </FormControlLabel>
                    <Select 
                        initialLabel={
                            (categoryMap.subcategory && categoryMap.subcategory[formData.category_id]
                                && categoryMap.subcategory[formData.category_id][formData.subcategory_id]) ? 
                                categoryMap.subcategory[formData.category_id][formData.subcategory_id].name : 
                            ""
                        }
                        selectedValue={formData.subcategory_id}
                        onValueChange={(value) => {
                            setFormData({
                                ...formData,
                                subcategory_id: value
                            })
                        }}
                        isDisabled={formData?.category_id ? false : true}
                    >
                        <SelectTrigger variant="outline" size="md">
                            <SelectInput placeholder="Select Sub Category" />
                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                                {
                                    categoryMap && categoryMap.subcategory && categoryMap.subcategory[formData?.category_id]
                                        && Object.values(categoryMap.subcategory[formData.category_id]).map(
                                        (subcategory) => {
                                            return (
                                                <>
                                                    <SelectItem key={subcategory.id} label={subcategory.name} value={subcategory.id} />
                                                </>
                                            )
                                        }
                                    )
                                }
                            </SelectContent>
                        </SelectPortal>
                    </Select>
                </VStack>
            </Box>
        </HStack>
    );
}