import {useState} from "react";

import { Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";

import SectionHeader from "@/components/search/filtersection/SectionHeader";

const ConditionSection = ({refetch, conditionFilter, filterQuery, setFilterQuery}) => {

  const [viewOptions, setViewOprions] = useState(false);

  const handleFilterChange = (condition) => {

    filterQuery["condition"] = condition;
    setFilterQuery({
      ...filterQuery
    });
    refetch();
  }

  return (
    <VStack space="sm" className="px-2">
      <SectionHeader title="Condition" viewOptions={viewOptions} setViewOprions={setViewOprions} />
      { viewOptions && <>
        <CheckboxGroup
          value={filterQuery["condition"]}
          onChange={handleFilterChange}
        >
          {Object.values(conditionFilter).map((condition: any) => {
            return (
              <Checkbox
                value={condition.name}
                size="sm"
                key={condition.name}
                className="my-2 justify-start"
              >
                <CheckboxIndicator>
                  <CheckboxIcon
                    as={CheckIcon}
                  />
                </CheckboxIndicator>
                <CheckboxLabel className="capitalize">
                    {condition.name.split('_').join(' ')}
                </CheckboxLabel>
              </Checkbox>
            );
          })}
        </CheckboxGroup>
      </> }
    </VStack>
  );
};
export default ConditionSection;