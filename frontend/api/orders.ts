import { useAuth } from "@/store/authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function createOrder(items: []) {
    
    const user = useAuth.getState().user;
    var url = `${API_URL}/orders`;
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
