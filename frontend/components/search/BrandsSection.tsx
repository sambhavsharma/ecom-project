import { useState } from "react";

import { Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

const BrandSection = ({refetch, brandsFilter, filterQuery, setFilterQuery}) => {

  const colorMode = "light";

  const handleFilterChange = (brand) => {

    filterQuery["brand"] = brand;
    setFilterQuery({
      ...filterQuery
    });
    refetch();
  }

  return (
    <VStack space="sm" className="px-2">
      <Heading size="sm">Brand</Heading>
      <CheckboxGroup
        value={filterQuery["brand"]}
        onChange={handleFilterChange}
        accessibilityLabel="place-type"
      >
        {brandsFilter.map((brand: any) => {
          return (
            <Checkbox
              value={brand.name}
              size="sm"
              key={brand.name}
              accessibilityLabel={brand.name}
              className="my-2 justify-start"
            >
              <CheckboxIndicator>
                <CheckboxIcon
                  as={CheckIcon}
                  color={colorMode === "light" ? "#FEFEFF" : "#171717"}
                />
              </CheckboxIndicator>
              <CheckboxLabel>{brand.name}</CheckboxLabel>
            </Checkbox>
          );
        })}
      </CheckboxGroup>
    </VStack>
  );
};
export default BrandSection;