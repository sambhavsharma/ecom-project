import {Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL
const RESOURCE = "auth";

// There has to be a better way
const getToken = async () => {

    let key = "user";
    let user = JSON.parse(
         Platform.OS === 'web' ? await AsyncStorage.getItem(key) : await SecureStore.getItemAsync(key)
    )
    
    return user ? user.token : "";
}

export async function login(email: string, password: string) {
    var url = `${API_URL}/${RESOURCE}/login`;
    const res = await fetch(url.toString(), {
        method: 'POST',
        mode: "cors",
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email, password})
    });

    if(!res.ok) {
        throw res;
    }

    const data = await res.json();
    return data;
}

export async function googleLogin(code: string) {
    var url = `${API_URL}/${RESOURCE}/google/login`;
    const res = await fetch(url.toString(), {
        method: 'POST',
        mode: "cors",
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json"
        },
        body: JSON.stringify({code})
    });

    if(!res.ok) {
        throw res;
    }

    const data = await res.json();
    return data;
}

export async function authCheck() {
    var url = `${API_URL}/${RESOURCE}/check`;
    const res = await fetch(url.toString(), {
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization": "Bearer "+( await getToken())
        }
    });

    if(!res.ok) {
        throw res;
    }

    const data = await res.json();
    return data;
}
