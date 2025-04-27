import { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from 'react-native';

const AuthContext = createContext({
    user: {},
    signin: (user) => {},
    logout: () => {},
    isLoading: true
});

export const AuthProvider = ({children} : PropsWithChildren) => {

    const save = async (key: string, value:string) => {

        Platform.OS === 'web' ?  await AsyncStorage.setItem(key, value) :  await SecureStore.setItemAsync(key, value);
    }

    const get = async (key: string) => {

        return Platform.OS === 'web' ? await AsyncStorage.getItem(key) : await SecureStore.getItemAsync(key);
    }

    const remove = async (key: string) => {

        return Platform.OS === 'web' ? await AsyncStorage.removeItem(key) : await SecureStore.deleteItemAsync(key);
    }

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            // let data = await get("user") || "{}";
            let data = await get("user");
            setUser(JSON.parse(data));
            setIsLoading(false);
        }
        loadUser();
    }, [])
    
    const signin = async (data) => {

        let user =  {
            id: data.id.toString(),
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            token: data.token
        }

        await save("user",JSON.stringify(user));

        setUser(data);
    }

    const logout = async () => {
        remove("user");
        setUser(undefined);
    }

    return (
        <AuthContext.Provider value={{ user, signin, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);