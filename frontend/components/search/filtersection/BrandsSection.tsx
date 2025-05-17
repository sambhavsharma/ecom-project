import { useEffect, useState } from "react";

import { Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { Icon, CheckIcon, ChevronUpIcon, ChevronDownIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

import SectionHeader from "@/components/search/filtersection/SectionHeader";

const BrandSection = ({refetch, brandsFilter, filterQuery, setFilterQuery}) => {

  const [viewAllComponents, setViewAllComponents] = useState(false);
  const [viewOptions, setViewOprions] = useState(false);

  const handleFilterChange = (brand) => {

    filterQuery["brand"] = brand;
    setFilterQuery({
      ...filterQuery
    });
    refetch();
  }

  return (
    <VStack space="sm" className="px-2">
      <SectionHeader title="Brand" viewOptions={viewOptions} setViewOprions={setViewOprions} />
      { viewOptions && <>
        <CheckboxGroup
          value={Object.values(filterQuery["brand"])}
          onChange={handleFilterChange}
        >
          {Object.values(brandsFilter).map((brand: any, index: number) => {
            if (index > 4 && !viewAllComponents) return null;
            return (
              <Checkbox
                value={brand.id.toString()}
                size="sm"
                key={brand.id.toString()}
                className="my-2 justify-start"
              >
                <CheckboxIndicator>
                  <CheckboxIcon
                    as={CheckIcon}
                  />
                </CheckboxIndicator>
                <CheckboxLabel>{brand.name}</CheckboxLabel>
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
      </>}
    </VStack>
  );
};
export default BrandSection;