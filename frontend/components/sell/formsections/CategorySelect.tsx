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

export default function CategorySelect({categoryMap, setFormData, formData}){

    return (
        <HStack className="w-full mt-[20px] z-[-1]">
            <Box>
                <VStack space="xs">
                    <FormControlLabel>
                        <FormControlLabelText>Category</FormControlLabelText>
                    </FormControlLabel>
                    <Select 
                       initialLabel={
                            (categoryMap.category && categoryMap.category[formData.department_id]
                                && categoryMap.category[formData.department_id][formData.category_id]) ? 
                                categoryMap.category[formData.department_id][formData.category_id].name : 
                            ""
                        }
                        selectedValue={formData.category_id}
                        onValueChange={(value) => {
                            setFormData({
                                ...formData,
                                category_id: value,
                                subcategory_id: null
                            })
                        }}
                        isDisabled={formData?.department_id ? false : true}
                    >
                        <SelectTrigger variant="outline" size="md">
                            <SelectInput placeholder="Select Category" />
                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                                {
                                    categoryMap && categoryMap.category && categoryMap.category[formData?.department_id]
                                        && Object.values(categoryMap.category[formData.department_id]).map(
                                        (category) => {
                                            return (
                                                <>
                                                    <SelectItem key={category.id} label={category.name} value={category.id} />
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