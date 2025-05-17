import React, { useEffect, useState } from "react";

import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";

import { listBrands } from "@/api/brands";

import { useQuery } from "@tanstack/react-query";

import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Pressable } from "@/components/ui/pressable";
import {ChevronDownIcon } from "@/components/ui/icon";

import useDebounce from "@/util/useDebounce";

import {
    FormControlLabel, 
    FormControlLabelText, 
} from "@/components/ui/form-control";

export default function BrandSelect({ formData, setFormData}){

    const [brandSelectFocus, setBrandSelectFocus] = useState(false);
    const [brandsQuery, setBrandsQuery] = useState('');
    const [query, setQuery] = useState('');
    const [showBrandMenu, setShowBrandMenu] = React.useState(false);

    useEffect(
        () => {
            if(formData.brand)
                setQuery(formData.brand.name);

        }, [formData.brand]
    )

    const {data: brandOptions} = useQuery(
        {queryKey: ['brands', brandsQuery], 
        queryFn:() => listBrands(brandsQuery)
    });

    const brandSelect = (brand: number) => {
        setFormData({
            ...formData,
            brand_id: brand.id
        });
        setQuery(brand.name);
        setShowBrandMenu(false);
    }

    useDebounce(() => {
        setBrandsQuery(query);
      }, [query], 500
    );

    const handleQueryInput = (text) => {
        setQuery(text);
    }

    return (
        <HStack className="w-full mt-[20px] z-30">
            <Box>     
                <FormControlLabel>
                    <FormControlLabelText>Brand</FormControlLabelText>
                </FormControlLabel>

                <Input className="text-center"  >
                    <InputField 
                        onFocus={ () => {setShowBrandMenu(true)}} 
                        onBlur={ () => { !brandSelectFocus && setShowBrandMenu(false)}} 
                        onChangeText = {(text)=> {
                            handleQueryInput(text);
                        }}
                        value={query}
                    />
                    
                    <InputSlot className="pr-3"  >
                        <InputIcon as={ChevronDownIcon} />
                    </InputSlot>
                </Input>
                
                { showBrandMenu && brandOptions &&
                    <Card size="md" variant="elevated" 
                        className="shadow-lg p-0 w-full absolute top-full max-h-96 overflow-y-auto">

                        {
                            brandOptions
                                .map((brandOption: any, index: number) => {
                                return (
                                    <Pressable  
                                        onPress={
                                            () => {
                                                brandSelect(brandOption)
                                            }
                                        } 
                                        onHoverIn={() => { console.log('In'); setBrandSelectFocus(true)}}
                                        onHoverOut={() => { console.log('Out'); setBrandSelectFocus(false)}}
                                        className="w-full"
                                        key={brandOption.id}
                                    >
                                        <HStack className="w-full cursor-pointer hover:bg-gray-50">
                                            <Heading size="sm" className="w-full mb-1 p-3"> 
                                                {brandOption.name}
                                            </Heading>
                                        </HStack>
                                        <Divider/>
                                    </Pressable>
                                );
                            })
                        }
                    </Card>
                }
            </Box>
        </HStack>
    );
}