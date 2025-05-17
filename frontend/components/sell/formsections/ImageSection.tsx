import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";

import { HStack } from "@/components/ui/hstack";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";

import { CloseIcon, AddIcon } from "@/components/ui/icon";

import removeFromArrayByObjectValue from "@/util/util";
import removeFromArrayByIndex from "@/util/util";

import * as ImagePicker from 'expo-image-picker';

export default function ImageSection ({formData, setFormData}) {

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
            base64: true,
        });
    
        if (!result.canceled) {
            setFormData({
                ...formData,
                media: [...(formData.media || []), ...result.assets]
            })
        }
    };

    const removeImage = async (index: number) => {

        formData.media.splice(index, 1);
        await setFormData({
            ...formData,
            media: formData.media
        })
    }

    return (
        <Card className="p-4 rounded-lg mt-[20px] z-[-1] shadow-sm" >
            {
                (((formData?.media) || []).length) < 1 &&
                <Center>
                    <Box>
                        <Button className="mt-2" onPress={pickImage} variant="outline">
                            <ButtonText> Add Product Images </ButtonText>
                            <ButtonIcon as={AddIcon} className="ml-2" />
                        </Button>
                    </Box>
                </Center>
            }

            {
                (((formData?.media) || []).length) > 0 &&
                
                <Box>
                    <HStack space="md">
                        {
                            formData.media && formData.media.map((img: any, index: number) => {
                                return (
                                    <Box>
                                        <Image 
                                            key={index} 
                                            source={{ uri: img.url || img.uri }} 
                                            size={"xl"}
                                        />
                                        
                                        <Button size={"xs"}
                                            className="absolute top-1 right-1 bg-white opacity-75 px-2"
                                            variant="outline" 
                                            onPress={ () => {removeImage(index)}} 
                                        >
                                            <ButtonIcon as={CloseIcon}/>
                                        </Button>
                                    </Box>
                                );
                            })
                        }
                        <Box className="flex-row items-center">
                            <Button className="px-2" onPress={pickImage} variant="outline">
                                <ButtonIcon as={AddIcon} />
                            </Button>
                        </Box>
                    </HStack>
                </Box>
            }
        </Card>
    );
};