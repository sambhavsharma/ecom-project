import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCart = create(
    persist(
        (set) => ({
            items: [],

            addProduct: (product) => set(
                (state: any) => ({
                    items: [...state.items, {product, quantity: 1}]
                })
            ),

            resetCart: () => set ({items: []})
        }),
        {
            name: 'cart.store',
            storage: createJSONStorage( () => AsyncStorage)
        }
    )  
);