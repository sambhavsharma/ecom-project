import {useState, useRef} from "react";
import { ScrollView } from "react-native";

import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { useQuery, useMutation } from "@tanstack/react-query";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";
import { Icon, StarIcon, FavouriteIcon, CloseIcon } from "@/components/ui/icon";
import { useAuth } from "@/providers/AuthProvider";
import { Link, Redirect } from "expo-router";
import ToastMessage from "@/components/widgets/ToastMessage";
import Loader from "@/components/widgets/Loader";
import ImageGallery from "@/components/imagegallery/ImageGallery";

import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
  } from "@/components/ui/modal"

import { getProduct } from "@/api/products";
import { createFavorite, deleteFavorite, checkUserFavorite } from "@/api/favorites";

export default function ProductDetailsScreen(){

    const {product_id} = useLocalSearchParams();
    const {user, logout} = useAuth();
    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [redirectLogin, setRedirectLogin] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showModal, setShowModal] = useState(false)

    const {data, isLoading} = useQuery({
        queryKey: ['products',product_id ], 
        queryFn:() => getProduct(String(product_id)),
        retry: false
    });

    const {data: isFavoriteResponse} = useQuery({
        queryKey: ['favorites',product_id ], 
        queryFn:() => checkUserFavorite(String(product_id)),
        retry: false
    });

    const toggleFavoriteMutation = useMutation({
        mutationFn: (favorite) => {
            return isFavorite ? deleteFavorite({product_id: product_id}) : createFavorite({favorite})
           
        },
        onSuccess: async (data) => {

            setShowMessage(true);
            setIsFavorite(isFavorite ? false : true);

            let message =  (isFavorite ? "Removed from" : "Added to") + " wishlist!";
            setAlertMessage(
                {
                    type: "success",
                    title: message
                }
            )

        },
        onError: async (err) => {
            
            if(err.status === 401){
                
                await logout();
                setRedirectLogin(true);

            } else {
                let message = "Could not " + isFavorite ? "remove from" : "add to" + " wishlist!";

                setAlertMessage(
                    {
                        type: "error",
                        title: message
                    }
                )
                setShowMessage(true);
            }
        }
    })

    const handleToggleFavorite = () => {
        if(!user) {
            setRedirectLogin(true);
            return;
        }

        toggleFavoriteMutation.mutate({user_id: user.id, product_id: parseInt(product_id)});
    }

    if(isLoading) {
        return <Loader/>;
    }

    if(redirectLogin)
        return <Redirect href="/login" />

    return (
        <ScrollView>

            <ToastMessage 
                showMessage={showMessage} 
                setShowMessage={setShowMessage}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />

            <Center>
                <VStack>
                    <HStack space="2xl" className="max-w-[1300px]">
                        <ImageGallery media={data.media} setShowModal={setShowModal} />
                        <Box className="items-center p-3 flex-1">
                            <Box className=" mx-auto p-5 rounded-lg max-w-[360px] m-3 flex-1">
                                <VStack space="lg" className="mb-6">
                                    <HStack>
                                        <Box className="w-full">
                                            <Text className="text-lg font-normal text-typography-700">
                                                {data.name}
                                            </Text>
                                        </Box>
                                        <Box className="w-full max-w-[15px] m-auto">
                                            <Pressable onPress={() => {handleToggleFavorite()}}>
                                                <Icon
                                                    size="lg"
                                                    as={FavouriteIcon}
                                                    className= {`text-typography-900 fill-${isFavorite ? 'black' : 'none'}`}
                                                />
                                            </Pressable>
                                        </Box>
                                    </HStack>
                                    

                                    <VStack space="sm" className="mb-2">
                                        {
                                            data.attributes.map(
                                                (attribute: any, index: number) => {
                                                    return(
                                                        <Text size="sm">
                                                            {attribute.name}: {attribute.value}
                                                        </Text>
                                                    ) 
                                                }
                                            )
                                        }
                                        <Text size="sm">
                                            Brand: {data.brand ? data.brand.name: 'Unbranded'}
                                        </Text>

                                        <Text size="sm">
                                            Condition: {data.condition}
                                        </Text>
                                    </VStack>

                                    <Heading size="md" className="mb-1">
                                        {data.amount_formatted}
                                    </Heading>
                                    

                                    <Text size="md">
                                        {data.description}
                                    </Text>

                                    {
                                        (user && (data.seller.id === user.id))  &&
                                        <VStack space="sm" className="mb-6">
                                            <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
                                                <Link href={`sell/${data.id}`}>
                                                    <ButtonText size="sm">Edit</ButtonText>
                                                </Link>
                                            </Button>
                                        </VStack>
                                    }

                                    {
                                        (user && (data.seller.id !== user.id))  &&

                                        <VStack space="sm" className="mb-6"> 
                                            
                                                <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
                                                    <Link href={`checkout/${data.id}`}>
                                                        <ButtonText size="sm">Purchase</ButtonText>
                                                    </Link>
                                                </Button>

                                                <Button
                                                variant="outline"
                                                className="px-4 py-2 border-outline-300 sm:flex-1"
                                                >
                                                    <ButtonText size="sm" className="text-typography-600">
                                                        Offer
                                                    </ButtonText>
                                                </Button>

                                                <Button
                                                variant="outline"
                                                className="px-4 py-2 border-outline-300 sm:flex-1"
                                                >
                                                    <ButtonText size="sm" className="text-typography-600">
                                                        Message
                                                    </ButtonText>
                                                </Button>
                                        </VStack>
                                    }
                                    <Box className="p-6 rounded-lg max-w-[360px] m-3">
                                        <Box className="flex-row">
                                            <Avatar className="mr-4">
                                            
                                                <AvatarImage
                                                    source={{
                                                        uri: data.seller.image,
                                                    }}
                                                />
                                            </Avatar>
                                            <VStack>
                                                <Link href={`/profile/${data.seller.id}`}>
                                                    <Heading size="md" className="mb-1">
                                                        {data.seller.first_name} {data.seller.last_name} 
                                                    </Heading>
                                                </Link>
                                                <HStack className="items-center flex-start">
                                                    <Icon
                                                        as={StarIcon}
                                                        size="2xs"
                                                        className="stroke-typography-900 fill-typography-900"
                                                    />
                                                    <Text
                                                        size="sm"
                                                        className="pl-1 text-typography-900"
                                                    >
                                                        4.7
                                                    </Text>
                                                </HStack>
                                            </VStack>
                                        </Box>
                                        
                                        <Box className="my-5 flex-col sm:flex-row">
                                            <VStack className="items-center pb-2 sm:flex-1 sm:pb-0 sm:border-r sm:border-outline-300">
                                                <Heading size="xs">81</Heading>
                                                <Text size="xs">products</Text>
                                            </VStack>

                                            <Divider
                                                orientation="horizontal"
                                                className="w-[40%] self-center bg-background-300 flex sm:hidden"
                                            />

                                            <VStack className="items-center py-2 sm:flex-1 sm:py-0 sm:border-r sm:border-outline-300">
                                                <Heading size="xs">5,281</Heading>
                                                <Text size="xs">followers</Text>
                                            </VStack>
                                            
                                            <Divider
                                                orientation="horizontal"
                                                className="w-[40%] self-center bg-background-300 flex sm:hidden"
                                                />
                                            
                                            {/* <VStack className="items-center pt-2 sm:flex-1 sm:pt-0">
                                            <Heading size="xs">281</Heading>
                                            <Text size="xs">following</Text>
                                            </VStack> */}

                                        </Box>
                                        
                                        <Button className="py-2 px-4">
                                                <ButtonText size="sm">Follow</ButtonText>
                                        </Button>
                                    </Box>
                                </VStack>
                            </Box>
                        </Box>
                    </HStack>
                    {/* <Center>
                        <Heading className="mb-4" size="xl">Expore Similar Products!</Heading>
                        <ProductList/>
                    </Center> */}
                </VStack>
                <Modal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false)
                    }}
                    size="full"
                >
                    <ModalBackdrop />
                    <ModalContent className="w-5/6">
                        <ModalHeader>
                            <Heading size="md" className="text-typography-950"> </Heading>
                            <ModalCloseButton>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                            />
                            </ModalCloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <ImageGallery media={data.media} showModal={showModal} setShowModal={setShowModal} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Center>
        </ScrollView>
    );
}