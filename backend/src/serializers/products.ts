const MediaSerializer = require("../serializers/media");
const Product = require("../models/product");

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
        brand: product.brand,
        condition: Product.conditionMap[product.condition],
        media: MediaSerializer.mediaList(product.media)
    }
}