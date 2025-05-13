import { useState } from "react";

import { Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { Icon, CheckIcon, ChevronUpIcon, ChevronDownIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

const DepartmentSection = ({refetch, departmentsFilter, filterQuery, setFilterQuery}) => {

  const [viewAllComponents, setViewAllComponents] = useState(false);

  const handleFilterChange = (department) => {

    filterQuery["department"] = department;
    setFilterQuery({
      ...filterQuery
    });
    refetch();
  }

  return (
    <VStack space="sm" className="px-2">
      <Heading size="sm">Department</Heading>
      <CheckboxGroup
        value={filterQuery["department"]}
        onChange={handleFilterChange}
        accessibilityLabel="department"
      >
        {departmentsFilter.map((department: any, index: number) => {
          if (index >= 4 && !viewAllComponents) return null;
          return (
            <Checkbox
              value={department.name}
              size="sm"
              key={department.name}
              accessibilityLabel={department.name}
              className="my-2 justify-start"
            >
              <CheckboxIndicator>
                <CheckboxIcon
                  as={CheckIcon}
                />
              </CheckboxIndicator>
              <CheckboxLabel>{department.name}</CheckboxLabel>
            </Checkbox>
          );
        })}
      </CheckboxGroup>
      {viewAllComponents ? (
        <Pressable
          onPress={() => {
            setViewAllComponents(false);
          }}
        >
          <HStack className="justify-between">
            <Text size="sm" className="font-medium">
              Show less
            </Text>
            <Icon as={ChevronUpIcon} size="sm" />
          </HStack>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            setViewAllComponents(true);
          }}
        >
          <HStack className="justify-between">
            <Text size="sm" className="font-medium">
              Show more
            </Text>
            <Icon as={ChevronDownIcon} size="sm" />
          </HStack>
        </Pressable>
      )}
    </VStack>
  );
};
export default DepartmentSection;