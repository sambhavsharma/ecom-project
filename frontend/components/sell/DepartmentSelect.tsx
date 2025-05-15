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

export default function DepartmentSelect({categoryMap, setFormData, formData}){

    return (
        <HStack className="w-full mt-[20px] z-[-1]">
            <Box>
                <VStack space="xs">
                    <FormControlLabel>
                        <FormControlLabelText>Department</FormControlLabelText>
                    </FormControlLabel>
                    <Select 
                        selectedValue={formData.department_id}
                        initialLabel={
                            (categoryMap.department && categoryMap.department[formData.department_id]) ? 
                            categoryMap.department[formData.department_id].name : 
                            ""
                        }
                        onValueChange={(value) => {
                            setFormData({
                                ...formData,
                                department_id: value,
                                category_id: null,
                                subcategory_id: null
                            })
                        }}
                    >
                        <SelectTrigger variant="outline" size="md">
                            <SelectInput placeholder="Select Department" />
                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                                {
                                    categoryMap && categoryMap.department && Object.values(categoryMap.department).map(
                                        (department) => {
                                            return (
                                                <>
                                                    <SelectItem key={department.id} label={department.name} value={department.id} />
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