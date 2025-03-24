import { View, Text, FlatList } from "react-native";
import products from "../assets/products.json";
import ProductListItem from "../components/ProductListItem";



export default function HomeScreen() {
    return (
        <View>
            <FlatList 
                data={products}
                renderItem={({item}) => (
                    <ProductListItem product={item}/>
                )}
            />
        </View>
    )
}