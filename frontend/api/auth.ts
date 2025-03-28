const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function login(email: string, password: string) {
    var url = `${API_URL}/auth/login`;
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
        throw new Error();
    }

    const data = await res.json();
    return data;
}
