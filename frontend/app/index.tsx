import { View, FlatList, ScrollView, useWindowDimensions } from "react-native";
import products from "../assets/products.json";
import ProductListItem from "../components/ProductListItem";
import { Button, ButtonText } from "../components/ui/button";



export default function HomeScreen() {

    const {width} = useWindowDimensions();

    // too many re renders, fix this, also use useBreakPointValue at least
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
             
            <Button>
                <ButtonText>
                    Press Me!
                </ButtonText>
            </Button>
        </View>
        </ScrollView>
    )
}