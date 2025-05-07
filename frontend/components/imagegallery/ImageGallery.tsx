import {useState, useRef} from "react";
import {ScrollView, Pressable} from 'react-native';

import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Icon, ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/ui/icon";
import { Center } from "@/components/ui/center";
import { Button, ButtonText } from "@/components/ui/button";
import ImageGallerySlider from "@/components/imagegallery/ImageGallerySlider";
import ImageGalleryFooter from "@/components/imagegallery/ImageGalleryFooter";

import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@/components/ui/modal"


export default function ImageGallery({media, showModal, setShowModal}){

    const [ galleryWidth, setGalleryWidth] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const scrollViewRef = useRef(null);

    const changeImage = (toIndex) => {

        if(toIndex < 0 || toIndex >= media.length)
            return;

        let scollToX = toIndex * (galleryWidth/media.length);
        
        scrollViewRef?.current?.scrollTo({
            animated: true,
            y: 0,
            x: scollToX
        });

        setSelectedIndex(toIndex);
    }

    return (
        <Box className="items-center p-3 flex-1">
            <Center>
                <VStack className="mx-auto p-5 rounded-lg m-3 flex-1">
                    <ImageGallerySlider 
                        media={media} 
                        changeImage={changeImage} 
                        selectedIndex={selectedIndex}
                        setGalleryWidth={setGalleryWidth}
                        scrollViewRef={scrollViewRef}
                        setShowModal={setShowModal}
                    /> 
                    
                    <ImageGalleryFooter media={media} changeImage={changeImage} /> 
                </VStack>
            </Center>
        </Box>
    );
}