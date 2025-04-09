import React from "react";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";
// import AmenitiesSection from "./sidebar/AmenitiesSection";
// import BookingOptions from "./sidebar/BookingOptions";
// import CustomerRatingSection from "./sidebar/CustomerRatingSection";
// import FiltersAppliedSection from "./sidebar/FiltersAppliedSection";
// import PlaceTypeSection from "./sidebar/PlaceTypeSection";
// import PriceRangeSection from "@/components/search/sidebar/PriceRangeSection";

import PriceRangeSection from "./PriceRangeSection";
import CustomerRatingSection from "./CustomerRatingSection";
import PlaceTypeSection from "./PlaceTypeSection";

// import SortBySection from "./sidebar/SortBySection";

const Sidebar = () => {
  const [scrollEnabled, setScrollEnabled] = React.useState<boolean>(true);
  return (
    <ScrollView className="w-full" scrollEnabled={scrollEnabled}>
      <VStack space="xl" className="py-6 px-4">
        {/* <FiltersAppliedSection /> */}
        {/* <SortBySection /> */}
        <PlaceTypeSection />
        {/* <AmenitiesSection /> */}
        <PriceRangeSection setScrollEnabled={setScrollEnabled} />
        {/* <BookingOptions /> */}
        <CustomerRatingSection /> 
      </VStack>
    </ScrollView>
  );
};
export default Sidebar;