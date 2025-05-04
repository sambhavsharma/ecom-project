import {Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const RESOURCE = "products";

// There has to be a better way
const getToken = async () => {

    let key = "user";
    let user = JSON.parse(
         Platform.OS === 'web' ? await AsyncStorage.getItem(key) : await SecureStore.getItemAsync(key)
    )
    
    return user ? user.token : "";
}

export async function listProducts({queryFilters}) {

    var url = `${API_URL}/${RESOURCE}?`;
    const res = await fetch(url+new URLSearchParams(queryFilters).toString(), {
    });

    if(!res.ok) {
        throw res;
    }

    const products = await res.json();
    return products;
}

export async function getUserProducts(user_id) {

    var url = `${API_URL}/${RESOURCE}/user/${user_id}`;
    const res = await fetch(url.toString(), {

    });

    if(!res.ok) {
        throw res;
    }

    const products = await res.json();
    return products;
}

export async function getProduct(id: string) {
    var url = `${API_URL}/${RESOURCE}/${id}`;
    const res = await fetch(url.toString());

    if(!res.ok) {
        throw new Error();
    }

    const products = await res.json();
    return products;
}

export async function createProduct({media = {}, product}) {
    
    let url = `${API_URL}/${RESOURCE}`;
    const res = await fetch(url.toString(), {
        method: 'POST',
        mode: "cors",
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization": "Bearer "+( await getToken())
        },
        body: JSON.stringify(product)
    });

    if(!res.ok) {
        throw res;
    }

    const productObj = await res.json();
    return productObj;
}

const createFormData = (media: [object], product: object) => {
    const data = new FormData();
    
    for (let mediaObj of media) {
        data.append('media', mediaObj);
    }
  
    Object.keys(product).forEach((key) => {

        data.append(key, product[key]);
    });
  
    return data;
};