const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function listProducts() {
    var url = `${API_URL}/products`;
    const res = await fetch(url.toString());

    if(!res.ok) {
        throw new Error();
    }

    const products = await res.json();
    return products;
}

export async function getProduct(id: string) {
    var url = `${API_URL}/products/${id}`;
    const res = await fetch(url.toString());

    if(!res.ok) {
        throw new Error();
    }

    const products = await res.json();
    return products;
}