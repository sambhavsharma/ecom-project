const OrderProductsSerializer = require("../serializers/order_products");

export function ordersList(orders: any) {

    let ordersList = [];

    for (let order of orders) {
        ordersList.push(orderDetailsObj(order));
    }

    return ordersList;
}

export function orderObj(order: any) {

    return {
        id: order.id
    }
}

export function orderDetailsObj(order: any) {

    return {
        id: order.id,
        currency: order.currency,
        price:  order.price,
        products: OrderProductsSerializer.orderProductsList(order.products)
    }
}