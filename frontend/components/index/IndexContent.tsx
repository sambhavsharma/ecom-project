import { useQuery } from "@tanstack/react-query";
import { listProducts } from "@/api/products";
import { Box } from "@/components/ui/box";
import {Heading } from '@/components/ui/heading';
import {StyleSheet} from 'react-native';
import ProductList from "@/components/widgets/ProductList";
import Loader from "@/components/widgets/Loader";

export default function IndexContent() {

    const {data, isLoading} = useQuery({
        queryKey: ["products"], 
        queryFn: listProducts}
    );

    if(isLoading) {
        return ( <Loader /> );
    }

    return (
        <Box className="mx-auto">
            <Heading className="mb-4" size="xl">New this week!</Heading>
            <ProductList data={data["products"]}/>
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