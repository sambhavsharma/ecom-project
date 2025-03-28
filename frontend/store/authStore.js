import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuth = create(
    persist(
        (set) => ({
            user: null,

            setUser: (user) => set({ user })
    
        })
    ),{
        name: 'auth.store',
        storage: createJSONStorage( () => AsyncStorage)
    }
)