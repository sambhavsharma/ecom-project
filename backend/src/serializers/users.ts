const MediaSerializer = require("../serializers/media");

export function userObj(user: any) {

    return {
        id: user.id,
        first_name: user.first_name,
        laat_name: user.last_name,
        email: user.email
    }
}

export function userDetails(user: any) {
    return {
        first_name: user.first_name,
        laat_name: user.last_name,
        email: user.email,
        phone: user.phone,
        dob: user.dob
    }
}

// Seller Objects

export function sellerObj(user: any) {

    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        media: MediaSerializer.mediaList(user.media),
    }
}