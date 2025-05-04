const OrderProductsSerializer = require("../serializers/order_products");
const AddressSerializer = require("../serializers/addresses");

export function ordersList(orders: any) {

    let ordersList = [];

    for (let order of orders) {
        ordersList.push(orderDetailsObj(order));
    }

    return ordersList;
}

export function orderObj(order: any) {

    return {
        id: order.id,
        status: order.status,
        created_at: order.created_at
    }
}

export function orderDetailsObj(order: any) {

    return {
        id: order.id,
        currency: order.currency,
        price:  order.price,
        status: order.status,
        created_at: order.created_at,
        address: AddressSerializer.addressObj(order.address),
        products: OrderProductsSerializer.orderProductsList(order.products)
    }
}