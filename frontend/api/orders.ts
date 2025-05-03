import { useAuth } from "@/store/authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const RESPURCE = "orders";

export async function getUserOrders({queryFilters}) {

    var url = `${API_URL}/${RESPURCE}/user?`;
    const res = await fetch(url+new URLSearchParams(queryFilters).toString(), {
    });

    if(!res.ok) {
        throw res;
    }

    const products = await res.json();

    console.log(products);
    return products;
}

export async function getUserOrder(id: string) {
    var url = `${API_URL}/${RESPURCE}/${id}/user`;
    const res = await fetch(url.toString());

    if(!res.ok) {
        throw new Error();
    }

    const products = await res.json();
    return products;
}

export async function createOrder(items: []) {
    
    const user = useAuth.getState().user;
    var url = `${API_URL}/${RESPURCE}`;
    const res = await fetch(url.toString(), {
        method: 'POST',
        mode: "cors",
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            order: {
                price: 100, 
                user_id: user.id
            }
        })
    });

    if(!res.ok) {
        throw new Error();
    }

    const data = await res.json();
    return data;
}
