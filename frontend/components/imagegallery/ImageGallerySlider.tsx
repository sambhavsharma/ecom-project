import {Pressable, ScrollView} from 'react-native';

import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Icon, ChevronRightIcon, ChevronLeftIcon } from "@/components/ui/icon";


export default function ImageGallerySlider({media, changeImage, selectedIndex, setGalleryWidth, scrollViewRef, setShowModal}){

    return (
        <Box>
            <HStack space="lg">
                <Box className='justify-center'>
                    <Pressable onPress={() => {changeImage(selectedIndex-1)}}>
                        <Icon as={ChevronLeftIcon} size="xl" />
                    </Pressable>
                </Box>
                <ScrollView 
                    onContentSizeChange={ (width) => { setGalleryWidth(width) }}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    ref={scrollViewRef}
                    scrollEnabled={false}
                    className="max-w-[500px]"
                >
                    {media.map((image, index) => (
                        <Pressable onPress={ () => {setShowModal(true)}}>
                            <Image
                                key={image.id}
                                source={{uri: `${image.url}`}}
                                className="mb-6 h-auto w-[500px] rounded-md aspect-[4/3]"
                            />
                        </Pressable>
                    ))}
                </ScrollView>
                <Box className='justify-center'>
                    <Pressable onPress={() => {changeImage(selectedIndex+1)}}>
                        <Icon as={ChevronRightIcon} size="xl" />
                    </Pressable>
                </Box>
            </HStack>
        </Box>
    );
}