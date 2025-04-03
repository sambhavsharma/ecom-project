const MediaSerializer = require("../serializers/media");

export function productsList(products: any) {

    var productsList = [];
    for (let product of products || []) {
        productsList.push(productObj(product));
    }

    return productsList;
}

export function productObj(product: any) {
    
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        currency: product.currency,
        price: product.price,
        media: MediaSerializer.mediaList(product.media)
    }
}