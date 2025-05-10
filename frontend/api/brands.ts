const API_URL = process.env.EXPO_PUBLIC_API_URL
const RESOURCE = "brands";

export async function listBrands(query) {
    var url = `${API_URL}/${RESOURCE}?query=${query}`;
    const res = await fetch(url.toString());

    if(!res.ok) {
        throw res;
    }

    const categories = await res.json();
    return categories;
}