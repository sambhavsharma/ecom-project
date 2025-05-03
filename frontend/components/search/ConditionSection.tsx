import {useState} from "react";

import { Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

const ConditionSection = ({refetch, conditionFilter, filterQuery, setFilterQuery}) => {

  const colorMode = "light";

  const handleFilterChange = (condition) => {

    filterQuery["condition"] = condition;
    setFilterQuery({
      ...filterQuery
    });
    refetch();
  }

  return (
    <VStack space="sm" className="px-2">
      <Heading size="sm">Condition</Heading>
      <CheckboxGroup
        value={filterQuery["condition"]}
        onChange={handleFilterChange}
        accessibilityLabel="place-type"
      >
        {conditionFilter.map((condition: any) => {
          return (
            <Checkbox
              value={condition.name}
              size="sm"
              key={condition.name}
              accessibilityLabel={condition.name}
              className="my-2 justify-start"
            >
              <CheckboxIndicator>
                <CheckboxIcon
                  as={CheckIcon}
                  color={colorMode === "light" ? "#FEFEFF" : "#171717"}
                />
              </CheckboxIndicator>
              <CheckboxLabel>{condition.name}</CheckboxLabel>
            </Checkbox>
          );
        })}
      </CheckboxGroup>
    </VStack>
  );
};
export default ConditionSection;