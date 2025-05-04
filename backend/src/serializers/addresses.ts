
export function addressObj(address: any) {

    if(!address)
        return {};

    return {
        id: address.id,
        address1: address.address1,
        address2: address.address2,
        address3: address.address3,
        city: address.city,
        state: address.state,
        country: address.country,
        postcode: address.postcode
    }
}