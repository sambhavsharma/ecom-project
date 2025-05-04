const ProductsSerializer = require("../serializers/products");

export function orderProductsList(order_products: any) {

    let orderProducts = [];

    for (let order_product of order_products) {
        orderProducts.push(orderProductObj(order_product))
    }

    return orderProducts;
}

export function orderProductObj(order_product: any) {
    return {
        ...ProductsSerializer.productObj(order_product.product),
        price: order_product.price,
        currency: order_product.currency,
        quantity: order_product.quantity
    }
}