const MediaSerializer = require("../serializers/media");

const BASE_URL = "http://127.0.0.1:3000/";

export function userObj(user: any) {
        
    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        image: getImage(user)
    }
}

export function userDetailsObj(user: any) {
    return {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        bio: user.bio,
        phone: user.phone,
        dob: user.dob,
        image: getImage(user),
        email_verified: user.email_verified,
        phone_verified: user.phone_verified,
        created_at: user.created_at
    }
}

// Seller Objects

export function sellerObj(user: any) {

    return user ? {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        image: getImage(user)
    } : {}
}

function getImage(user) {
     // This should all be properly done!
    if(user.media && !user.image)
        user.image = user.media[0];

    if(!user.image)
        user.image = BASE_URL+"user-avatar.png";

    return MediaSerializer.imageUrl(user.image)
}