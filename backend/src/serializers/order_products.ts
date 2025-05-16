const ProductsSerializer = require("../serializers/products");
const AmountSerializer = require("../serializers/amounts");

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
        amount_formatted: AmountSerializer.amount_formatted(order_product.currency, order_product.price),
        quantity: order_product.quantity
    }
}