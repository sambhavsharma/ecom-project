import { View, FlatList, ScrollView } from "react-native";
import products from "../assets/products.json";
import ProductListItem from "../components/ProductListItem";
import { Button, ButtonText } from "../components/ui/button";



export default function HomeScreen() {
    return (
        <ScrollView>
        <View>
            <FlatList 
                data={products}
                renderItem={({item}) => (
                    <ProductListItem product={item}/>
                )}
                numColumns={2}
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