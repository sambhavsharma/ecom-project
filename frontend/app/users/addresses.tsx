import {useState, useEffect} from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { View } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserAddress, createUserAddress, updateAddress } from "@/api/addresses";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";

import ToastMessage from "@/components/widgets/ToastMessage";
import Loader from "@/components/widgets/Loader";

const AddressSettings = () => {

    const {user, logout, isLoading} = useAuth();

    const {data, error, refetch} = useQuery({
        queryKey: ['addresses',user.id ], 
        queryFn: async () => getUserAddress(String(user.id)),
        retry: false
    });
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const [addressId, setAddressId] = useState(null);

    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

     // Form Values
     const [formData, setFormData] = useState({});

    // Auth Check Begins
    useEffect(
        () => {
            const checkError = async () =>{
                if(error && error.status === 401){
                    await logout();
                    setIsAuthenticated(false);
                }
            }
            checkError()
        }, [error]
    )

    if(!isAuthenticated) {
        return (<Redirect href="/login" />)
    }

    // Auth Check Ends

    useEffect(
        () => {
            if(data) {
                setAddressId(data.id);
                setFormData({
                    address1: data.address1,
                    address2: data.address2,
                    address3: data.address3,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    postcode: data.postcode,
                    parent_type: "user",
                    parent_id: user.id
                })
            }
            
        },[data]
    )

    if(isLoading) {
        return ( <Loader /> );
    }

    const updateAddressMutation = useMutation({
        mutationFn: (updateAddressParams: object) => {

            return updateAddress(updateAddressParams.id, updateAddressParams.address)
        },
        onSuccess: async (data) => {
            refetch();
            setAlertMessage(
                {
                    type: "success",
                    title: "Address saved!"
                }
            )
            setShowMessage(true);
        },
        onError: async (err) => {
            
            if(err.status === 401){
                await logout();
                return <Redirect href="/login"/>;
            } else {
                
                setAlertMessage(
                    {
                        type: "error",
                        title: "Error updating!"
                    }
                )
                setShowMessage(true);
            }
        }
    })

    const createUserAddressMutation = useMutation({
        mutationFn: (updateAddressParams: object) => {

            return createUserAddress(user.id, updateAddressParams.address)
        },
        onSuccess: async (data) => {
            refetch();
            setAlertMessage(
                {
                    type: "success",
                    title: "Address saved!"
                }
            )
            setShowMessage(true);
        },
        onError: async (err) => {
            
            if(err.status === 401){
                await logout();
                return <Redirect href="/login"/>;
            } else {
                
                setAlertMessage(
                    {
                        type: "error",
                        title: "Error updating!"
                    }
                )
                setShowMessage(true);
            }
        }
    })

    const handleSubmit = () => {
        if(addressId)
            updateAddressMutation.mutate({address: formData, id: addressId});
        else
        createUserAddressMutation.mutate({address: formData});
    }

    return (
        // <Box className="flex-1 md:flex md:web:max-h-[calc(100vh-144px)] max-w-[340px] w-full pl-12 hidden">
        <Box className="flex-1 md:flex hidden">
            <ToastMessage 
                showMessage={showMessage} 
                setShowMessage={setShowMessage}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
            
            <View className="w-full">
                <VStack space="xl" className="py-6 px-8 min-w-[400px]">
                    <Heading size="lg">Manage Address</Heading>

                    <HStack>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Text>
                                Address Line 1
                            </Text>
                        </Box>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Input
                                variant="outline"
                                size="md"
                            >
                                <InputField value={formData.address1}
                                    onChangeText = {(text)=> setFormData({...formData, address1: text})}
                                />
                            </Input>
                        </Box>
                    </HStack>

                    <HStack>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Text>
                                Address Line 2
                            </Text>
                        </Box>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Input
                                variant="outline"
                                size="md"
                            >
                                <InputField value={formData.address2}
                                    onChangeText = {(text)=> setFormData({...formData, address2: text})}
                                />
                            </Input>
                        </Box>
                    </HStack>

                    <HStack>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Text>
                                Address Line 3
                            </Text>
                        </Box>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Input
                                variant="outline"
                                size="md"
                            >
                                <InputField value={formData.address3}
                                    onChangeText = {(text)=> setFormData({...formData, address3: text})}
                                />
                            </Input>
                        </Box>
                    </HStack>

                    <HStack>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Text>
                                Postcode
                            </Text>
                        </Box>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Input
                                size="md"
                            >
                                <InputField value={formData.postcode} 
                                    onChangeText = {(text)=> setFormData({...formData, postcode: text})}
                                />
                            </Input>
                        </Box>
                    </HStack>

                    <HStack>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Text>
                                City
                            </Text>
                        </Box>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Input
                                variant="outline"
                                size="md"
                            >
                                <InputField value={formData.city}
                                    onChangeText = {(text)=> setFormData({...formData, city: text})}
                                />
                            </Input>
                        </Box>
                    </HStack>

                    <HStack>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Text>
                                State
                            </Text>
                        </Box>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Input
                                size="md"
                            >
                                <InputField value={formData.state} 
                                    onChangeText = {(text)=> setFormData({...formData, state: text})}
                                />
                            </Input>
                        </Box>
                    </HStack>

                    <HStack>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Text>
                                Country
                            </Text>
                        </Box>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Select 
                                selectedValue={formData.country}
                                onValueChange={
                                    (text)=> {
                                        console.log(text);
                                        setFormData({...formData, country: text})
                                    }
                                }
                            >
                                <SelectTrigger variant="outline" size="md">
                                    <SelectInput placeholder="Select Country" />
                                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                </SelectTrigger>
                                
                                <SelectPortal>
                                    <SelectBackdrop />
                                    <SelectContent>    
                                        <SelectItem label="India" value="IN" />
                                        <SelectItem label="Singapore" value="SG" />
                                        <SelectItem label="UAE" value="UAE" />
                                    </SelectContent>
                                </SelectPortal>
                            </Select>
                        </Box>
                    </HStack>

                    <Button size="md" variant="solid" action="primary" className="max-w-[200px]"
                        onPress={handleSubmit}
                    >
                        <ButtonText>Update Address</ButtonText>
                    </Button>
                </VStack>
            </View>
        </Box>
    );
};
export default AddressSettings;