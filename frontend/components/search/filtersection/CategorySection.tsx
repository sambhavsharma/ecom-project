import { useState } from "react";

import { Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { Icon, CheckIcon, ChevronUpIcon, ChevronDownIcon, AddIcon, RemoveIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

import SectionHeader from "@/components/search/filtersection/SectionHeader";

const CategorySection = ({refetch, categoriesFilter, filterQuery, setFilterQuery}) => {

  const [viewAllComponents, setViewAllComponents] = useState(false);
  const [viewOptions, setViewOprions] = useState(true);

  const handleFilterChange = (category) => {

    filterQuery["category"] = category;
    setFilterQuery({
      ...filterQuery
    });
    refetch();
  }

  return (
    <VStack space="sm" className="px-2">

      <SectionHeader title="Category" viewOptions={viewOptions} setViewOprions={setViewOprions} />

      { viewOptions && <>
        <CheckboxGroup
          value={filterQuery["category"]}
          onChange={handleFilterChange}
        >
          {Object.values(categoriesFilter).map((category: any, index: number) => {
            if (index > 4 && !viewAllComponents) return null;
            return (
              <Checkbox
                value={category.id.toString()}
                size="sm"
                key={category.id.toString()}
                className="my-2 justify-start"
              >
                <CheckboxIndicator>
                  <CheckboxIcon
                    as={CheckIcon}
                  />
                </CheckboxIndicator>
                <CheckboxLabel>{category.name}</CheckboxLabel>
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
      </> }
    </VStack>
  );
};
export default CategorySection;