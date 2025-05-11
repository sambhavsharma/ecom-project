const API_URL = process.env.EXPO_PUBLIC_API_URL
const RESOURCE = "util";

export async function getMenu() {
    var url = `${API_URL}/${RESOURCE}/menu`;
    const res = await fetch(url.toString());

    if(!res.ok) {
        throw res;
    }

    const menu = await res.json();
    return menu;
}