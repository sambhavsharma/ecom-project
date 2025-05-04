import { zodParse } from "../middlewares/validationMiddleware";
import { db } from "../db";
import { orderProductsTable, createOrderProductSchema } from "../db/order_products";
import { eq, and } from "drizzle-orm";

const OrderProductSerializer = require("../serializers/order_products");

export async function create(order_product: any, tx: any) {

    try {
        const [orderProductRow] = await (tx ? tx : db).insert(orderProductsTable)
        .values(order_product)
        .returning()

        return OrderProductSerializer.orderProductObj(orderProductRow);
    } catch (error) {
        console.log(error);
        return {error: error};
    }
    
};

export async function getOrderProducts(order_id: number) {

    const orderProduct = await db.query.orderProductsTable.findFirst({
        where: and(
            eq(orderProductsTable.order_id, order_id)
        )
    });

    if(!orderProduct)
        return {};

    return OrderProductSerializer.orderProductObj(orderProduct);
};