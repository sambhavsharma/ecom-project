const MediaSerializer = require("../serializers/media");

export async function productObj(product: any) {
    
    //const media = await Media.get(product.id, "product");
    
    return {
       name: product.name,
       description: product.description,
       currency: product.currency,
       price: product.price,
       media: MediaSerializer.mediaList(product.media)
    }
}