import React from "react";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";

import FiltersAppliedSection from "./filtersection/FiltersAppliedSection";
import BrandsSection from "./filtersection/BrandsSection";
import DepartmentSection from "./filtersection/DepartmentSection";
import CategorySection from "./filtersection/CategorySection";
import ConditionSection from "./filtersection/ConditionSection";

// import SortBySection from "./sidebar/SortBySection";

const Sidebar = ({refetch, filters, filterQuery, setFilterQuery}) => {
  
  return (
    <ScrollView  style={{flex:1}}>
      <VStack space="xl" className="py-6 px-4">
        <FiltersAppliedSection filters={filters} refetch={refetch} filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
        <DepartmentSection  refetch={refetch} departmentsFilter={filters["department"]} filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
        <CategorySection  refetch={refetch} categoriesFilter={filters["category"]} filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
        <BrandsSection  refetch={refetch} brandsFilter={filters["brand"]} filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
        <ConditionSection  refetch={refetch} conditionFilter={filters["condition"]}  filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
      </VStack>
    </ScrollView>
  );
};
export default Sidebar;