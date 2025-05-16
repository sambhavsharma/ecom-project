import {Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const RESOURCE = "orders";

// There has to be a better way
const getToken = async () => {

    let key = "user";
    let user = JSON.parse(
         Platform.OS === 'web' ? await AsyncStorage.getItem(key) : await SecureStore.getItemAsync(key)
    )
    
    return user ? user.token : "";
}

export async function getUserBuyOrders({queryFilters}) {

    var url = `${API_URL}/${RESOURCE}/user/buy?`;
    const res = await fetch(url+new URLSearchParams(queryFilters).toString(), {
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization": "Bearer "+( await getToken())
        },
    });

    if(!res.ok) {
        throw res;
    }

    const orders = await res.json();
    return orders;
}

export async function getUserSaleOrders({queryFilters}) {

    var url = `${API_URL}/${RESOURCE}/user/sale?`;
    const res = await fetch(url+new URLSearchParams(queryFilters).toString(), {
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization": "Bearer "+( await getToken())
        },
    });

    if(!res.ok) {
        throw res;
    }

    const orders = await res.json();
    return orders;
}

export async function getUserOrder(id: string) {
    var url = `${API_URL}/${RESOURCE}/${id}/user`;
    const res = await fetch(url.toString(),{
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization": "Bearer "+( await getToken())
        },
    });

    if(!res.ok) {
        throw res;
    }

    const order = await res.json();
    return order;
}

export async function createOrder(order) {
    
    var url = `${API_URL}/${RESOURCE}`;
    const res = await fetch(url.toString(), {
        method: 'POST',
        mode: "cors",
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization": "Bearer "+( await getToken())
        },
        body: JSON.stringify(order)
    });

    if(!res.ok) {
        throw res;
    }

    const orderObj = await res.json();
    return orderObj;
}
