import React, { useContext } from "react";

import { Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

// import { ThemeContext } from "@/App";

const PlaceTypeSection = () => {
  const sidebarFiltersPlaceType = [
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Nike",
      value: "nike",
    },
    {
      label: "Dyson",
      value: "dysom",
    },
    {
        label: "Sony",
        value: "sony",
      },
  ];
//   const { colorMode } = useContext(ThemeContext);
    const colorMode = "light";
  const [values, setValues] = React.useState(["entirePlace"]);

  return (
    <VStack space="sm" className="px-2">
      <Heading size="sm">Label</Heading>
      <CheckboxGroup
        value={values}
        onChange={setValues}
        accessibilityLabel="place-type"
      >
        {sidebarFiltersPlaceType.map((placeType: any) => {
          return (
            <Checkbox
              value={placeType.value}
              size="sm"
              key={placeType.value}
              accessibilityLabel={placeType.value}
              className="my-2 justify-start"
            >
              <CheckboxIndicator>
                <CheckboxIcon
                  as={CheckIcon}
                  color={colorMode === "light" ? "#FEFEFF" : "#171717"}
                />
              </CheckboxIndicator>
              <CheckboxLabel>{placeType.label}</CheckboxLabel>
            </Checkbox>
          );
        })}
      </CheckboxGroup>
    </VStack>
  );
};
export default PlaceTypeSection;