import { View, Text, FlatList } from "react-native";
import products from "../assets/products.json";
import ProductListItem from "../components/ProductListItem";
import { Button, ButtonText } from "../components/ui/button";



export default function HomeScreen() {
    return (
        <View>
            <FlatList 
                data={products}
                renderItem={({item}) => (
                    <ProductListItem product={item}/>
                )}
            />
            <Button>
                <ButtonText>
                    Press Me!
                </ButtonText>
            </Button>
        </View>
    )
}