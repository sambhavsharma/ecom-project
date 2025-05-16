import { zodParse } from "../middlewares/validationMiddleware";
import { db } from "../db";
import { ordersTable, createOrderSchema } from "../db/orders";
import { eq, and } from "drizzle-orm";

const OrderProduct = require("../models/order_product");
const Address = require("../models/address");
const OrderSerializer = require("../serializers/orders");

const DEFAULT_CURRENCY = "INR";

export async function create(order: any, user_id: number) {

    const {zodError} = zodParse(createOrderSchema, order);
    if(zodError) 
        throw zodError;

    try {

        let [currency, price] = calculatePrice(order.products);
        order.user_id = user_id;
        order.currency = currency;
        order.price = price;

        const {orderRow, error} = await db.transaction(async (tx) => { 
            var [orderRow] = await tx.insert(ordersTable)
            .values(order)
            .returning();

            for (var product of order.products || []) {

                var orderProductObj = {
                    order_id: orderRow.id,
                    ...product
                }

                const {error} = await OrderProduct.create(orderProductObj, tx);
                
                if (error) {

                    tx.rollback();  
                    throw error;
                }
            }

            const {error} = await Address.create({
                ...order.address,
                parent_type: "order",
                parent_id: orderRow.id
            }, tx);

            if (error) {

                tx.rollback();  
                throw error;
            }

            return {orderRow: orderRow};
        })

        return OrderSerializer.orderObj(orderRow);
    } catch (error) {
        //console.log(error);
        throw error;
    }
    
};

export async function getUserOrder(id: number, user_id: number) {

    try {
        const order = await db.query.ordersTable.findFirst({
            where: and(
                eq(ordersTable.id, id),
                eq(ordersTable.user_id, user_id)
            ),
            with: {
                products: {
                    with:  {
                        product: {
                            with: {
                                media: {
                                    where: (media, { eq }) => eq(media.parent_type, "product")
                                },
                                seller: true
                            }
                        }
                    }
                },
                address: {
                    where: (address, { eq }) => eq(address.parent_type, "order")
                }
            }
        });
            
        return OrderSerializer.orderDetailsObj(order);

    } catch (error) {
       
        return {error: error};
    }
   
}

export async function getUserBuyOrders(user_id: number) {

    try {
        const whereQuery = and(
            eq(ordersTable.user_id, user_id)
        );

        const orders = await fetchOrders(whereQuery);
            
        return OrderSerializer.ordersList(orders);

    } catch (error) {
        throw error;
    }
   
}

export async function getUserSaleOrders(user_id: number) {

    try {
        const whereQuery = and(
            eq(ordersTable.seller_id, user_id)
        );

        const orders = await fetchOrders(whereQuery);
            
        return OrderSerializer.ordersList(orders);

    } catch (error) {
        //console.log(error);
        return {error: error};
    }
   
}

async function fetchOrders(query) {
    const orders = await db.query.ordersTable.findMany({
        where: query,
        with: {
            products: {
                with:  {
                    product: {
                        with: {
                            media: {
                                where: (media, { eq }) => eq(media.parent_type, "product")
                            }
                        },
                    }
                }
            }
        }
    });

    return orders;
}

function calculatePrice(orderProducts) {
    let currency;
    let price = 0;

    for (let product of orderProducts) {
        if(!currency)
            currency = product.currency;
        price += product.price * product.quantity;
    }

    return [currency || DEFAULT_CURRENCY, price];
}