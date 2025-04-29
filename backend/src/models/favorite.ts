import { db } from "../db";
import { favoritesTable } from "../db/favorites";
import { eq, and } from "drizzle-orm";

const FavoritesSerializer = require("../serializers/favorites");
const UserSerializer = require("../serializers/users");

export async function create(favorite: any, tx: any) {

    try {
        const [favoritesRow] = await (tx ? tx : db).insert(favoritesTable)
        .values(favorite)
        .onConflictDoUpdate({ 
            target: [favoritesTable.user_id, favoritesTable.product_id], 
            set: { is_deleted: false } 
        })
        .returning()

        return FavoritesSerializer.favoritesObj(favoritesRow);
    } catch (error) {
        return {error: error};
    }
};

export async function checkUserFavorite(user_id, product_id) {

    const count = await db.$count(favoritesTable,
        and(
            eq(favoritesTable.user_id, user_id),
            eq(favoritesTable.product_id, product_id),
            eq(favoritesTable.is_deleted, false)
        )
    );

    return {isFavorite: count === 1 ? true : false};
}

export async function list(user_id) {

    const favorites = await db.query.favoritesTable.findMany({
        where: and(
            eq(favoritesTable.user_id, user_id),
            eq(favoritesTable.is_deleted, false)
        ),
        with: { 
            product: {
                with : {
                    media: {
                        where: (media, { eq }) => eq(media.parent_type, "product")
                    }
                }
            }
        }
    });

    return FavoritesSerializer.favoritesList(favorites);
}

export async function deleteFavorite(id: number, user_id: string) {

    try {

        var [favoriteRow] = await db.update(favoritesTable)
            .set({
                is_deleted: true
            })
            .where(
                and(
                    eq(favoritesTable.user_id, user_id), // You should only be able to remove your favorite
                    eq(favoritesTable.id, id)
                )
            )
            .returning();

        return FavoritesSerializer.favoritesObj(favoriteRow);
    
    } catch (error) {
        return {error: error};
    }
};
