const MediaSerializer = require("../serializers/media");
const UserSerializer = require("../serializers/users");
const CategorySerializer = require("../serializers/categories");
const ProductAttributeSerializer = require("../serializers/product_attributes");
const BrandSerializer = require("../serializers/brands");
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
        brand: BrandSerializer.brandObj(product.brand),
        status: product.status,
        quantity: 1,
        condition: product.condition,
        media: MediaSerializer.mediaList(product.media),
        seller: UserSerializer.sellerObj(product.seller),
        department: CategorySerializer.baseCategoryObj(product.department),
        category: CategorySerializer.baseCategoryObj(product.category),
        subcategory: CategorySerializer.baseCategoryObj(product.subcategory),
        attributes: ProductAttributeSerializer.productAttributesList(product.attributes)
    }
}