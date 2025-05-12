import React from "react";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";

// import AmenitiesSection from "./sidebar/AmenitiesSection";
// import BookingOptions from "./sidebar/BookingOptions";
// import CustomerRatingSection from "./sidebar/CustomerRatingSection";
// import FiltersAppliedSection from "./sidebar/FiltersAppliedSection";
// import PlaceTypeSection from "./sidebar/PlaceTypeSection";
// import PriceRangeSection from "@/components/search/sidebar/PriceRangeSection";
// import PriceRangeSection from "./PriceRangeSection";
// import CustomerRatingSection from "./CustomerRatingSection";

import FiltersAppliedSection from "./FiltersAppliedSection";
import BrandsSection from "./BrandsSection";
import ConditionSection from "./ConditionSection";

// import SortBySection from "./sidebar/SortBySection";

const Sidebar = ({refetch, filters, filterQuery, setFilterQuery}) => {
  
  return (
    <ScrollView  style={{flex:1}}>
      <VStack space="xl" className="py-6 px-4">
        <FiltersAppliedSection refetch={refetch} filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
        <BrandsSection  refetch={refetch} brandsFilter={filters["brand"]} filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
        <ConditionSection  refetch={refetch} conditionFilter={filters["condition"]}  filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
      </VStack>
    </ScrollView>
  );
};
export default Sidebar;