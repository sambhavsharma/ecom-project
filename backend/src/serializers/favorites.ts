const ProductSerializer = require("../serializers/products");

export function favoritesList(favorites: any) {

    var favoritesList = [];
    for (let favorite of favorites || []) {
        favoritesList.push(favoritesObj(favorite));
    }

    return favoritesList;
}


export function favoritesObj(favorite: any) {

    if(!favorite)
        return {}

    return {
        id: favorite.id,
        user_id: favorite.user_id,
        product_id: favorite.product_id,
        product: ProductSerializer.productObj(favorite.product)
    }
}
