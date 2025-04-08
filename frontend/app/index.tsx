import { View, ScrollView } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import {ImageBackground } from '@/components/ui/image-background';
import {Center } from '@/components/ui/center';
import {StyleSheet} from 'react-native';
import ProductList from "@/components/widgets/ProductList";
import IndexContent from "@/components/index/IndexContent";

export default function HomeScreen() {

    return (
        <ScrollView>
            <Box style={styles.testClass}>
                <Image
                    source={require("@/assets/index-banner.jpg")}
                    style={{ flex: 1, justifyContent: "center" }}
                    size="full"
                />
                <HStack space="lg" style={styles.bannerContent}>
                    <Center>
                        <Box >
                            <Button>
                                <ButtonText>
                                    Shop Now!
                                </ButtonText>
                            </Button>
                        </Box>    
                    </Center>
                </HStack>
            </Box>

            <View className="mx-auto mt-8">
                <IndexContent/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    testClass: {
      height: 300,
      maxWidth: "100%",
    },
    bannerContent: {
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: "center"
    }
})