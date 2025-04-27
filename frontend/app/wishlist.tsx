import { View, ScrollView, StyleSheet } from "react-native";
import WishlistContent from "@/components/wishlist/WishlistContent";

import Loader from "@/components/widgets/Loader";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

export default function WishList() {

    const { user, isLoading} = useAuth();

    if(isLoading) {
        return ( <Loader /> );
    }

    if(!user){
        return <Redirect href="/login"/>
    }

    return (
        <ScrollView>
            <View className="mx-auto mt-8">
                <WishlistContent/>
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