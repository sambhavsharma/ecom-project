import React from "react";
import { Box } from "@/components/ui/box";
import Sidebar from "./Sidebar";

const WebSidebar = ({refetch, filters, filterQuery, setFilterQuery}) => {
  return (
    <Sidebar refetch={refetch} filters={filters} filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
  );
};
export default WebSidebar;