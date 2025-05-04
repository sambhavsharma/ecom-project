import React, {useState, useEffect} from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { View } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import * as ImagePicker from 'expo-image-picker';
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUser, updateUser } from "@/api/users";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

import ToastMessage from "@/components/widgets/ToastMessage";
import Loader from "@/components/widgets/Loader";

const ProfileSettings = () => {

    const {user, logout, updateUserData, isLoading} = useAuth();

    const {data, error, refetch} = useQuery({
        queryKey: ['users',user.id ], 
        queryFn: async () => getUser(String(user.id)),
        retry: false
    });
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

     // Form Values
     const [formData, setFormData] = useState({});

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

    useEffect(
        () => {
            if(data) {
                setFormData({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    bio: data.bio,
                    image: data.image
                })
            }
        },[data]
    )

    if(isLoading) {
        return ( <Loader /> );
    }

    const updateUserMutation = useMutation({
        mutationFn: (updateUserParams: object) => {

            return updateUser(updateUserParams.id, updateUserParams.user)
        },
        onSuccess: async (data) => {
            refetch();
            setAlertMessage(
                {
                    type: "success",
                    title: "Profile saved!"
                }
            )
            setShowMessage(true);
                await updateUserData({
                    ...user,
                    ...data
                })
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

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: false,
            base64: true,
        });
    
        if (!result.canceled) {

            let resultImage = result.assets[0];
            setFormData({
                ...formData,
                image: resultImage
            });
        }
    };

    const handleSubmit = () => {
        updateUserMutation.mutate({user: formData, id: user.id});
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
                    <Heading size="lg">Profile Details</Heading>
                    
                    <HStack>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Text>
                                Profile Image
                            </Text>
                        </Box>
                        <Box className="w-full p-2 max-w-[300px]">
                        {
                            formData.image ? 
                            <Image
                                source={{
                                    uri:  formData.image.uri || formData.image,
                                }}
                                alt="Logo"
                                size="none"
                                className="aspect-[320/208] w-full max-w-[160px]"
                            />
                            :
                            <Text className="my-2"> No Profile Image</Text>
                        }
                        
                        <Button size="xs" variant="outline" action="primary" className="max-w-[160px]"
                            onPress={pickImage}
                        >
                            <ButtonText>Update Photo</ButtonText>
                        </Button>
                        </Box>
                    </HStack>

                    <HStack>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Text>
                                First Name
                            </Text>
                        </Box>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Input
                                variant="outline"
                                size="md"
                            >
                                <InputField value={formData.first_name}
                                    onChangeText = {(text)=> setFormData({...formData, first_name: text})}
                                />
                            </Input>
                        </Box>
                    </HStack>

                    <HStack>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Text>
                                Last Name
                            </Text>
                        </Box>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Input
                                variant="outline"
                                size="md"
                            >
                                <InputField value={formData.last_name}
                                    onChangeText = {(text)=> setFormData({...formData, last_name: text})}
                                />
                            </Input>
                        </Box>
                    </HStack>

                    <HStack>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Text>
                                Email
                            </Text>
                        </Box>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Input
                                variant="outline"
                                size="md"
                                isDisabled={true}
                            >
                                <InputField value={user.email} />
                            </Input>
                        </Box>
                    </HStack>

                    <HStack>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Text>
                                About You
                            </Text>
                        </Box>
                        <Box className="w-full p-2 max-w-[300px]">
                            <Textarea
                                size="md"
                            >
                                <TextareaInput value={formData.bio} 
                                    onChangeText = {(text)=> setFormData({...formData, bio: text})}
                                />
                            </Textarea>
                        </Box>
                    </HStack>

                    <Button size="md" variant="solid" action="primary" className="max-w-[200px]"
                        onPress={handleSubmit}
                    >
                        <ButtonText>Update Profile</ButtonText>
                    </Button>
                </VStack>
            </View>
        </Box>
    );
};
export default ProfileSettings;