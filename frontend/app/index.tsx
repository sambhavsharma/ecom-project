import { listProducts } from "@/api/products";
import { View, FlatList, ScrollView, useWindowDimensions, ActivityIndicator } from "react-native";
import ProductListItem from "@/components/ProductListItem";
import { Button, ButtonText } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/components/ui/text";

export default function HomeScreen() {

    const {width} = useWindowDimensions();

    

    const {data, isLoading, err} = useQuery({queryKey: ["products"], queryFn: listProducts});
    const products = data;

    if(isLoading) {
        return <ActivityIndicator/>;
    } 

    if(err) {
        return <Text>Error Fetching Products!</Text>;
    }

    const numColumns = width > 700 ? 3 : 2;
    return (
        <ScrollView className="mx-auto">
        <View>
            <FlatList 
                key={numColumns}
                data={products}
                renderItem={({item}) => (
                    <ProductListItem product={item}/>
                )}
                numColumns={numColumns}
                contentContainerClassName="gap-2"
                columnWrapperClassName="gap-2"
            />
             
        </View>
        </ScrollView>
    )
}