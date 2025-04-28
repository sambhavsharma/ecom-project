import {Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// There has to be a better way
const getToken = async () => {

    let key = "user";
    let user = JSON.parse(
         Platform.OS === 'web' ? await AsyncStorage.getItem(key) : await SecureStore.getItemAsync(key)
    )
    
    return user ? user.token : "";
}

export async function getUser(id: string) {
    var url = `${API_URL}/users/${id}`;
    const res = await fetch(
        url.toString(),{
            headers: {
                "Accept":"application/json", 
                "Content-Type":"application/json",
                "Authorization": "Bearer "+( await getToken())
            },
        }
    );

    if(!res.ok) {
        throw res;
    }

    const user = await res.json();
    return user;
}

export async function updateUser(id, user) {
    
    var url = `${API_URL}/users/${id}`;
    const res = await fetch(url.toString(), {
        method: 'PUT',
        mode: "cors",
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization": "Bearer "+( await getToken())
        },
        body:  JSON.stringify(user)
    });

    if(!res.ok) {
        throw res;
    }

    const userObj = await res.json();
    return userObj;
}