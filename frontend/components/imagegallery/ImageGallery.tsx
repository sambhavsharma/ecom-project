import {useState, useRef} from "react";

import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import ImageGallerySlider from "@/components/imagegallery/ImageGallerySlider";
import ImageGalleryFooter from "@/components/imagegallery/ImageGalleryFooter";

export default function ImageGallery({media, setShowModal}){

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