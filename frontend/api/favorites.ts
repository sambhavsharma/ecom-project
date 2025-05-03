import {Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const ENTITY = "favorites";

// There has to be a better way
const getToken = async () => {

    let key = "user";
    let user = JSON.parse(
         Platform.OS === 'web' ? await AsyncStorage.getItem(key) : await SecureStore.getItemAsync(key)
    )
    
    return user ? user.token : "";
}

export async function listFavorites() {
    var url = `${API_URL}/${ENTITY}`;
    const res = await fetch(
        url.toString(),
        {
            headers: {
                "Accept":"application/json", 
                "Content-Type":"application/json",
                "Authorization": "Bearer "+( await getToken())
            }
        }
    );

    if(!res.ok) {
        throw res;
    }

    const favorites = await res.json();
    return favorites;
}

export async function checkUserFavorite(product_id: string) {
    var url = `${API_URL}/${ENTITY}/product/${product_id}`;
    const res = await fetch(url.toString(), {
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization": "Bearer "+( await getToken())
        },
    });

    if(!res.ok) {
        throw res;
    }

    const data  = await res.json();
    return data;
}

export async function createFavorite({favorite}) {
    
    let url = `${API_URL}/${ENTITY}`;

    const res = await fetch(url.toString(), {
        method: 'POST',
        mode: "cors",
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization": "Bearer "+( await getToken())
        },
        body: JSON.stringify(favorite)
    });

    if(!res.ok) {
        throw res;
    }

    const favoriteObj = await res.json();
    return favoriteObj;
}

export async function deleteFavorite({product_id}) {
    
    var url = `${API_URL}/${ENTITY}/product/${product_id}`;
    const res = await fetch(url.toString(), {
        method: 'DELETE',
        mode: "cors",
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization": "Bearer "+( await getToken())
        }
    });

    if(!res.ok) {
        throw res;
    }

    const favoriteObj = await res.json();
    return favoriteObj;
}