const MediaSerializer = require("../serializers/media");
const UserSerializer = require("../serializers/users");
const CategorySerializer = require("../serializers/categories");
const ProductAttributeSerializer = require("../serializers/product_attributes");
const Product = require("../models/product");

export function productsList(products: any) {

    var productsList = [];
    for (let product of products || []) {
        productsList.push(productObj(product));
    }

    return productsList;
}

export function productObj(product: any) {

    if(!product)
        return {};

    return {
        id: product.id,
        name: product.name,
        description: product.description,
        currency: product.currency,
        price: product.price,
        brand: product.brand,
        // condition: Product.conditionMap[product.condition],
        condition: product.condition,
        media: MediaSerializer.mediaList(product.media),
        seller: UserSerializer.sellerObj(product.seller),
        category: CategorySerializer.baseCategoryObj(product.category),
        attributes: ProductAttributeSerializer.productAttributesList(product.attributes)
    }
}