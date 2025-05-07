import {Pressable} from 'react-native';

import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";


export default function ImageGalleryFooter({media, changeImage}){

    return (
        <Box>
            <HStack space="lg">
                {
                    media.map(
                        (image, index) => {
                            return (
                                <Pressable key={image.id} onPress={ () => {changeImage(index)}}>
                                    <Image
                                        source={{
                                            uri: image ? image.url : ""
                                        }}
                                        className="mb-6 h-auto w-[80px] rounded-md aspect-[4/3]"
                                        alt="image"
                                    />
                                </Pressable>
                            )
                        }
                    )
                }
                
            </HStack>      
        </Box>
    );
}