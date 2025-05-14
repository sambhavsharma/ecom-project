import {useState} from "react";

import { Box } from "@/components/ui/box";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon, CloseIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

const FiltersAppliedSection = ({filters, refetch, filterQuery, setFilterQuery}) => {

    const [triggerRefetch, setTriggerRefetch] = useState(false);
    const filterSections = ["department", "category", "brand", "condition"];

    const removeItem = (array: [], itemToRemove: string) => {
        const index = array.indexOf(itemToRemove);

        if (index !== -1) {
            array.splice(index, 1);
        }
    }

    const clearFilters = async () => {
        filterQuery = {
            brand: [], 
            condition: [],
            department: [],
            category: []
        } ;

        await setFilterQuery({
            ...filterQuery
        });

        setTriggerRefetch(true);   
    }

    const removeFilter = async (key, id) => {
        removeItem(filterQuery[key], id);

        await setFilterQuery({
            ...filterQuery
        });

        setTriggerRefetch(true); 
    }

    if(triggerRefetch) {
        refetch();
        setTriggerRefetch(false);
    }

    return (
        <>
        {
            Object.values(filterQuery).filter(k => k.length > 0).length > 0 &&    
            <Box className="border rounded-md p-4 border-outline-100">
                
                    <HStack className="justify-between items-center">
                        
                        
                        <Text size="sm" className="font-medium">
                            Filters applied
                        </Text>
                        <Button
                            variant="link"
                            size="xs"
                            onPress={clearFilters}
                            className={`${Object.values(filterQuery).filter(k => k.length > 0).length === 0 ? "hidden" : "flex"} p-0`}
                        >
                            <ButtonText>Clear all</ButtonText>
                        </Button>
                    </HStack>
            

                <HStack space="sm" className='flex-wrap'>
                    
                    {
                        filterSections.map((section) => (
                            <>
                                 {
                                    ( (filterQuery[section] || []))
                                    .map((item: any) => (
                                        <Badge
                                            action="muted"
                                            key={item}
                                            className="rounded-full px-2.5 py-2 mt-3 items-center"
                                        >
                                            
                                            <BadgeText className="normal-case text-typography-900 capitalize">
                                                {
                                                    filters[section][item] ? 
                                                        filters[section][item].name.split('_').join(' ')
                                                        : 
                                                        ""
                                                }
                                            </BadgeText>
                                            
                                            <Pressable
                                                className="ml-2 rounded-full"
                                                onPress={() => {
                                                    removeFilter(section,item);
                                                }}
                                            >
                                                <Icon
                                                    as={CloseIcon}
                                                    size="sm"
                                                />
                                            </Pressable>
                                        </Badge>
                                    ))
                                }
                            </>
                        ))
                    }

                   

                    {/* {
                        ( Object.values(filterQuery).filter(k => k.length > 0).join().split(','))
                        .map((item: any) => (
                            <Badge
                                action="muted"
                                key={item}
                                className="rounded-full px-2.5 py-2 mt-3 items-center"
                            >
                                
                                <BadgeText className="normal-case text-typography-900">
                                    {item}
                                </BadgeText>
                                
                                <Pressable
                                    className="ml-2 rounded-full"
                                    onPress={() => {
                                        removeFilter(item);
                                    }}
                                >
                                    <Icon
                                        as={CloseIcon}
                                        size="sm"
                                    />
                                </Pressable>
                            </Badge>
                    ))} */}
                </HStack>
            </Box>
        }
        </>
    );
};
export default FiltersAppliedSection;