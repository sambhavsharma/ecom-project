import { Box } from "@/components/ui/box";
import {Heading } from '@/components/ui/heading';
import {StyleSheet} from 'react-native';
import ProductList from "@/components/widgets/ProductList";

export default function IndexContent() {

    return (
        <Box className="mx-auto">
            <Heading className="mb-4" size="xl">New this week!</Heading>
            <ProductList/>
        </Box>
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