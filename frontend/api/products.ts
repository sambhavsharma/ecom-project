import {Platform} from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

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

export async function createProduct({media, product}) {
    
    let url = `${API_URL}/products`;

    const res = await fetch(url.toString(), {
        method: 'POST',
        mode: "cors",
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json"
        },
        body: JSON.stringify(product)
    });

    if(!res.ok) {
        throw new Error();
    }

    const productObj = await res.json();
    return productObj;
}

const createFormData = (media: [object], product: object) => {
    const data = new FormData();
    
    for (let mediaObj of media) {
        data.append('media', mediaObj);

        console.log(mediaObj);
    }
  
    Object.keys(product).forEach((key) => {

        data.append(key, product[key]);
    });
  
    return data;
  };